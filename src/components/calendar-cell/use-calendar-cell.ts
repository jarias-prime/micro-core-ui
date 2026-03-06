import { computed, SetupContext, toRefs } from 'vue';
import classNames from 'classnames';

import type { CalendarCellPropTypes, CalendarCellEmitTypes } from './calendar-cell';

export const useCalendarCell = (props: CalendarCellPropTypes, emit: SetupContext<CalendarCellEmitTypes>['emit']) => {
  const {
    title,
    description,
    type,
    status,
    subDescription,
    icon,
    fullwidth,
    viewOnly,
    loading,
    customColor,
    customBorderSize,
    lineThrough,
    disabled,
  } = toRefs(props);
  const offlineStatus = ['restday', 'vacation', 'holiday', 'exempt', 'sick', 'emergency'];
  const shiftLabels: Record<string, string> = {
    standard: 'Standard Day Shift',
    'early-morning': 'Early Morning',
    'late-morning': 'Late Morning',
    afternoon: 'Afternoon Shift',
    graveyard: 'Graveyard Shift',
    broken: 'Broken Shift',
    'multi-break': 'Multi Break Shift',
    'flexible-break': 'Flexible Break Shift',
    'flexible-weekly': 'Flexible Weekly',
    'flexible-daily': 'Flexible Daily',
    'fixed-flexible': 'Fixed Flexible',
    restday: 'RESTDAY',
    vacation: 'VACATION',
    emergency: 'EMERGENCY',
    exempt: 'EXEMPT',
    sick: 'SICK',
    holiday: 'HOLIDAY',
  } as const;

  const iconMap: Record<string, string> = {
    restday: 'ph:prohibit',
    holiday: 'ph:prohibit',
    exempt: 'ph:prohibit',
    vacation: 'ph:island',
    sick: 'ph:pill',
    emergency: 'ph:ambulance',
  } as const;

  const typeClasses: Record<string, string> = {
    standard: 'mc-border-kangkong-700 mc-bg-kangkong-50',
    'early-morning': 'mc-border-blueberry-700 mc-bg-blueberry-50',
    'late-morning': 'mc-border-color-pending-base mc-bg-mango-50',
    afternoon: 'mc-border-carrot-600 mc-bg-carrot-50',
    graveyard: 'mc-border-wintermelon-600 mc-bg-wintermelon-50',
    broken: 'mc-border-ubas-700 mc-bg-ubas-50',
    'multi-break': 'mc-border-[#F652F2] mc-bg-[#FDECFD]',
    'flexible-break': 'mc-border-[#24B155] mc-bg-[#CEFFE1]',
    'flexible-weekly': 'mc-border-[#539300] mc-bg-[#EBFFD2]',
    'flexible-daily': 'mc-border-[#0084CB] mc-bg-[#D4F0FF]',
    'fixed-flexible': 'mc-border-[#C771A6] mc-bg-[#FFF2FA]',
  };

  const getCellIcon = computed((): string => {
    return icon.value || iconMap[type.value];
  });
  const hasContent = computed(() => title.value || description.value || getShiftLabel.value);
  const hasIconStatus = computed(() => status.value != 'error' && getCellIcon.value);
  const isError = computed(() => status.value === 'error');

  const getShiftLabel = computed((): string => {
    return subDescription.value || shiftLabels[type.value];
  });

  const getCellClasses = computed((): string => {
    return typeClasses[type.value] || 'mc-border-color-supporting mc-background-color-surface';
  });

  const getCustomColorStyles = computed(() => {
    if (!customColor.value || !customColor.value.startsWith('#')) return {};
    if (customColor.value === '#FFFFFF') {
      return {
        borderColor: '#B8C1C0',
        backgroundColor: customColor.value,
      };
    }

    const opacity = '20'; // 20 in hex = 12.5% opacity

    return {
      borderColor: customColor.value,
      backgroundColor: customColor.value.startsWith('#') ? `${customColor.value}${opacity}` : customColor.value,
    };
  });

  const getCalendarCellClassess = computed(() => {
    const calendarCellWrapper = classNames(
      'mc-flex mc-items-center mc-p-size-spacing-3xs mc-gap-size-spacing-3xs mc-relative mc-rounded-lg mc-border-2 mc-transition-all mc-flex-col sm:mc-flex-row mc-overflow-hidden',

      {
        'mc-w-full': fullwidth.value,
        'mc-max-w-[217px]': !fullwidth.value,
        'mc-cursor-pointer': !viewOnly.value,
        'mc-h-[80px] mc-skeletal-loader': loading.value,
        [`mc-border-[${customBorderSize.value}px]`]: customBorderSize.value,
      },
    );

    const statusCellClasses = classNames({
      'mc-border-dashed': status.value === 'pending',
      'mc-border-solid mc-border-color-danger-base': status.value === 'error',
      'mc-border-solid': !status.value || (status.value !== 'pending' && status.value !== 'error'),
      'mc-border-opacity-50 ': disabled.value,
    });

    const titleClasses = classNames('mc-text-color-strong mc-body-sm-regular-medium', {
      'mc-text-color-danger-base': status.value === 'error',
    });

    const descriptionClasses = classNames('mc-text-color-strong mc-body-sm-regular', {
      'mc-text-color-danger-base': status.value === 'error',
    });

    const getTypeLabelClassess = classNames('mc-text-color-strong mc-body-sm-regular', {
      'mc-text-color-danger-base': status.value === 'error',
      'mc-text-color-strong mc-body-sm-regular-medium': offlineStatus.includes(type.value),
    });

    const getMainClasses = classNames(calendarCellWrapper, getCellClasses.value, statusCellClasses);

    const getTextFormatClasses = classNames('mc-break-words', {
      'mc-line-through': lineThrough.value,
      'mc-opacity-50': disabled.value,
    });

    return {
      titleClasses,
      descriptionClasses,
      getTypeLabelClassess,
      getMainClasses,
      getCellClasses,
      getTextFormatClasses,
    };
  });

  const handleClick = (evt: MouseEvent) => {
    if (viewOnly.value) {
      evt.stopPropagation();

      return;
    }
    emit('onClick', evt);
  };

  return {
    getCalendarCellClassess,
    getCellIcon,
    offlineStatus,
    getShiftLabel,
    hasIconStatus,
    isError,
    hasContent,
    handleClick,
    getCustomColorStyles,
  };
};
