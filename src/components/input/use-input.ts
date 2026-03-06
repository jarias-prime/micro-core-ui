import { ref, toRefs, computed, ComputedRef } from 'vue';
import { useVModel, useFocus } from '@vueuse/core';

import classNames from 'classnames';

import type { SetupContext } from 'vue';
import type { InputPropTypes, InputEmitTypes } from './input';

interface InputClasses {
  baseClasses: string;
  labelClasses: string;
  supportingLabelClasses: string;
  inputTextBaseClasses: string;
  inputTextClasses: string;
  iconSlotClasses: string;
  prefixSlotClasses: string;
  trailingSlotClasses: string;
  helperClasses: string;
  charCountClasses: string;
  helperContainerClasses: string;
}

export const useInput = (
  props: InputPropTypes,
  emit: SetupContext<InputEmitTypes>['emit'],
  slots: Record<string, unknown>,
) => {
  const { active, error, disabled, offsetSize, showCharCount, maxLength } = toRefs(props);

  const inputTextRef = ref(null);

  const { focused } = useFocus(inputTextRef);

  const modelValue = useVModel(props, 'modelValue', emit);

  const currentLength = computed(() => {
    return modelValue.value ? String(modelValue.value).length : 0;
  });

  const hasCharLimit = computed(() => {
    return maxLength.value !== undefined && maxLength.value > 0;
  });

  const inputClasses: ComputedRef<InputClasses> = computed(() => {
    const baseClasses = classNames('mc-flex mc-flex-col mc-gap-size-spacing-4xs');

    const labelClasses = classNames('mc-body-sm-regular mc-text-color-strong mc-flex mc-gap-2', {
      'mc-text-color-on-fill-disabled': disabled.value,
    });

    const supportingLabelClasses = classNames('mc-body-sm-regular mc-text-color-supporting', {
      'mc-text-color-on-fill-disabled': disabled.value,
    });

    const inputTextBaseClasses = classNames(
      'mc-relative mc-flex mc-items-center mc-p-[1.5px] mc-rounded-border-radius-md mc-border-[1.5px] mc-border-solid',
      {
        // Border State
        'mc-border-color-weak': !focused.value && !error.value && !disabled.value && !active.value,
        'mc-border-color-brand-base': !focused.value && active.value,
        'mc-border-color-danger-base': !focused.value && error.value,

        // Border State Focused
        'focus: mc-border-kangkong-700': focused.value && !error.value && !disabled.value && !active.value,
        'focus: mc-border-tomato-600': focused.value && error.value,
        'focus: mc-border-white-100': focused.value && disabled.value,

        // Disabled State
        'mc-background-color-disabled mc-cursor-not-allowed mc-border-mushroom-100': disabled.value,
      },
    );

    const inputTextClasses = classNames(
      'mc-block mc-h-8 mc-py-size-spacing-4xs mc-outline-none mc-ring-0 mc-border-none mc-rounded-border-radius-md',
      'mc-font-main mc-font-size-200 [font-weight:inherit]',
      'placeholder:mc-text-mushroom-300',
      {
        'mc-text-color-strong': !disabled.value,

        // Disabled State
        'mc-text-color-on-fill-disabled !mc-cursor-not-allowed': disabled.value,

        // Prefix, Suffix, Trailing
        'mc-px-3': !slots.prefix && !slots.icon && !slots.trailing,
        'mc-pr-3': slots.prefix && !slots.icon && !slots.trailing,
        'mc-pl-3': !slots.prefix && (slots.icon || slots.trailing),

        // Trailing Width Adjustments
        'mc-w-full': !slots.trailing,
        'mc-w-[50px]': slots.trailing && offsetSize.value === 'xs',
        'mc-w-[40%]': slots.trailing && offsetSize.value === 'sm',
        'mc-w-[100%]': slots.trailing && offsetSize.value === 'md',
      },
    );

    const iconSlotClasses = classNames(
      'mc-flex mc-items-center mc-justify-center mc-h-8 mc-px-2 [&>svg]:mc-min-h-4 [&>svg]:mc-min-w-4',
      {
        'mc-text-mushroom-300': !error.value,
        'mc-text-tomato-600': error.value,
      },
    );

    const prefixSlotClasses = classNames(
      'mc-flex mc-items-center mc-justify-center mc-h-8 mc-px-2 [&>svg]:mc-min-h-4 [&>svg]:mc-min-w-4',
      {
        'mc-text-mushroom-300': !error.value,
        'mc-text-tomato-600': error.value,
        'mc-font-size-200': props.type === 'url',
      },
    );

    const trailingSlotClasses = classNames('mc-flex mc-items-center mc-h-8 mc-w-full mc-px-2', {
      'mc-text-mushroom-300': !error.value,
      'mc-text-tomato-600': error.value,
    });

    const helperContainerClasses = classNames('mc-flex mc-flex-row mc-items-start mc-justify-between mc-w-full', {
      'mc-mt-1': showCharCount.value || props.displayHelper,
    });

    const helperClasses = classNames('mc-body-sm-regular mc-flex mc-items-center mc-gap-size-spacing-5xs mc-flex-1', {
      'mc-text-color-danger-base': error.value,
      'mc-text-color-supporting': !error.value,
    });

    const charCountClasses = classNames(
      'mc-ml-auto mc-body-2xs-regular mc-text-right mc-text-xs mc-text-color-supporting',
      {
        'mc-text-color-danger-base': hasCharLimit.value && currentLength.value >= (maxLength.value || 0),
      },
    );

    return {
      baseClasses,
      labelClasses,
      supportingLabelClasses,
      inputTextBaseClasses,
      inputTextClasses,
      iconSlotClasses,
      prefixSlotClasses,
      trailingSlotClasses,
      helperClasses,
      charCountClasses,
      helperContainerClasses,
    };
  });

  const onInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    let value: string | number = target.value;

    // Convert to number if type is number
    if (props.type === 'number' && value !== '') {
      value = Number(value);
    }

    modelValue.value = value;
  };

  const onBlur = (event: Event) => {
    emit('blur', event);
  };

  const disableClickEvent = (event: Event) => {
    if (disabled.value) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  return {
    inputTextRef,
    inputClasses,
    onInput,
    onBlur,
    disableClickEvent,
    currentLength,
    hasCharLimit,
  };
};
