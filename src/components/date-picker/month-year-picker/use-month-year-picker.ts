import { ref, toRefs, computed, ComputedRef, SetupContext, onMounted, watch } from 'vue';
import { useVModel, onClickOutside, useDebounceFn } from '@vueuse/core';

import dayjs from 'dayjs';

import classNames from 'classnames';

import type { MonthYearPickerPropTypes, MonthYearPickerEmitTypes } from './month-year-picker';

interface MonthYearPickerClasses {
  labelClasses: string;
  monthYearPickerBaseInputClasses: string;
  monthYearPickerInputClasses: string;
  monthYearPickerInputHelperClasses: string;
  monthsTabItemsBaseClasses: string;
  yearsTabItemsBaseClasses: string;
}

interface MonthsList {
  text: string;
  fullText: string;
  monthValue: number;
}

export const useMonthYearPicker = (
  props: MonthYearPickerPropTypes,
  emit: SetupContext<MonthYearPickerEmitTypes>['emit'],
) => {
  const { active, disabled, readonly, error, currentYear, minMaxYear, format } = toRefs(props);

  const modelValue = useVModel(props, 'modelValue', emit);

  const monthYearPickerClasses: ComputedRef<MonthYearPickerClasses> = computed(() => {
    const labelClasses = classNames('mc-body-sm-regular mc-text-color-strong mc-block', {
      'mc-text-color-on-fill-disabled': disabled.value,
    });

    const monthYearPickerBaseInputClasses = classNames(
      'mc-flex mc-justify-between mc-items-center mc-gap-6 mc-rounded-lg mc-bg-white-50 mc-min-w-[180px] mc-py-1.5 mc-px-3',
      {
        // Normal State
        'mc-border mc-border-solid mc-border-mushroom-200 focus:mc-border-kangkong-700':
          (!error.value && !disabled.value && !active.value && !monthYearPopperState.value) || readonly.value,

        // Active State
        'mc-border mc-border-solid mc-border-kangkong-700 mc-border-[1.5px] mc-border-solid':
          (active.value || monthYearPopperState.value === true) && !readonly.value,

        // Error State
        'mc-border mc-border-solid mc-border-tomato-600 focus:mc-border-tomato-600': error.value,

        // Disabled State
        'mc-background-color-disabled mc-border-white-100 focus:mc-border-white-100 mc-cursor-not-allowed !mc-text-white-400':
          disabled.value,

        // Readonly State
        'mc-cursor-default': readonly.value,
      },
    );

    const monthYearPickerInputClasses = classNames(
      'mc-h-full mc-border-none mc-bg-transparent mc-outline-none',
      'mc-font-size-200',
      'placeholder:mc-text-color-weak',
      {
        'mc-text-color-strong': !disabled.value && !readonly.value,
        'mc-text-color-on-fill-disabled': disabled.value || readonly.value,
        'mc-cursor-not-allowed': disabled.value,
      },
    );

    const monthYearPickerInputHelperClasses = classNames(
      'mc-body-sm-regular',
      'mc-flex mc-items-center mc-gap-size-spacing-5xs',
      'mc-mt-size-spacing-4xs',
      {
        'mc-text-color-danger-base': error.value,
        'mc-text-color-supporting': !error.value,
      },
    );

    const monthsTabItemsBaseClasses = classNames(
      'mc-subheading-xs mc-relative mc-flex mc-cursor-pointer mc-items-center mc-justify-center mc-rounded-lg mc-p-4',
      'mc-border mc-border-solid',
      'mc-transition mc-duration-150 mc-ease-in-out',
      'active:mc-scale-95',
    );

    const yearsTabItemsBaseClasses = classNames(
      'mc-subheading-xs mc-relative mc-flex mc-cursor-pointer mc-items-center mc-justify-center mc-rounded-lg mc-p-4',
      'mc-border mc-border-solid',
      'mc-transition mc-duration-150 mc-ease-in-out',
      'active:mc-scale-95',
    );

    return {
      labelClasses,
      monthYearPickerBaseInputClasses,
      monthYearPickerInputClasses,
      monthYearPickerInputHelperClasses,
      monthsTabItemsBaseClasses,
      yearsTabItemsBaseClasses,
    };
  });

  const monthYearPickerRef = ref<HTMLInputElement | null>(null);
  const monthInputRef = ref<HTMLInputElement | null>(null);
  const yearInputRef = ref<HTMLInputElement | null>(null);

  const monthYearPopperState = ref<boolean>(false);

  const currentTab = ref<string>('tab-months');

  const currentDate = ref(dayjs());

  const monthsList = ref(
    Array.from({ length: 12 }, (_, i) => ({
      text: dayjs().month(i).format('MMM'),
      fullText: dayjs().month(i).format('MMMM'),
      monthValue: i,
    })),
  );

  const monthInput = ref<string>('');
  const yearInput = ref<string>('');

  const monthYearPickerErrors = ref<{ title: string; message: string }[]>([]);

  // #region - Month Tab
  const selectedMonth = ref<number | null>(null);

  const monthTabHandleSelectedMonth = (month: { text: string; fullText: string; monthValue: number }) => {
    const monthValue = month.monthValue + 1;
    const formattedMonth = monthValue < 10 ? `0${monthValue}` : `${monthValue}`;

    monthInput.value = formattedMonth;
    selectedMonth.value = month.monthValue;

    handleConvertMonthIfValid();
    emitDateFormats();
    emitPartialInputValue();

    monthYearPickerErrors.value = [];

    // If both month and year are selected, close the popper
    if (yearInput.value) {
      setTimeout(() => {
        monthYearPopperState.value = false;
      }, 100);
    } else {
      // Switch to year tab if year is not selected
      currentTab.value = 'tab-years';
    }
  };
  // #endregion - Month Tab

  // #region - Year Tab
  const yearTabPageData = ref({
    currentPage: 0,
    itemsPerPage: 12,
    yearsArray: Array.from(
      { length: minMaxYear.value.max - minMaxYear.value.min + 1 },
      (_, index) => minMaxYear.value.min + index,
    ).filter((year) => year <= minMaxYear.value.max && year >= minMaxYear.value.min),
  });

  const yearTabCurrentYearPage = computed(() => {
    const start = yearTabPageData.value.currentPage * yearTabPageData.value.itemsPerPage;
    const remainingItems = yearTabPageData.value.yearsArray.slice(start);

    return remainingItems.length < yearTabPageData.value.itemsPerPage
      ? remainingItems
      : yearTabPageData.value.yearsArray.slice(start, start + yearTabPageData.value.itemsPerPage);
  });

  const yearsTabSetCurrentPageYear = () => {
    const currentYearValue = Number(yearInput.value) || Number(currentYear.value);
    const currentYearIndex = yearTabPageData.value.yearsArray.indexOf(currentYearValue);

    if (currentYearIndex !== -1) {
      yearTabPageData.value.currentPage = Math.floor(currentYearIndex / yearTabPageData.value.itemsPerPage);
    }
  };

  const yearTabGoToPreviousPage = () => {
    if (yearTabPageData.value.currentPage > 0) {
      yearTabPageData.value.currentPage--;
    }
  };

  const yearTabGoToNextPage = () => {
    if (
      (yearTabPageData.value.currentPage + 1) * yearTabPageData.value.itemsPerPage <
      yearTabPageData.value.yearsArray.length
    ) {
      yearTabPageData.value.currentPage++;
    }
  };

  const yearTabIsPreviousButtonDisabled = computed(() => {
    return yearTabPageData.value.currentPage === 0;
  });

  const yearTabIsNextButtonDisabled = computed(() => {
    return (
      (yearTabPageData.value.currentPage + 1) * yearTabPageData.value.itemsPerPage >=
      yearTabPageData.value.yearsArray.length
    );
  });

  const yearTabHandleSelectedYear = (selectedYear: string) => {
    yearInput.value = selectedYear;

    handleConvertMonthIfValid();
    emitDateFormats();
    emitPartialInputValue();

    monthYearPickerErrors.value = [];

    // If both month and year are selected, close the popper
    if (monthInput.value) {
      setTimeout(() => {
        monthYearPopperState.value = false;
      }, 100);
    } else {
      // Switch to month tab if month is not selected
      currentTab.value = 'tab-months';
    }
  };
  // #endregion - Year Tab

  // #region - Helper Methods
  const isMonthYearPickerPopperDisabled = computed(() => disabled.value || readonly.value);

  const setWarningPropsValue = (type: string) => {
    switch (type) {
      case 'MinMaxYear': {
        const _currentYear = Number(currentYear.value) || new Date().getFullYear();
        const { min, max } = minMaxYear.value;

        if (min > _currentYear || max < _currentYear) {
          console.error(
            `Error: minMaxYear Props - The current year (${_currentYear}) is outside of the valid range. ` +
              `min: ${min}, max: ${max}.`,
          );
        }

        break;
      }

      default:
        break;
    }
  };

  const setModelValue = () => {
    if (modelValue.value) {
      // First try to parse with the specified format, then try default format as fallback
      let formattedDate = dayjs(modelValue.value, format.value);

      // If the date is not valid with the specified format, try with the default format
      if (!formattedDate.isValid()) {
        formattedDate = dayjs(modelValue.value, 'MM-YYYY');
      }

      // If still not valid, try other common formats
      if (!formattedDate.isValid()) {
        const commonFormats = ['YYYY-MM', 'MMMM YYYY', 'MMM YYYY'];
        for (const fmt of commonFormats) {
          const tempDate = dayjs(modelValue.value, fmt);
          if (tempDate.isValid()) {
            formattedDate = tempDate;
            break;
          }
        }
      }

      if (formattedDate.isValid()) {
        const month = formattedDate.format('MM');
        const year = formattedDate.format('YYYY');

        handleValidateDate();

        monthInput.value = month;
        yearInput.value = year;
        selectedMonth.value = formattedDate.month();

        // Apply the specified format for the model value
        modelValue.value = formattedDate.format(format.value);

        handleConvertMonthIfValid();
        emitDateFormats();

        // Use the specified format for the input value
        if (!monthInput.value && !yearInput.value) {
          emit('getInputValue', null);
        } else {
          emit('getInputValue', formattedDate.format(format.value));
        }
      } else {
        console.error(`Error: Could not parse date "${modelValue.value}" with format "${format.value}"`);
      }
    }
  };

  const getMonthObject = (field: string, value: string | number) => {
    return monthsList.value.find(
      (_month: MonthsList) =>
        _month[field as keyof MonthsList].toString().toLowerCase() === value.toString().toLowerCase(),
    );
  };

  const getTabClasses = (tab: string) => {
    return classNames('mc-cursor-pointer', {
      'mc-background-color-pressed !mc-shadow-button': currentTab.value === tab,
    });
  };

  const handleMonthInput = () => {
    monthYearPopperState.value = false;

    monthInput.value = monthInput.value.replace(/[^A-Za-z0-9\s]/g, '').toLocaleUpperCase();

    monthYearPickerErrors.value = [];

    handleConvertMonthIfValid();

    handleValidateDate();

    // Emit the partial date value as user types
    emitPartialInputValue();
  };

  const handleYearInput = () => {
    monthYearPopperState.value = false;

    yearInput.value = yearInput.value.replace(/[^0-9]/g, '');

    monthYearPickerErrors.value = [];

    // Emit the partial date value as user types
    emitPartialInputValue();
  };

  const handleConvertMonthIfValid = () => {
    if (monthInput.value.length >= 2) {
      const isNumeric = !isNaN(Number(monthInput.value)) && !isNaN(parseFloat(monthInput.value));

      if (isNumeric) {
        const sanitizeMonth = monthInput.value.replace(/\b0(\d)\b/g, '$1');
        const monthNumber = Number(sanitizeMonth);

        const monthIsValid = monthsList.value.find((_month: MonthsList) => _month.monthValue + 1 === monthNumber);

        if (monthIsValid) {
          monthInput.value = monthIsValid.text.toUpperCase();
          selectedMonth.value = monthIsValid.monthValue;
        }
      } else {
        const monthIsValid = monthsList.value.find(
          (_month: MonthsList) => _month.text.toLowerCase() === monthInput.value.toLowerCase(),
        );

        if (monthIsValid) {
          monthInput.value = monthIsValid.text.toUpperCase();
          selectedMonth.value = monthIsValid.monthValue;
        }
      }
    }
  };

  const handleValidateDate = useDebounceFn(() => {
    if (monthInput.value && yearInput.value) {
      const selectedDate = `${monthInput.value}-01-${yearInput.value}`;

      const isDateValid = dayjs(selectedDate, 'MM-DD-YYYY').isValid();
      const isYearValid =
        Number(yearInput.value) >= minMaxYear.value.min && Number(yearInput.value) <= minMaxYear.value.max;

      if (isDateValid && isYearValid) {
        monthYearPickerErrors.value = monthYearPickerErrors.value.filter((error) => error.title !== 'Invalid Date');

        const monthValue = getMonthObject('text', monthInput.value)?.monthValue;
        selectedMonth.value = Number(monthValue);

        emitDateFormats();
      } else {
        const errorExists = monthYearPickerErrors.value.some((error) => error.title === 'Invalid Date');

        if (!errorExists) {
          let errorMessage;

          if (!isYearValid) {
            errorMessage = `Year must be between ${minMaxYear.value.min} and ${minMaxYear.value.max}.`;
          } else {
            errorMessage = `Invalid Date Format. Please use ${format.value}`;
          }

          monthYearPickerErrors.value.push({
            title: 'Invalid Date',
            message: errorMessage,
          });

          monthYearPopperState.value = false;

          console.error(`Invalid Date: "${selectedDate}". ${errorMessage}`);
        }
      }
    }
  }, 500);

  const handleTabClick = (tab: string) => {
    if (currentTab.value === tab) {
      // Toggle back to default tab if clicking on current tab
      currentTab.value = 'tab-months';
    } else {
      currentTab.value = tab;
    }
  };

  const handleBackspace = (inputType: string, event: KeyboardEvent) => {
    if (event && event instanceof KeyboardEvent && event.key === 'Backspace') {
      if (inputType === 'year' && yearInput.value === '') {
        if (monthInputRef.value) monthInputRef.value.focus();
      }
    }
  };

  const emitPartialInputValue = () => {
    // Convert month to numeric format if it's text
    let emittedMonth = monthInput.value;

    if (monthInput.value) {
      const isNumeric = !isNaN(Number(monthInput.value)) && !isNaN(parseFloat(monthInput.value));

      if (!isNumeric) {
        const monthIsValid = monthsList.value.find(
          (_month: MonthsList) => _month.text.toLowerCase() === monthInput.value.toLowerCase(),
        );

        if (monthIsValid) {
          emittedMonth =
            monthIsValid.monthValue < 10 ? `0${monthIsValid.monthValue + 1}` : `${monthIsValid.monthValue + 1}`;
        }
      }
    }

    // Build the partial date string with zeros for empty fields
    const partialMonth = emittedMonth || '0';
    const partialYear = yearInput.value || '0';

    const partialDateString = `${partialMonth}-${partialYear}`;

    // Emit the partial date string
    emit('getInputValue', partialDateString);
  };

  const emitDateFormats = () => {
    if (monthInput.value && yearInput.value) {
      const monthIsValid = monthsList.value.find(
        (_month: MonthsList) => _month.text.toLowerCase() === monthInput.value.toLowerCase(),
      );
      const yearIsValid = yearTabPageData.value.yearsArray.find((_year) => _year === Number(yearInput.value));

      if (monthIsValid && yearIsValid) {
        const _date = dayjs(`${monthInput.value}-01-${yearInput.value}`, 'MM-DD-YYYY');

        const formats = {
          // Standard month-year formats
          mmyyyy: _date.format('MM-YYYY'),
          yyyymm: _date.format('YYYY-MM'),

          // Month-year with slashes
          mmyyyyWithSlashes: _date.format('MM/YYYY'),
          yyyymmWithSlashes: _date.format('YYYY/MM'),

          // Full month name formats
          monthYear: _date.format('MMMM YYYY'),
          monthYearShort: _date.format('MMM YYYY'),

          // Miscellaneous formats
          mm: _date.format('MM'),
          yyyy: _date.format('YYYY'),
          mmmm: _date.format('MMMM'),
          mmm: _date.format('MMM'),
        };

        emit('getDateFormats', formats);

        // Update the model value with the formatted date using the specified format
        modelValue.value = _date.format(format.value);
      }
    }
  };

  const emitMonthList = () => {
    emit('getMonthList', monthsList.value);
  };

  const emitYearList = () => {
    emit('getYearList', yearTabPageData.value.yearsArray);
  };
  // #endregion - Helper Methods

  const clearMonthYear = () => {
    monthInput.value = '';
    yearInput.value = '';
    selectedMonth.value = null;
    modelValue.value = '';
  };

  const handleSlotClick = () => {
    if (disabled.value || readonly.value) return;
    monthYearPopperState.value = true;
  };

  watch(monthYearPopperState, (newValue) => {
    if (newValue === false) {
      setTimeout(() => {
        currentTab.value = 'tab-months';
        yearsTabSetCurrentPageYear();
      }, 500);
    }
  });

  watch(yearInput, (newValue) => {
    if (newValue) {
      const yearNumber = parseInt(newValue, 10);

      if (isNaN(yearNumber)) return;

      const yearIndex = yearTabPageData.value.yearsArray.indexOf(yearNumber);

      if (yearIndex !== -1) {
        const page = Math.floor(yearIndex / yearTabPageData.value.itemsPerPage);

        yearTabPageData.value.currentPage = page;
      }
    }
  });

  watch(
    minMaxYear,
    () => {
      yearTabPageData.value.yearsArray = Array.from(
        { length: minMaxYear.value.max - minMaxYear.value.min + 1 },
        (_, index) => minMaxYear.value.min + index,
      ).filter((year) => year <= minMaxYear.value.max && year >= minMaxYear.value.min);

      yearTabPageData.value.currentPage = 0;
      emitYearList();
    },
    { deep: true },
  );

  onClickOutside(monthYearPickerRef, () => {
    monthYearPopperState.value = false;
  });

  onMounted(() => {
    setWarningPropsValue('MinMaxYear');

    setModelValue();
    yearsTabSetCurrentPageYear();
    emitMonthList();
    emitYearList();
  });

  watch(modelValue, () => {
    setModelValue();
  });

  return {
    monthYearPickerClasses,
    monthYearPickerRef,
    monthInputRef,
    yearInputRef,
    monthYearPopperState,
    currentTab,
    currentDate,
    monthsList,
    monthInput,
    yearInput,
    monthYearPickerErrors,
    selectedMonth,
    monthTabHandleSelectedMonth,
    yearTabCurrentYearPage,
    yearTabGoToPreviousPage,
    yearTabGoToNextPage,
    yearTabIsPreviousButtonDisabled,
    yearTabIsNextButtonDisabled,
    yearTabHandleSelectedYear,
    isMonthYearPickerPopperDisabled,
    getMonthObject,
    getTabClasses,
    handleMonthInput,
    handleYearInput,
    handleTabClick,
    handleBackspace,
    clearMonthYear,
    handleSlotClick,
  };
};
