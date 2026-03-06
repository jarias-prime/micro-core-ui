import { toRefs, computed, ComputedRef } from 'vue';

import classNames from 'classnames';

import { ChipsEmitTypes } from './chips';

import type { SetupContext } from 'vue';
import type { ChipsPropTypes } from './chips';

export const useChips = (
  props: ChipsPropTypes,
  emit: SetupContext<ChipsEmitTypes>['emit'],
  slots: Record<string, unknown>,
) => {
  const { disabled, active, variant, iconWeight, icon, size, tone } = toRefs(props);

  const chipsBaseClasses: ComputedRef<string> = computed(() => {
    if (variant.value === 'day') {
      return classNames(
        'mc-background-color mc-label-xs-medium mc-inline-flex mc-items-center mc-justify-center mc-rounded-full mc-transition-all mc-aspect-square mc-h-10 mc-w-10 mc-body-sm-regular mc-border mc-border-solid',
        {
          // Base cursor state
          'hover:mc-cursor-pointer': !disabled.value,

          // Disabled state (highest priority)
          'mc-cursor-not-allowed mc-text-color-on-fill-disabled mc-background-color-disabled mc-border-color-disabled':
            disabled.value,

          // Active and enabled state
          'mc-text-color-strong mc-background-color-brand-base mc-text-color-inverted-strong mc-border-color-brand-base':
            active.value && !disabled.value,

          // Default state (with hover/pressed)
          'mc-text-color-strong mc-border-color-weak hover:mc-background-color-hover active:mc-background-color-pressed':
            !active.value && !disabled.value,
        },
      );
    }

    return classNames(
      'mc-body-xs-regular mc-text-color-strong mc-inline-flex mc-items-center mc-justify-center mc-gap-1 mc-rounded-full mc-transition-all mc-group',
      {
        // Base cursor state
        'hover:mc-cursor-pointer': !disabled.value,

        // Padding for sizes
        'mc-py-1.5 mc-px-2': size.value === 'md',
        'mc-py-0.5 mc-px-1.5': size.value === 'sm',

        // Disabled state (highest priority)
        'mc-cursor-not-allowed mc-text-color-on-fill-disabled mc-background-color-disabled mc-border-solid mc-border-[1px] mc-border-color-disabled':
          disabled.value,

        // Active and enabled state
        'mc-background-color-brand-weak mc-border-solid mc-border-[1px] mc-border-color-brand-base':
          active.value && !disabled.value,

        // Default state (with hover/pressed)
        'mc-border mc-border-solid mc-border-color-weak group-hover:mc-background-color-hover group-active:mc-background-color-pressed':
          !active.value && !disabled.value,

        // Default state bg color
        'mc-background-color-surface': !active.value && !disabled.value && tone.value === 'default',
        'mc-background-color': !active.value && !disabled.value && tone.value === 'subtle',

        // Reset close button styles
        '[&_.chips-close]:hover:mc-cursor-pointer [&_.chips-close]:mc-p-0 [&_.chips-close]:mc-m-0 [&_.chips-close]:mc-border-0 [&_.chips-close]:mc-bg-transparent [&_.chips-close]:mc-inline-flex [&_.chips-close]:mc-items-center [&_.chips-close]:mc-leading-[0]': true,
      },
    );
  });

  const handleClick = () => {
    if (!disabled.value) {
      emit('update', !active.value);
    }
  };

  const handleClose = (event: MouseEvent | KeyboardEvent) => {
    if (!disabled.value) {
      emit('close', event);
    }
  };

  const getIcon = computed(() => {
    return iconWeight.value === 'regular' ? icon.value : `${icon.value}-${iconWeight.value}`;
  });

  const hasAvatar = computed(() => {
    return props.avatarUrl || props.avatarVariant || props.avatarInitials;
  });

  const hasIcon = computed(() => {
    return props.icon || slots.icon;
  });

  return {
    chipsBaseClasses,
    handleClose,
    handleClick,
    getIcon,
    hasAvatar,
    hasIcon,
  };
};
