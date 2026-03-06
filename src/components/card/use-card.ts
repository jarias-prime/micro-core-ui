import { toRefs, computed, ComputedRef, Slots } from 'vue';
import classNames from 'classnames';

import type { CardPropTypes } from './card';

interface CardClasses {
  baseClasses: string;
  headerClasses: string;
  contentPaddingSizeClasses: string;
  footerClasses: string;
  hasFlexBox: string;
}

export const useCard = (props: CardPropTypes, slots: Slots) => {
  const {
    tone,
    title,
    headerIcon,
    borderRadiusSize,
    hasCollapsible,
    isCollapsibleOpen,
    hasContentPadding,
    flexbox,
    customBorderSize,
  } = toRefs(props);

  const cardClasses: ComputedRef<CardClasses> = computed(() => {
    const toneValue = tone?.value;

    const baseClasses = classNames(`mc-border-solid`, {
      // Tones
      'mc-background-color-base': !toneValue,
      'mc-background-color': toneValue === 'plain',
      'mc-background-color-surface': toneValue === 'neutral',
      'mc-background-color-success-weak': toneValue === 'success',
      'mc-background-color-information-weak': toneValue === 'information',
      'mc-background-color-pending-weak': toneValue === 'pending',
      'mc-background-color-caution-weak': toneValue === 'caution',
      'mc-background-color-accent-weak': toneValue === 'accent',
      'mc-background-color-danger-weak': toneValue === 'danger',

      // Borders
      'mc-border-color-weak': !toneValue || toneValue === 'plain',
      'mc-border-color-base': toneValue === 'neutral',
      'mc-border-color-success-base': toneValue === 'success',
      'mc-border-color-information-base': toneValue === 'information',
      'mc-border-color-pending-base': toneValue === 'pending',
      'mc-border-color-caution-base': toneValue === 'caution',
      'mc-border-color-accent-base': toneValue === 'accent',
      'mc-border-color-danger-base': toneValue === 'danger',

      // Border radius
      'mc-rounded-border-radius-2xs': borderRadiusSize.value === '2xs',
      'mc-rounded-border-radius-xs': borderRadiusSize.value === 'xs',
      'mc-rounded-border-radius-sm': borderRadiusSize.value === 'sm',
      'mc-rounded-border-radius-md': borderRadiusSize.value === 'md',
      'mc-rounded-border-radius-lg': borderRadiusSize.value === 'lg',
      'mc-rounded-border-radius-xl': borderRadiusSize.value === 'xl' || !borderRadiusSize.value,

      [`mc-border-[${customBorderSize.value}px]`]: customBorderSize.value,
      'mc-border-none': customBorderSize.value === '0',
    });

    const headerClasses = classNames(`mc-flex mc-items-center transition-all duration-300 ease-in-out`, {
      'mc-min-h-[18px]': slots.header,
      'mc-border-0 mc-border-b mc-border-solid mc-border-mushroom-200':
        (title.value || headerIcon.value) && (slots.content || slots.default),
      'mc-border-transparent': hasCollapsible.value && !isCollapsibleOpen.value,
      'mc-py-size-spacing-2xs mc-px-size-spacing-xs': title.value || headerIcon.value,
      'mc-rounded-t-border-radius-2xs': borderRadiusSize.value === '2xs',
      'mc-rounded-t-border-radius-xs': borderRadiusSize.value === 'xs',
      'mc-rounded-t-border-radius-sm': borderRadiusSize.value === 'sm',
      'mc-rounded-t-border-radius-md': borderRadiusSize.value === 'md',
      'mc-rounded-t-border-radius-lg': borderRadiusSize.value === 'lg',
      'mc-rounded-t-border-radius-xl': borderRadiusSize.value === 'xl' || !borderRadiusSize.value,
    });

    const contentPaddingSizeClasses = classNames({
      'mc-py-size-spacing-2xs mc-px-size-spacing-xs': hasContentPadding.value,
    });

    const footerClasses = classNames(
      `mc-flex mc-items-center mc-border-0 mc-border-t mc-border-solid mc-border-mushroom-200 mc-py-size-spacing-2xs mc-px-size-spacing-xs`,
      {
        'mc-rounded-b-border-radius-2xs': borderRadiusSize.value === '2xs',
        'mc-rounded-b-border-radius-xs': borderRadiusSize.value === 'xs',
        'mc-rounded-b-border-radius-sm': borderRadiusSize.value === 'sm',
        'mc-rounded-b-border-radius-md': borderRadiusSize.value === 'md',
        'mc-rounded-b-border-radius-lg': borderRadiusSize.value === 'lg',
        'mc-rounded-b-border-radius-xl': borderRadiusSize.value === 'xl' || !borderRadiusSize.value,
      },
    );

    const hasFlexBox = classNames({
      'mc-flex mc-flex-col mc-h-full': flexbox.value,
    });

    return {
      baseClasses,
      headerClasses,
      contentPaddingSizeClasses,
      footerClasses,
      hasFlexBox,
    };
  });

  return {
    cardClasses,
  };
};
