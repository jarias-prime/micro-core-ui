import type { StepPropTypes } from '@/components/stepper/step/step';
import type { StepperPropTypes } from '@/components/stepper/stepper';
import classNames from 'classnames';
import { computed, ComputedRef } from 'vue';

interface StepperClasses {
  baseClass: string;
  stepClass: string;
  lineContainerClass: string;
  linesClass: string;
}

export const useStepper = (props: StepperPropTypes) => {
  const stepperClasses: ComputedRef<StepperClasses> = computed(() => {
    const baseClass = classNames('mc-flex mc-gap-size-spacing-xs ', {
      'mc-flex-col mc-mb-size-spacing-xs': props.variant === 'vertical',
      'mc-flex-row mc-mr-size-spacing-xs': props.variant === 'horizontal',
    });

    const stepClass = classNames('mc-flex mc-flex-grow', {
      'mc-flex-col': props.variant === 'vertical',
      'mc-flex-rows': props.variant === 'horizontal',
    });

    const lineContainerClass = classNames('mc-flex mc-min-w-6 mc-min-h-6', {
      'mc-ml-3.5 mc-pt-size-spacing-2xs': props.variant === 'vertical',
      'mc-items-center mc-pl-size-spacing-xs mc-w-full': props.variant === 'horizontal',
    });

    const linesClass = classNames({
      'mc-w-0.5 mc-rounded-full mc-h-12': props.variant === 'vertical',
      'mc-h-0.5 mc-rounded-full mc-w-full': props.variant === 'horizontal',
    });

    return {
      baseClass,
      stepClass,
      lineContainerClass,
      linesClass,
    };
  });

  const getLineColorClass = (step: StepPropTypes) => {
    return step.status === 'completed' ? 'mc-bg-kangkong-700' : 'mc-bg-mushroom-200';
  };

  return {
    stepperClasses,
    getLineColorClass,
  };
};
