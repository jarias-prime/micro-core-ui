import { toRefs, computed, ComputedRef } from 'vue';

import classNames from 'classnames';

import type { EmptyStatePropTypes } from './empty-state';

interface EmptyStateClasses {
  baseClasses: string;
  imageSizeClasses: string;
}

export const useEmptyState = (props: EmptyStatePropTypes) => {
  const { size, image, emptyStateCustomClasses } = toRefs(props);

  const containerClasses = computed(() => {
    return emptyStateClasses.value.baseClasses + ' ' + emptyStateCustomClasses.value;
  });

  const emptyStateClasses: ComputedRef<EmptyStateClasses> = computed(() => {
    const baseClasses = classNames(
      'mc-background-color mc-flex mc-h-full mc-w-full mc-flex-col mc-items-center mc-justify-center mc-gap-size-spacing-2xs mc-text-center',
      {
        'mc-px-size-spacing-sm mc-py-size-spacing-md mc-min-h-[240px]': size.value === 'small',
        'mc-px-size-spacing-sm mc-py-size-spacing-2xl mc-min-h-[360px]': size.value === 'large',
      },
    );

    const imageSizeClasses = classNames({
      'mc-h-[200px] mc-w-[200px]': size.value === 'large',
      'mc-h-[120px] mc-w-[120px]': size.value === 'small',
    });

    return {
      baseClasses,
      imageSizeClasses,
    };
  });

  const getImageUrl = computed(() => {
    return image.value ? new URL(`../../assets/images/empty-states/${image.value}.svg`, import.meta.url).href : '';
  });

  return {
    emptyStateClasses,
    getImageUrl,
    containerClasses,
  };
};
