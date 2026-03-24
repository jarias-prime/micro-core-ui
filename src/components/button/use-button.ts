import { ref, toRefs, computed, ComputedRef } from 'vue';
import { useElementHover, useMousePressed, useFocus } from '@vueuse/core';

import type { SetupContext } from 'vue';
import type { ButtonEmitTypes, ButtonPropTypes } from './button';

// Static maps — fully scannable by Tailwind
const SIZE_CLASSES: Record<string, string> = {
  small: 'mc:min-w-6 mc:p-1.5 mc:leading-none mc:text-xs',
  medium: 'mc:min-w-7 mc:p-2 mc:leading-none mc:text-xs',
  large: 'mc:max-h-9 mc:min-w-9 mc:px-2 mc:py-3 mc:leading-normal mc:text-sm',
};

const SIZE_ICON_CLASSES: Record<string, string> = {
  small: 'mc:min-w-6 mc:p-1.5 mc:leading-none mc:text-xs [&>svg]:mc:text-sm',
  medium: 'mc:min-w-7 mc:p-2 mc:leading-none mc:text-xs [&>svg]:mc:text-base',
  large: 'mc:max-h-9 mc:min-w-9 mc:px-2 mc:py-3 mc:leading-normal mc:text-sm [&>svg]:mc:text-xl',
};

const DEFAULT_BG_CLASSES: Record<string, string> = {
  neutral: 'mc-background-color-base',
  success: 'mc-background-color-brand-base',
  danger: 'mc-background-color-danger-base',
};

const HOVERED_BG_CLASSES: Record<string, string> = {
  neutral: 'mc-background-color-hover',
  success: 'mc-background-color-success-pressed',
  danger: 'mc-background-color-danger-hover',
};

const PRESSED_BG_CLASSES: Record<string, string> = {
  neutral: 'mc-background-color-pressed !mc:shadow-sm',
  success: 'mc-background-color-brand-pressed !mc:shadow-sm',
  danger: 'mc-background-color-danger-pressed !mc:shadow-sm',
};

const PRIMARY_TEXT_CLASSES: Record<string, string> = {
  neutral: 'mc-text-color-strong',
  success: 'mc-text-color-inverted-strong',
  danger: 'mc-text-color-inverted-strong',
};

const SECONDARY_TERTIARY_TEXT_CLASSES: Record<string, string> = {
  neutral: 'mc-text-color-strong',
  success: 'mc-text-color-brand-base',
  danger: 'mc-text-color-danger-base',
};

const SECONDARY_BORDER_CLASSES: Record<string, string> = {
  neutral: 'mc-border-color-base',
  success: 'mc-border-color-brand-base',
  danger: 'mc-border-color-danger-base',
};

export const useButton = (props: ButtonPropTypes, emit: SetupContext<ButtonEmitTypes>['emit']) => {
  const { state, type, size, tone, variant, disabled, hasIcon, fullwidth } = toRefs(props);

  const buttonRef = ref<HTMLButtonElement | null>(null);

  const isHovered = useElementHover(buttonRef);
  const { pressed } = useMousePressed({ target: buttonRef });
  const { focused } = useFocus(buttonRef);

  // #region - Class Computeds
  const defaultClasses: ComputedRef<string> = computed(() => {
    const base =
      'mc:background-color mc:flex mc:items-center mc:gap-1.5 mc:w-fit mc:min-w-[24px] mc:justify-center mc:rounded-md mc:cursor-pointer';

    return fullwidth.value ? `${base} mc:w-full` : base;
  });

  const sizeClasses: ComputedRef<string> = computed(() => {
    const map = hasIcon.value ? SIZE_ICON_CLASSES : SIZE_CLASSES;
    return `mc:font-medium ${map[size.value] ?? ''}`;
  });

  const transitionClasses = 'mc:transition mc:duration-150 mc:ease-in-out mc:hover:shadow-md active:mc:scale-95';

  const buttonTextCssClass: ComputedRef<string> = computed(() => {
    if (variant.value === 'secondary' || variant.value === 'tertiary') {
      return SECONDARY_TERTIARY_TEXT_CLASSES[tone.value] ?? '';
    }

    return PRIMARY_TEXT_CLASSES[tone.value] ?? '';
  });

  const buttonBackgroundCssClass: ComputedRef<string> = computed(() => {
    if (variant.value === 'secondary') {
      if (pressed.value) return 'mc-background-color-pressed !mc:shadow-sm';
      if (isHovered.value) return 'mc-background-color-hover';

      return 'mc:background-color';
    }

    if (variant.value === 'tertiary') {
      if (pressed.value) return 'mc-background-color-pressed !mc:shadow-sm';
      if (isHovered.value) return '!mc:border-none mc-background-color-hover';

      return '!mc:border-none';
    }

    // primary
    if (pressed.value) return PRESSED_BG_CLASSES[tone.value] ?? '';
    if (isHovered.value) return HOVERED_BG_CLASSES[tone.value] ?? '';

    return DEFAULT_BG_CLASSES[tone.value] ?? '';
  });

  const buttonBorderCssClass: ComputedRef<string> = computed(() => {
    if (variant.value === 'secondary') {
      const borderColor = SECONDARY_BORDER_CLASSES[tone.value] ?? '';

      return `mc:border mc:border-solid ${borderColor}`;
    }

    if (variant.value === 'tertiary') {
      return 'mc:border mc:border-solid mc:border-transparent';
    }

    // primary
    if (focused.value) return 'mc:border mc:border-solid mc:border-white-50';

    return 'mc:border mc:border-solid mc:border-transparent';
  });

  // #endregion

  const buttonClassses: ComputedRef<string> = computed(() => {
    const base = `${defaultClasses.value} ${sizeClasses.value}`;

    if (disabled.value) {
      if (variant.value === 'primary') {
        return `${base} mc-text-color-disabled mc:background-color-disabled !mc:shadow-none !mc:cursor-not-allowed mc:border-none`;
      }

      if (variant.value === 'secondary') {
        return `${base} mc-text-color-disabled !mc:shadow-none !mc:cursor-not-allowed mc:border mc:border-solid mc:border-color-disabled`;
      }

      if (variant.value === 'tertiary') {
        return `${base} mc-text-color-disabled !mc:shadow-none !mc:cursor-not-allowed mc:border-none`;
      }
    }

    return `${base} ${buttonBackgroundCssClass.value} ${buttonTextCssClass.value} ${buttonBorderCssClass.value} ${transitionClasses}`;
  });

  const buttonProps: ComputedRef<Record<string, unknown>> = computed(() => ({
    ...(disabled.value && { ariaDisabled: true }),
    disabled: disabled.value,
    autofocus: state.value === 'focus',
    type: type.value,
  }));

  const handleClick = (evt: MouseEvent) => {
    if (disabled.value) {
      evt.stopPropagation();
      return;
    }
    emit('click', evt);
  };

  return {
    buttonClassses,
    buttonRef,
    buttonProps,
    handleClick,
  };
};
