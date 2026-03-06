import { ref, toRefs, computed, ComputedRef } from 'vue';

import classNames from 'classnames';

import type { SetupContext } from 'vue';
import type { ModalEmitTypes, ModalPropTypes } from './modal';

interface ModalClasses {
  backdropClasses: string;
  baseClasses: string;
  headerClasses: string;
  headerCloseButtonXClasses: string;
  contentClasses: string;
  footerClasses: string;
}

export const useModal = (props: ModalPropTypes, emit: SetupContext<ModalEmitTypes>['emit']) => {
  const { size, contentPadding, staticBackdrop } = toRefs(props);

  const modalClasses: ComputedRef<ModalClasses> = computed(() => {
    const backdropClasses = classNames(
      'mc-fixed mc-bottom-0 mc-left-0 mc-right-0 mc-top-0 mc-z-[1050] mc-h-full mc-w-full mc-bg-[#4C5857] mc-opacity-60',
    );

    const baseClasses = classNames(
      'mc-fixed mc-z-[1100] mc-left-1/2 mc-top-1/2 mc-transform -mc-translate-x-1/2 -mc-translate-y-1/2',
      'mc-background-color mc-rounded-xl',
      'mc-border mc-border-solid mc-border-color-weak',
      'mc-w-[calc(100%-2rem)] mc-max-w-[calc(100%-2rem)]',
      {
        'sm:mc-w-[360px] sm:mc-max-w-[480px]': size.value === 'sm',
        'sm:mc-w-[480px] sm:mc-max-w-[720px]': size.value === 'md',
        'md:mc-w-[720px] md:mc-max-w-[960px]': size.value === 'lg',
        'lg:mc-w-[900px] lg:mc-max-w-[1200px]': size.value === 'xl',
        'xl:mc-w-[1200px] xl:mc-max-w-[1400px]': size.value === 'xxl',
      },
      { 'bounce-animation': staticBackdropClicked.value },
    );

    const headerClasses = classNames(
      'mc-flex mc-items-start mc-justify-between mc-gap-2',
      'mc-text-color-strong mc-subheading-xs',
      'mc-border-color-weak mc-border-x-0 mc-border-b mc-border-t-0 mc-border-solid',
      'mc-rounded-tl-xl mc-rounded-tr-xl',
      'mc-p-2 sm:mc-px-4 sm:mc-py-3',
    );

    const headerCloseButtonXClasses = classNames(
      'mc-text-color-weak mc-subheading-xs mc-mt-0.5 mc-cursor-pointer',
      'mc-transition mc-duration-150 mc-ease-in-out',
      'hover:mc-text-color-base',
      'active:mc-text-color-strong active:mc-scale-75',
    );

    const contentClasses = classNames(
      'mc-body-sm-regular mc-max-h-[calc(100vh-200px)] mc-overflow-y-auto mc-overflow-x-hidden',
      {
        'mc-p-2 sm:mc-p-4': contentPadding.value,
      },
    );

    const footerClasses = classNames(
      'mc-border-color-weak mc-border-x-0 mc-border-b-0 mc-border-t mc-border-solid',
      'mc-flex mc-w-full mc-items-center mc-px-size-spacing-xs mc-py-size-spacing-2xs',
      'mc-text-color-strong mc-subheading-xs',
    );

    return {
      backdropClasses,
      baseClasses,
      headerClasses,
      headerCloseButtonXClasses,
      contentClasses,
      footerClasses,
    };
  });

  const staticBackdropClicked = ref(false);

  const handleCloseModal = () => {
    emit('update:modelValue', false);
  };

  const handleBackdropClick = () => {
    if (!staticBackdrop.value) {
      handleCloseModal();
    } else {
      staticBackdropClicked.value = true;

      setTimeout(() => {
        staticBackdropClicked.value = false;
      }, 500);
    }
  };

  return {
    modalClasses,
    staticBackdropClicked,
    handleCloseModal,
    handleBackdropClick,
  };
};
