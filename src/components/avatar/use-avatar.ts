import { toRefs, computed, ComputedRef, ref } from 'vue';

import classNames from 'classnames';

import type { SetupContext } from 'vue';
import type { AvatarPropTypes, AvatarEmitTypes } from './avatar';

interface AvatarClasses {
  baseClasses: string;
  imageContainerClasses: string;
  initialsContainerClasses: string;
  notificationClasses: string;
  onlineNotificationClasses: string;
}

export const useAvatar = (props: AvatarPropTypes, emit: SetupContext<AvatarEmitTypes>['emit']) => {
  const { size, color, variant, initial, loading } = toRefs(props);

  const avatarClasses: ComputedRef<AvatarClasses> = computed(() => {
    const baseClasses = classNames('mc-relative mc-inline-block mc-rounded-full', {
      'mc-background-color-surface': color.value === 'primary',
      'mc-background-color': color.value === 'secondary',
      'mc-background-color mc-border-color-success-base mc-border mc-border-solid': color.value === 'tertiary',
      'mc-skeletal-loader mc-h-full mc-w-full': loading.value,
    });

    const imageContainerClasses = classNames(
      'avatar__slot mc-border-color-weak mc-border mc-border-solid',
      'mc-rounded-full mc-object-cover mc-flex mc-items-center mc-justify-center mc-overflow-hidden',
      {
        'mc-h-20 mc-min-w-20 mc-text-[36px]': size.value === '2xl',
        'mc-h-14 mc-min-w-14 mc-font-size-600': size.value === 'xl',
        'mc-h-10 mc-min-w-10 mc-font-size-400': size.value === 'lg',
        'mc-h-9 mc-min-w-9 mc-font-size-300': size.value === 'md',
        'mc-h-6 mc-min-w-6 mc-font-size-200': size.value === 'sm',
        'mc-h-5 mc-min-w-5 mc-text-[10px]': size.value === 'xs',
        'mc-h-4 mc-min-w-4 mc-text-[10px]': size.value === '2xs',
      },

      // Image Size
      {
        '[&>img]:mc-h-20 [&>img]:mc-w-20 [&>img]:mc-min-h-20 [&>img]:mc-min-w-20': size.value === '2xl',
        '[&>img]:mc-h-14 [&>img]:mc-w-14 [&>img]:mc-min-h-14 [&>img]:mc-min-w-14': size.value === 'xl',
        '[&>img]:mc-h-10 [&>img]:mc-w-10 [&>img]:mc-min-h-10 [&>img]:mc-min-w-10': size.value === 'lg',
        '[&>img]:mc-h-9 [&>img]:mc-w-9 [&>img]:mc-min-h-9 [&>img]:mc-min-w-9': size.value === 'md',
        '[&>img]:mc-h-6 [&>img]:mc-w-6 [&>img]:mc-min-h-6 [&>img]:mc-min-w-6': size.value === 'sm',
        '[&>img]:mc-h-5 [&>img]:mc-w-5 [&>img]:mc-min-h-5 [&>img]:mc-min-w-5': size.value === 'xs',
        '[&>img]:mc-h-4 [&>img]:mc-w-4 [&>img]:mc-min-h-4 [&>img]:mc-min-w-4': size.value === '2xs',
      },
    );

    const initialsContainerClasses = classNames(
      'mc-rounded-full mc-border-color-weak mc-border mc-border-solid mc-items-center mc-flex mc-justify-center mc-heading-xs mc-text-color-strong',
      {
        'mc-h-20 mc-min-w-20': size.value === '2xl',
        'mc-h-14 mc-min-w-14 mc-body-lg-regular-medium': size.value === 'xl',
        'mc-h-10 mc-min-w-10 mc-body-sm-regular-medium': size.value === 'lg',
        'mc-h-9 mc-min-w-9 mc-body-sm-regular-medium': size.value === 'md',
        'mc-h-6 mc-min-w-6 mc-body-xs-regular-medium': size.value === 'sm',
        'mc-h-5 mc-min-w-5 !mc-text-[10px]': size.value === 'xs',
        'mc-h-4 mc-min-w-4 !mc-text-[10px]': size.value === '2xs',
      },
    );

    const notificationClasses = classNames('mc-absolute mc-right-0 mc-top-0', {
      'mc-right-[-5px] mc-top-[-6.3px]': size.value === 'xl',
      'mc-right-[-7px] mc-top-[-8px]': size.value === 'lg',
      'mc-right-[-5px] mc-top-[-6px]': size.value === 'md',
      'mc-right-[-7px] mc-top-[-7px]': size.value === 'sm',
      'mc-right-[-5px] mc-top-[-4px]': size.value === 'xs',
      'mc-right-[-4px] mc-top-[-4px]': size.value === '2xs',
    });

    const onlineNotificationClasses = classNames('mc-absolute mc-bottom-0 mc-right-0', {
      'mc-bottom-0 mc-right-0': size.value === 'xl' || size.value === 'lg' || size.value === 'md',
      'mc-bottom-[1px] mc-right-[1px]': size.value === 'xl',
      'mc-bottom-[-3px] mc-right-[-4px]': size.value === 'sm',
      'mc-bottom-[-4px] mc-right-[-3px]': size.value === 'xs',
      'mc-bottom-[-2px] mc-right-[-4px]': size.value === '2xs',
    });

    return {
      baseClasses,
      imageContainerClasses,
      initialsContainerClasses,
      notificationClasses,
      onlineNotificationClasses,
    };
  });

  const getAvatarSize = computed(() => {
    if (['2xl'].includes(size.value)) return { notif: 'big', badge: 'big' };
    if (['xl', 'lg'].includes(size.value)) return { notif: 'big', badge: 'tiny' };
    if (['md', 'sm'].includes(size.value)) return { notif: 'small', badge: 'tiny' };

    return { notif: 'tiny', badge: 'tiny' };
  });

  const getIconVariant = computed(() => {
    switch (variant.value) {
      case 'user-group':
        return 'ph:users-three';
      case 'user':
        return 'ph:user';
      case 'client':
        return 'ph:building';
      case 'admin':
        return 'ph:shield-check';
      case 'guest':
        return 'ph:user-circle';
      default:
        return `ph:${variant.value}`;
    }
  });

  const getInitials = computed(() => {
    const maxInitials = ['xs', '2xs'].includes(size.value) ? 1 : 2;

    if (typeof initial.value !== 'string' || initial.value.trim().length === 0) {
      return '';
    }

    const nameParts = initial.value.trim().split(/\s+/);

    if (nameParts.length === 1) {
      const firstInitial = nameParts[0].charAt(0).toUpperCase();
      return firstInitial;
    }

    const firstInitial = nameParts[0].charAt(0).toUpperCase();
    const lastInitial = nameParts[nameParts.length - 1].charAt(0).toUpperCase();

    return (firstInitial + lastInitial).slice(0, maxInitials);
  });

  const imageError = ref<boolean>(false);

  const handleImageError = () => {
    imageError.value = true;

    emit('image-error', true);
  };

  return {
    avatarClasses,
    getAvatarSize,
    getIconVariant,
    getInitials,
    imageError,
    handleImageError,
  };
};
