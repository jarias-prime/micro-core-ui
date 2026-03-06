import { toRefs, computed, ComputedRef } from 'vue';

import classNames from 'classnames';

import type { SetupContext } from 'vue';
import type { CheckboxPropTypes, CheckboxEmitTypes } from './checkbox';

interface CheckboxClasses {
  baseClasses: string;
  inputCheckboxClasses: string;
  inputCheckboxCheckIconClasses: string;
  labelClasses: string;
  descriptionClasses: string;
  borderedClasses: string;
}

export const useCheckbox = (props: CheckboxPropTypes, emit: SetupContext<CheckboxEmitTypes>['emit']) => {
  const { modelValue, disabled, checked, bordered, fullWidth } = toRefs(props);

  const checkboxClasses: ComputedRef<CheckboxClasses> = computed(() => {
    const baseClasses = classNames(
      'mc-flex mc-w-fit mc-select-none mc-items-center mc-gap-1.5 mc-transition mc-duration-150 mc-ease-in-out',
      {
        'mc-cursor-not-allowed': disabled.value,
        'mc-cursor-pointer': !disabled.value,
      },
    );

    const inputCheckboxClasses = classNames(
      'mc-h-[20px] mc-w-[20px] mc-appearance-none mc-rounded-[2.5px] mc-border-color-supporting mc-border-[1.25px] mc-border-solid mc-m-1',
      'mc-transition mc-duration-150 mc-ease-in-out',
      {
        'mc-background-color-brand-base mc-border-color-brand-base': isChecked.value && !disabled.value,
        'hover:mc-background-color-brand-hover hover:mc-border-color-brand-hover':
          isChecked.value && !bordered.value && !disabled.value, //remove hover checkbox styling when bordered
        'hover:mc-background-color-hover': !isChecked.value && !bordered.value, //remove hover checkbox styling when bordered
        'mc-border-color-on-fill-disabled mc-background-color-disabled mc-cursor-not-allowed':
          !isChecked.value && disabled.value,
        'mc-bg-white-300 mc-border-none': isChecked.value && disabled.value,
        'mc-cursor-pointer': !disabled.value,
      },
    );

    const inputCheckboxCheckIconClasses = classNames(
      'mc-h-[20px] mc-w-[20px] mc-flex mc-items-center mc-justify-center mc-pointer-events-none mc-absolute mc-left-1/2 mc-top-1/2 -mc-translate-x-1/2 -mc-translate-y-1/2 mc-transform mc-font-bold mc-opacity-0 mc-text-color-inverted-strong',
      {
        'mc-opacity-100': isChecked.value,
      },
    );

    const labelClasses = classNames('mc-body-sm-regular mc-text-color-strong mc-block', {
      'mc-text-color-on-fill-disabled': disabled.value,
    });

    const descriptionClasses = classNames('mc-body-xs-regular mc-block', {
      'mc-text-color-on-fill-disabled': disabled.value,
    });

    const borderedClasses = classNames('mc-border mc-rounded-md mc-p-size-spacing-2xs mc-border-solid mc-box-border', {
      'mc-border-color-success-base mc-bg-kangkong-100': (modelValue.value || checked.value) && !disabled.value,
      'mc-border-color-base': (!modelValue.value || !checked.value) && !disabled.value,
      'hover:mc-background-color-hover': (!modelValue.value && !checked.value) || disabled.value,
      'mc-border-0 mc-bg-white-100': disabled.value,
      'mc-w-fit': !fullWidth.value,
      'mc-w-full': fullWidth.value,
    });

    return {
      baseClasses,
      inputCheckboxClasses,
      inputCheckboxCheckIconClasses,
      labelClasses,
      descriptionClasses,
      borderedClasses,
    };
  });

  const handleCheckbox = (event: Event): void => {
    if (event.target instanceof HTMLInputElement) {
      emit('update:modelValue', event.target.checked);
    }
  };

  const resolveCheckboxIcon = computed(() => {
    if (props.indeterminate) return 'ph:minus-bold';

    return 'ph:check-bold';
  });

  const isChecked = computed(() => modelValue.value || checked.value);

  return {
    checkboxClasses,
    handleCheckbox,
    resolveCheckboxIcon,
  };
};
