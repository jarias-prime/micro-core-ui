import { toRefs, computed } from 'vue';
import { useVModel } from '@vueuse/core';

import classNames from 'classnames';

import type { SetupContext } from 'vue';
import type { TextAreaPropTypes, TextAreaEmitTypes } from './textarea';

export const useTextArea = (props: TextAreaPropTypes, emit: SetupContext<TextAreaEmitTypes>['emit']) => {
  const { error, disabled, readonly } = toRefs(props);

  const modelValue = useVModel(props, 'modelValue', emit);

  const textareaClasses = computed(() => {
    const wrapperClasses = classNames('mc-flex mc-flex-col mc-gap-size-spacing-4xs');

    const labelClasses = classNames('mc-body-sm-regular mc-text-color-strong mc-flex mc-gap-2', {
      'mc-text-color-on-fill-disabled': disabled.value,
      'mc-text-color-base': readonly.value,
    });

    const supportingLabelClasses = classNames('mc-body-sm-regular mc-text-color-supporting', {
      'mc-text-color-on-fill-disabled': disabled.value,
      'mc-text-color-base': readonly.value,
    });

    const textAreaClasses = classNames(
      'mc-block mc-w-full mc-px-size-spacing-2xs mc-py-size-spacing-4xs mc-rounded-border-radius-md mc-outline-none mc-ring-0 mc-resize-none mc-font-main',
      'mc-text-color-strong mc-font-size-200',
      'mc-border mc-border-solid',
      'placeholder:mc-text-mushroom-300',
      {
        'mc-border-mushroom-200 focus:mc-border-kangkong-700': !error.value && !disabled.value,
        'mc-border-tomato-600 focus:mc-border-tomato-600': error.value,
        'mc-background-color-disabled mc-border-white-100 focus:mc-border-white-100 mc-cursor-not-allowed mc-text-color-on-fill-disabled':
          disabled.value,
        'mc-background-color-disabled mc-border-white-100 focus:mc-border-white-100 mc-cursor-not-allowed   mc-text-color-base':
          readonly.value,
      },
    );

    const helperClasses = classNames('mc-body-sm-regular mc-flex mc-items-center mc-gap-size-spacing-5xs', {
      'mc-text-color-danger-base': error.value,
      'mc-text-color-supporting': !error.value,
    });

    const slotWrapperClasses = classNames('mc-flex mc-items-start', {
      'mc-justify-between': props.displayHelper && props.hasCounter,
      'mc-justify-end': !props.displayHelper && props.hasCounter,
    });

    return { wrapperClasses, labelClasses, supportingLabelClasses, textAreaClasses, helperClasses, slotWrapperClasses };
  });

  const onInput = (event: Event) => {
    modelValue.value = (event.target as HTMLInputElement).value;
  };

  return {
    textareaClasses,
    onInput,
  };
};
