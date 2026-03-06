import { computed, ref, ComputedRef, toRefs, useSlots } from 'vue';
import { useElementHover, useMousePressed } from '@vueuse/core';

import classNames from 'classnames';

import type { SwitchPropTypes } from './switch';

export const useSwitch = (props: SwitchPropTypes) => {
  const switchWrapperRef = ref<HTMLDivElement | null>(null);
  const switchRef = ref<HTMLInputElement | null>(null);

  const isHovered = useElementHover(switchWrapperRef);
  const { pressed } = useMousePressed({ target: switchRef });
  const { disabled, state, modelValue } = toRefs(props);
  const slots = useSlots();

  // if the slot label is empty, we will not show the label
  const isLeftTextLabel = (!slots.default || slots.default().length === 0) && !slots.leftText;
  const isRightTextLabel = !slots.rightText;

  const switchProps: ComputedRef<Record<string, unknown>> = computed(() => {
    return {
      ...(disabled.value && { ariaDisabled: true }),
      disabled: disabled.value,
      autofocus: state.value === 'hover',
      modelValue: modelValue,
    };
  });

  // #region - Background CSS Class
  const switchBackgroundCssClass: ComputedRef<string> = computed(() => {
    if (props.disabled) {
      return getDisabledBackground();
    }

    if (pressed.value) {
      return getPressedBackground();
    }

    if (isHovered.value) {
      return getHoveredBackground();
    }

    return getDefaultBackground();
  });

  function getDefaultBackground(): string {
    return props.modelValue ? 'mc-background-color-success-base' : 'mc-switch-background-default';
  }

  function getHoveredBackground(): string {
    return props.modelValue ? 'mc-background-color-success-hover' : 'mc-switch-background-hover';
  }

  function getPressedBackground(): string {
    return props.modelValue ? 'mc-background-color-success-pressed' : 'mc-switch-background-pressed';
  }

  function getDisabledBackground(): string {
    return classNames(
      {
        'mc-background-color-success-base': props.modelValue,
        'mc-switch-background-default': !props.modelValue,
      },
      'mc-opacity-60',
    );
  }
  // #endregion - Background CSS Class

  const switchTextClass: ComputedRef<string> = computed(() => {
    if (props.disabled) {
      return 'mc-text-color-disabled';
    }

    return 'mc-text-color-strong';
  });

  const switchAnimationCssClass: ComputedRef<string> = computed(() => {
    return classNames(
      'mc-transition-colors',
      'before:mc-transition-all before:mc-duration-150',
      'after:mc-transition-all after:mc-duration-150',
    );
  });

  const switchMarkClass: ComputedRef<string> = computed(() => {
    return classNames(switchBackgroundCssClass.value, switchAnimationCssClass.value);
  });

  const switchInputClass: ComputedRef<string> = computed(() => {
    return classNames({
      'mc-cursor-not-allowed': props.disabled,
      'mc-cursor-pointer': !props.disabled,
    });
  });

  return {
    switchWrapperRef,
    switchRef,
    switchProps,
    switchMarkClass,
    switchTextClass,
    switchInputClass,
    isLeftTextLabel,
    isRightTextLabel,
  };
};
