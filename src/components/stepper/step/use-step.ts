import classNames from 'classnames';
import type { SetupContext } from 'vue';
import { computed, ComputedRef } from 'vue';
import type { StepEmitTypes, StepPropTypes } from './step';

interface StepClasses {
  baseClass: string;
  badgeClass: string;
  numberClass: string;
  textContainerClass: string;
  labelClass: string;
  descriptionClass: string;
}

export const useStep = (props: StepPropTypes, emit: SetupContext<StepEmitTypes>['emit']) => {
  const stepClasses: ComputedRef<StepClasses> = computed(() => {
    const baseClass = classNames('mc-flex mc-gap-2 mc-items-top', {
      'mc-p-size-spacing-3xs mc-rounded-border-radius-lg': props.type === 'solid',
      'mc-background-color-brand-weak': props.status === 'active' && props.type === 'solid',
      'mc-opacity-60': props.status === 'completed' && props.type === 'solid',
    });

    // Usage of prop.status ensures reactivity instead of destructuring props
    const badgeClass = classNames(
      'mc-flex mc-items-center mc-justify-center mc-rounded-border-radius-full mc-h-6 mc-w-6 mc-border mc-border-solid',
      {
        'mc-border-2': props.type !== 'solid',
        'mc-border-1': props.type === 'solid',
        'mc-background-color-brand-base mc-border-color-brand-base': props.status === 'active',
        'mc-border-mushroom-300': props.status === 'pending',
        'mc-border-kangkong-700': props.status === 'completed',
        'mc-background-color-brand-base': props.status === 'completed' && props.type === 'solid',
      },
    );

    const numberClass = classNames('mc-body-md-regular-medium', {
      'mc-text-white-50': props.status === 'active',
      'mc-text-mushroom-600': props.status === 'pending',
      'mc-text-kangkong-700': props.status === 'completed',
    });

    const textContainerClass = classNames('mc-flex mc-flex-col mc-mt-[2px]');

    const labelClass = classNames('mc-body-md-regular mc-whitespace-nowrap', {
      'mc-text-kangkong-700 !mc-body-md-regular-medium': props.status === 'active' && props.type === 'compact',
      'mc-text-mushroom-600': props.status === 'pending',
      'mc-text-mushroom-950': props.status === 'completed',
    });

    // Absolute since the sample in the figma is a hanging text for description
    const descriptionClass = classNames('mc-body-sm-regular mc-text-color-supporting mc-whitespace-nowrap');

    return {
      baseClass,
      badgeClass,
      numberClass,
      labelClass,
      textContainerClass,
      descriptionClass,
    };
  });

  const handleClick = (evt: MouseEvent) => {
    emit('click', evt);
  };

  return {
    stepClasses,
    handleClick,
  };
};
