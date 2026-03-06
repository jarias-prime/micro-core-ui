import { ref, toRefs, computed, ComputedRef } from 'vue';
import { useElementHover, useMousePressed, useFocus } from '@vueuse/core';

import classNames from 'classnames';

import type { SetupContext } from 'vue';
import type { ButtonEmitTypes, ButtonPropTypes } from './button';

export const useButton = (props: ButtonPropTypes, emit: SetupContext<ButtonEmitTypes>['emit']) => {
  const { state, type, size, tone, variant, disabled, hasIcon, fullwidth } = toRefs(props);

  const buttonRef = ref<HTMLButtonElement | null>(null);

  const isHovered = useElementHover(buttonRef);
  const { pressed } = useMousePressed({ target: buttonRef });
  const { focused } = useFocus(buttonRef);

  const buttonClassses: ComputedRef<string> = computed(() => {
    const defaultClasses = classNames(
      'mc-background-color mc-flex mc-items-center mc-gap-1.5 mc-w-fit mc-min-w-[24px] mc-items-center mc-justify-center mc-rounded-md mc-outline-2 mc-outline-offset-4',
      {
        'mc-w-full': fullwidth.value,
      },
    );

    const sizeClasses = classNames('mc-font-medium', {
      'mc-min-w-6 mc-p-1.5 mc-leading-100 mc-font-size-100': !hasIcon.value && size.value === 'small',
      'mc-min-w-7 mc-p-2 mc-leading-100 mc-font-size-100': !hasIcon.value && size.value === 'medium',
      'mc-max-h-9 mc-min-w-9 mc-px-2 mc-py-3 mc-leading-300 mc-font-size-200': !hasIcon.value && size.value === 'large',

      // Has Icon
      'mc-min-w-6 mc-p-1.5 mc-leading-100 mc-font-size-100 [&>svg]:mc-font-size-200':
        hasIcon.value && size.value === 'small',
      'mc-min-w-7 mc-p-2 mc-leading-100 mc-font-size-100 [&>svg]:mc-font-size-300':
        hasIcon.value && size.value === 'medium',
      'mc-max-h-9 mc-min-w-9 mc-px-2 mc-py-3 mc-leading-300 mc-font-size-200 [&>svg]:mc-font-size-400':
        hasIcon.value && size.value === 'large',
    });

    const toneClasses = classNames(
      buttonBackgroundCssClass.value,
      buttonTextCssClass.value,
      buttonBorderCssClass.value,
    );

    const transitionClasses = classNames([
      'mc-transition mc-duration-150 mc-ease-in-out',
      'hover:mc-shadow-button-hover',
      'active:mc-scale-95',
    ]);

    if (disabled.value) {
      if (variant.value === 'primary')
        return classNames(
          defaultClasses,
          sizeClasses,
          'mc-text-color-disabled mc-background-color-disabled !mc-shadow-none !mc-cursor-not-allowed mc-border-none',
        );

      if (variant.value === 'secondary')
        return classNames(
          defaultClasses,
          sizeClasses,
          'mc-text-color-disabled !mc-shadow-none !mc-cursor-not-allowed mc-border mc-border-solid mc-border-color-disabled',
        );

      if (variant.value === 'tertiary')
        return classNames(
          defaultClasses,
          sizeClasses,
          'mc-text-color-disabled !mc-shadow-none !mc-cursor-not-allowed mc-border-none',
        );
    }

    return classNames(defaultClasses, sizeClasses, toneClasses, transitionClasses);
  });

  const buttonTextCssClass: ComputedRef<string> = computed(() => {
    if (variant.value === 'secondary' || variant.value === 'tertiary') {
      return classNames({
        'mc-text-color-strong': tone.value === 'neutral',
        'mc-text-color-brand-base': tone.value === 'success',
        'mc-text-color-danger-base': tone.value === 'danger',
      });
    }

    return classNames({
      'mc-text-color-strong': tone.value === 'neutral',
      'mc-text-color-inverted-strong': tone.value === 'success' || tone.value === 'danger',
    });
  });

  // #region - Background Css Class
  const buttonBackgroundCssClass: ComputedRef<string> = computed(() => {
    if (variant.value === 'secondary') {
      if (pressed.value) {
        return 'mc-background-color-pressed !mc-shadow-button';
      }

      return isHovered.value ? 'mc-background-color-hover' : 'mc-background-color ';
    }

    if (variant.value === 'tertiary') {
      return getTertiaryBackground();
    }

    return getBackgroundBasedOnState();
  });

  const getTertiaryBackground = (): string => {
    if (pressed.value) {
      return 'mc-background-color-pressed !mc-shadow-button';
    }

    return classNames('!border-none', {
      'mc-background-color-hover': isHovered.value,
    });
  };

  const getBackgroundBasedOnState = (): string => {
    if (pressed.value) {
      return getPressedBackground();
    }

    if (isHovered.value) {
      return getHoveredBackground();
    }

    return getDefaultBackground();
  };

  const getPressedBackground = (): string => {
    const backgrounds: Record<string, string> = {
      neutral: 'mc-background-color-pressed !mc-shadow-button',
      success: 'mc-background-color-brand-pressed !mc-shadow-button',
      danger: 'mc-background-color-danger-pressed !mc-shadow-button',
    };

    return backgrounds[tone.value] || '';
  };

  const getHoveredBackground = (): string => {
    const backgrounds: Record<string, string> = {
      neutral: 'mc-background-color-hover',
      success: 'mc-background-color-success-pressed',
      danger: 'mc-background-color-danger-hover',
    };

    return backgrounds[tone.value] || '';
  };

  const getDefaultBackground = (): string => {
    const backgrounds: Record<string, string> = {
      neutral: 'mc-background-color-base',
      success: 'mc-background-color-brand-base',
      danger: 'mc-background-color-danger-base',
    };

    return backgrounds[tone.value] || '';
  };
  // #endregion - Background Css Class

  const buttonBorderCssClass: ComputedRef<string> = computed(() => {
    return classNames('mc-border mc-border-solid', {
      'mc-border-transparent': variant.value === 'primary' || variant.value === 'tertiary',
      'mc-border-white-50': (focused.value && variant.value === 'primary') || variant.value === 'tertiary',
      'mc-border-color-base': variant.value === 'secondary' && tone.value === 'neutral',
      'mc-border-color-brand-base': variant.value === 'secondary' && tone.value === 'success',
      'mc-border-color-danger-base': variant.value === 'secondary' && tone.value === 'danger',
    });
  });

  const buttonProps: ComputedRef<Record<string, unknown>> = computed(() => {
    return {
      ...(disabled.value && { ariaDisabled: true }),
      disabled: disabled.value,
      autofocus: state.value === 'focus',
      type: type.value,
    };
  });

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
