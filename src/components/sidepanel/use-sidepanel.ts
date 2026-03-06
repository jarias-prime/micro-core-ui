import { ref, toRefs, computed, ComputedRef, watch, onMounted, onUnmounted } from 'vue';

import classNames from 'classnames';

import type { SetupContext } from 'vue';
import type { SidepanelPropTypes, SidepanelEmitTypes } from './sidepanel';

interface SidepanelClasses {
  sidepanelBaseClasses: string;
  sidepanelHeaderClasses: string;
  sidepanelHeaderTitleClasses: string;
  sidepanelHeaderIconClasses: string;
  sidepanelContentClasses: string;
  sidepanelFooterClasses: string;
  sidepanelTransitionActiveClasses: string;
  sidepanelTransitionHiddenClasses: string;
  sidepanelTransitionVisibleClasses: string;
  backdropBaseClasses: string;
  sidepanelHeaderSubtitleClasses: string;
}

export const useSidepanel = (props: SidepanelPropTypes, emit: SetupContext<SidepanelEmitTypes>['emit']) => {
  const { size, position, isStacking, footerNoPadding, isExpanded, isActivePanel, footerNoTopBorder } = toRefs(props);

  const sidepanelClasses: ComputedRef<SidepanelClasses> = computed(() => {
    const sidepanelBaseClasses = classNames(
      'mc-right-4 mc-top-1/2 mc-z-[1015] mc-flex mc-h-full mc-min-h-[200px] mc-translate-y-[-50%] mc-flex-col mc-rounded-border-radius-xl mc-bg-white-50 mc-drop-shadow mc-transition-all mc-ease-[ease-in-out] mc-duration-[150ms]',
      {
        'mc-fixed': !isStacking.value,
        'mc-w-[360px]': size.value === 'sm' && !isExpanded.value,
        'mc-w-[420px]': size.value === 'md' && !isExpanded.value,
        'mc-w-[480px]': size.value === 'lg' && !isExpanded.value,
        '[@media(max-width:360px)]:mc-w-[calc(100vw-35px)]':
          size.value === 'sm' && !isExpanded.value && !isStacking.value,
        '[@media(max-width:420px)]:mc-w-[calc(100vw-35px)]':
          size.value === 'md' && !isExpanded.value && !isStacking.value,
        '[@media(max-width:480px)]:mc-w-[calc(100vw-35px)]':
          size.value === 'lg' && !isExpanded.value && !isStacking.value,
        'mc-w-[calc(100vw-50px)]': isExpanded.value,
        'mc-pointer-events-none': !isActivePanel.value && isStacking.value,
      },
    );

    const sidepanelHeaderClasses = classNames(
      'mc-tw-min-h-12 mc-text-color-strong mc-flex mc-justify-between mc-border-0 mc-border-b mc-border-solid mc-border-mushroom-200 mc-p-4',
    );

    const sidepanelHeaderTitleClasses = classNames('mc-subheading-xs');

    const sidepanelHeaderSubtitleClasses = classNames('mc-text-200 mc-max-w-[95%]');

    const sidepanelHeaderIconClasses = classNames('mc-text-color-weak mc-h-5 mc-w-5 mc-cursor-pointer');

    const sidepanelContentClasses = classNames('mc-h-full mc-overflow-y-auto');

    const sidepanelFooterClasses = classNames(
      'mc-bottom-0 mc-left-0 mc-w-full mc-rounded-b-border-radius-xl mc-border-0 mc-border-solid mc-border-mushroom-200 mc-bg-white-50 ',
      {
        'mc-py-3': !footerNoPadding.value,
        'mc-border-t': !footerNoTopBorder.value,
      },
    );

    const sidepanelTransitionActiveClasses = classNames({
      'mc-transition-all mc-duration-[150ms] mc-ease-[ease-in-out]': !isStacking.value,
    });

    const sidepanelTransitionHiddenClasses = classNames('mc-opacity-0', {
      'mc-translate-x-full -mc-translate-y-2/4': !isStacking.value && position.value === 'right',
    });

    const sidepanelTransitionVisibleClasses = classNames({
      'mc-translate-x-0 -mc-translate-y-2/4': !isStacking.value && position.value === 'right',
    });
    const backdropBaseClasses = classNames(
      'mc-fixed mc-left-0 mc-top-0 mc-z-[1010] mc-h-full mc-w-full mc-bg-mushroom-700/60',
    );

    return {
      sidepanelBaseClasses,
      sidepanelHeaderClasses,
      sidepanelHeaderTitleClasses,
      sidepanelHeaderIconClasses,
      sidepanelContentClasses,
      sidepanelFooterClasses,
      sidepanelTransitionActiveClasses,
      sidepanelTransitionHiddenClasses,
      sidepanelTransitionVisibleClasses,
      backdropBaseClasses,
      sidepanelHeaderSubtitleClasses,
    };
  });

  const sidepanelRef = ref<HTMLDivElement | null>(null);

  const handleClose = () => {
    emit('close');
  };

  const handlePanelExpansion = () => {
    if (isExpanded.value) {
      emit('shrink');
    } else {
      emit('expand');
    }
  };

  let ignoreClick = false;

  const handleClickOutside = (event: MouseEvent) => {
    if (ignoreClick || isStacking.value) return;
    if (sidepanelRef.value && !sidepanelRef.value.contains(event.target as Node) && props.closeOutside) {
      emit('close');
    }
  };

  const handleEscapeClose = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && props.isOpen && props.escapeClose) {
      emit('close');
    }
  };

  watch(
    () => props.isOpen,
    (value) => {
      if (value) {
        ignoreClick = true;
        setTimeout(() => {
          ignoreClick = false;
        });
      } else {
        emit('onClose');
      }
    },
  );

  onMounted(() => {
    document.addEventListener('click', handleClickOutside);
    window.addEventListener('keydown', handleEscapeClose);
  });

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
    window.removeEventListener('keydown', handleEscapeClose);
  });

  return {
    sidepanelClasses,
    sidepanelRef,
    isExpanded,
    handleClose,
    handlePanelExpansion,
  };
};
