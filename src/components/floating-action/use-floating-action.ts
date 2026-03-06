import { toRef, computed } from 'vue';
import type { FloatingActionProps } from './floating-action';

export function useFloatingAction(props: FloatingActionProps) {
  const isVisible = toRef(props, 'show');

  const floatingActionClasses = computed(() => {
    const wrapperClass =
      'mc-bg-white-50 mc-body-md-regular mc-text-color-strong mc-bg-white mc-fixed mc-bottom-8 mc-left-1/2 mc-z-50 mc-flex mc-w-full mc-max-w-[1024px] mc--translate-x-1/2 mc-items-center mc-gap-4 mc-rounded-border-radius-md  mc-drop-shadow-md';

    return {
      wrapperClass,
    };
  });

  return { isVisible, floatingActionClasses };
}
