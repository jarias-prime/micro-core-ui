import { ref, toRefs, computed, ComputedRef } from 'vue';
import { useVModel, useElementHover } from '@vueuse/core';

import classNames from 'classnames';

import type { SetupContext } from 'vue';
import type { RadioPropTypes, RadioEmitTypes } from './radio';

interface RadioClasses {
  baseClasses: string;
  baseInputClasses: string;
  baseIndicatorClasses: string;
  labelClasses: string;
  borderedClasses: string;
}

export const useRadioButton = (
  props: RadioPropTypes,
  emit: SetupContext<RadioEmitTypes>['emit'],
  slots: Record<string, unknown>,
) => {
  const { modelValue, disabled, description, bordered, fullWidth, choiceBox } = toRefs(props);

  const radioRef = ref<HTMLInputElement | null>(null);
  const isHovered = useElementHover(radioRef);

  const radioClasses: ComputedRef<RadioClasses> = computed(() => {
    const baseClasses = classNames('mc-relative mc-m-0 mc-flex mc-items-center', {
      'mc-inline-block': !choiceBox.value,
      'mc-block': choiceBox.value,
      'mc-w-full': fullWidth.value || choiceBox.value,
      'mc-align-middle': !choiceBox.value,
      'mc-border-color mc-border-color-weak mc-border mc-border-solid mc-p-2 mc-rounded-lg mc-transition mc-ease-in-out mc-duration-150 active:mc-scale-[0.98]':
        choiceBox.value,
      'mc-border-color-success-base mc-background-color-brand-weak':
        choiceBox.value && String(modelValue?.value) === String(props.value) && !disabled.value,
      'mc-cursor-pointer': choiceBox.value && !disabled.value,
      'mc-cursor-not-allowed': disabled.value && choiceBox.value,
    });

    const baseInputClasses = classNames('mc-sr-only mc-peer mc-inline-block', {
      'mc-cursor-not-allowed': disabled.value,
    });

    const baseIndicatorClasses = classNames(
      'mc-inline-block mc-w-4 mc-h-4 mc-rounded-full mc-border-2 mc-border-solid mc-shrink-0',
      {
        'mc-mr-2': slots.default,
        'group-active:mc-scale-95': !disabled.value,
      },

      // Hover State
      {
        // Hover state with matching value
        'mc-background-color-brand-hover mc-border-2 mc-border-color-brand-hover mc-shadow-[inset_0px_0px_0px_2.5px_#fff]':
          isHovered.value && String(modelValue?.value) === String(props.value) && !disabled.value && !bordered.value,

        // Hover state but different value
        'mc-background-color-base mc-border-2 mc-border-color-supporting mc-shadow-[inset_0px_0px_0px_2.5px_#fff]':
          isHovered.value && String(modelValue?.value) !== String(props.value) && !disabled.value && !bordered.value,

        // Bordered Hover state but different value
        'mc-background-color-base mc-border-2 mc-border-color-supporting':
          isHovered.value && String(modelValue?.value) !== String(props.value) && !disabled.value && bordered.value,
      },

      // Active State
      {
        // Active state with matching value
        'mc-border-color-brand-base mc-background-color-brand-base mc-shadow-[inset_0px_0px_0px_2.5px_#fff] animate-shadow-grow':
          String(modelValue?.value) === String(props.value) && !disabled.value && !bordered.value,

        // Active state with different value
        'mc-border-color-supporting mc-shadow-[inset_0px_0px_0px_2.5px#fff]':
          String(modelValue?.value) !== String(props.value) && !disabled.value && !bordered.value,

        //Bordered Active state with matching value
        'mc-border-color-brand-base mc-background-color-brand-base animate-shadow-grow':
          String(modelValue?.value) === String(props.value) && !disabled.value && bordered.value,

        //Bordered Active state with different value
        'mc-border-color-supporting':
          String(modelValue?.value) !== String(props.value) && !disabled.value && bordered.value,
      },

      // Disabled State
      {
        'mc-cursor-not-allowed': disabled.value,

        // Disabled state with matching value
        'mc-border-color-disabled mc-background-color-disabled mc-shadow-[inset_0px_0px_0px_2.5px_#fff]':
          disabled.value && String(modelValue?.value) === String(props.value) && !bordered.value,

        // Disabled state but different value
        'mc-border-color-disabled mc-background-color mc-cursor-not-allowed':
          disabled.value && String(modelValue?.value) !== String(props.value) && !bordered.value,

        // Bordered Disabled state with matching value
        'mc-bg-white-400 mc-shadow-[inset_0px_0px_0px_2.5px_#fff]':
          disabled.value && String(modelValue?.value) === String(props.value) && bordered.value,

        // Bordered Disabled state but different value
        'mc-border-white-400 mc-background-color-disabled':
          disabled.value && String(modelValue?.value) !== String(props.value) && bordered.value,
      },
    );

    const labelClasses = classNames(
      'mc-group mc-m-0 mc-inline-flex mc-w-auto mc-items-center mc-p-0 mc-font-main',
      'mc-text-color-strong mc-inline-flex mc-items-center mc-p-0',
      {
        'mc-text-color-disabled': disabled.value && !bordered.value,
        'mc-text-color-on-fill-disabled': disabled.value && bordered.value,
        'mc-cursor-pointer': !disabled.value,
        'mc-cursor-not-allowed': disabled.value,
      },
    );

    const borderedClasses = classNames('mc-border mc-rounded-md mc-p-size-spacing-2xs mc-border-solid mc-box-border', {
      //enabled state
      'mc-border-color-brand-base mc-background-color-brand-weak':
        String(modelValue?.value) === String(props.value) && !disabled.value, // matching value
      'mc-border-color-weak mc-bg-white-50 hover:mc-background-color-hover':
        String(modelValue?.value) !== String(props.value) && !disabled.value, // different value

      //disabled state
      'mc-border-color-disabled mc-background-color-disabled': disabled.value,

      'mc-w-full': fullWidth.value,
      'mc-w-fit': !fullWidth.value,
    });

    return {
      baseClasses,
      baseInputClasses,
      baseIndicatorClasses,
      labelClasses,
      borderedClasses,
    };
  });

  const proxyValue = useVModel(props, 'modelValue', emit);

  return {
    radioRef,
    radioClasses,
    isHovered,
    proxyValue,
    description,
    bordered,
  };
};
