import { computed, type Ref } from 'vue';
import type { BannerPropTypes } from './banner';
import classNames from 'classnames';

interface BannerClasses {
  base: string;
  icon: string;
  message: string;
  close: string;
}

export const useBanner = (props: BannerPropTypes, showModel: Ref<boolean>) => {
  const closeBanner = () => (showModel.value = false);

  const bannerClasses = computed<BannerClasses>(() => {
    const base = classNames('mc-w-full mc-flex mc-p-size-spacing-3xs mc-justify-between mc-rounded-border-radius-md', {
      'mc-background-color-success-weak': props.type === 'success',
      'mc-background-color-danger-weak': props.type === 'error',
      'mc-background-color-information-weak': props.type === 'info',
      'mc-background-color-pending-weak': props.type === 'pending',
      'mc-background-color-caution-weak': props.type === 'caution',
    });

    const icon = classNames('mc-py-[2px]', {
      'mc-text-color-brand-base': props.type === 'success',
      'mc-text-color-danger-base': props.type === 'error',
      'mc-text-color-information-base': props.type === 'info',
      'mc-text-color-pending-base': props.type === 'pending',
      'mc-text-color-caution-base': props.type === 'caution',
    });

    const message = classNames('mc-block mc-m-0 mc-body-sm-regular', {
      'mc-text-color-brand-base': props.type === 'success',
      'mc-text-color-danger-pressed': props.type === 'error',
      'mc-text-color-information-pressed': props.type === 'info',
      'mc-text-color-pending-pressed': props.type === 'pending',
      'mc-text-color-caution-pressed': props.type === 'caution',
    });

    const close = classNames('mc-flex-none mc-cursor-pointer mc-mt-[2px]', {
      'mc-text-color-brand-base': props.type === 'success',
      'mc-text-color-danger-base': props.type === 'error',
      'mc-text-color-information-base': props.type === 'info',
      'mc-text-color-pending-base': props.type === 'pending',
      'mc-text-color-caution-base': props.type === 'caution',
    });

    return {
      base,
      icon,
      message,
      close,
    };
  });

  const bannerIcon = computed(() => {
    switch (props.type) {
      case 'success':
        return 'ph:check-circle-fill';
      case 'error':
        return 'ph:warning-circle-fill';
      case 'info':
        return 'ph:info-fill';
      case 'pending':
        return 'ph:info-fill';
      case 'caution':
        return 'ph:warning-fill';
      default:
        return '';
    }
  });

  return {
    closeBanner,
    bannerClasses,
    bannerIcon,
  };
};
