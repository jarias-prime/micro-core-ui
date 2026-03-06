import { toRefs, computed, ComputedRef, useSlots } from 'vue';
import classNames from 'classnames';
import type { LozengePropTypes } from './lozenge';

interface LozengeClasses {
  wrapperClasses: string;
  baseClasses: string;
  toneClasses: string;
  labelClasses: string;
}

export const useLozenge = (props: LozengePropTypes) => {
  const { tone, fill, loading, interactive, url, dropdown } = toRefs(props);
  const slots = useSlots();
  const isInteractive = computed(() => interactive.value || dropdown.value);

  const lozengeClasses: ComputedRef<LozengeClasses> = computed(() => {
    const wrapperClasses = classNames({
      'mc-h-fit mc-w-fit': !loading.value,
      'mc-flex mc-w-full': loading.value,
    });
    const baseClasses = classNames({
      'mc-flex mc-flex-wrap mc-rounded-md': !fill.value,
      'mc-flex mc-flex-wrap': fill.value,
      'mc-skeletal-loader mc-flex mc-h-6 mc-w-full mc-rounded-md': loading.value,
    });

    const toneClasses = classNames(
      'mc-box-border mc-h-[20px] mc-inline-flex mc-items-center mc-gap-size-spacing-6xs mc-rounded-md mc-border-solid mc-p-size-spacing-5xs mc-text-xs mc-uppercase',
      {
        'mc-h-[20px]': !url.value,
        'mc-h-[24px]': url.value || slots.avatar,
        'mc-border': !fill.value,
        'mc-cursor-pointer': isInteractive.value,
        // #region - Styles for hollow lozenge

        // Pending
        'mc-text-color-pending-base mc-background-color-pending-weak mc-border-color-pending-base':
          tone.value === 'pending' && !fill.value,
        'hover:mc-background-color-pending-weak-hover active:mc-background-color-pending-weak-pressed':
          tone.value === 'pending' && !fill.value && isInteractive.value,

        // Information
        'mc-text-color-information-base mc-background-color-information-weak mc-border-color-information-base':
          tone.value === 'information' && !fill.value,
        'hover:mc-background-color-information-weak-hover active:mc-background-color-information-weak-pressed':
          tone.value === 'information' && !fill.value && isInteractive.value,

        // Success
        'mc-text-color-success-base mc-background-color-success-weak mc-border-color-success-base':
          tone.value === 'success' && !fill.value,
        'hover:mc-background-color-success-weak-hover active:mc-background-color-success-weak-pressed':
          tone.value === 'success' && !fill.value && isInteractive.value,

        // Neutral
        'mc-text-color-base mc-background-color-surface-adaptive mc-border-color-base':
          tone.value === 'neutral' && !fill.value,

        // Danger
        'mc-text-color-danger-base mc-background-color-danger-weak mc-border-color-danger-base':
          tone.value === 'danger' && !fill.value,
        'hover:mc-background-color-danger-weak-hover active:mc-background-color-danger-weak-pressed':
          tone.value === 'danger' && !fill.value && isInteractive.value,

        // Caution
        'mc-text-color-caution-base mc-background-color-caution-weak mc-border-color-caution-base':
          tone.value === 'caution' && !fill.value,
        'hover:mc-background-color-caution-weak-hover active:mc-background-color-caution-weak-pressed':
          tone.value === 'caution' && !fill.value && isInteractive.value,

        // Plain
        'mc-text-color-strong mc-border-color-base mc-background-color': tone.value === 'plain' && !fill.value,

        // Shared hover/active for neutral and plain
        'hover:mc-background-color-hover active:mc-background-color-pressed':
          (tone.value === 'neutral' || tone.value === 'plain') && !fill.value && isInteractive.value,

        // #endregion - Styles for hollow (!fill) lozenge

        // #region - Styles for filled lozenge
        'mc-border-0': fill.value,
        'mc-text-color-strong':
          fill.value &&
          (tone.value === 'pending' || tone.value === 'neutral' || tone.value === 'caution' || tone.value === 'plain'),
        'mc-text-color-inverted-strong':
          fill.value && (tone.value === 'information' || tone.value === 'success' || tone.value === 'danger'),
        // Pending
        'mc-background-color-pending-base': tone.value === 'pending' && fill.value,
        'hover:mc-background-color-pending-hover active:mc-background-color-pending-pressed':
          tone.value === 'pending' && fill.value && isInteractive.value,
        // Information
        'mc-background-color-information-base': tone.value === 'information' && fill.value,
        'hover:mc-background-color-information-hover active:mc-background-color-information-pressed':
          tone.value === 'information' && fill.value && isInteractive.value,
        // Success
        'mc-background-color-success-base': tone.value === 'success' && fill.value,
        'hover:mc-background-color-success-hover active:mc-background-color-success-pressed':
          tone.value === 'success' && fill.value && isInteractive.value,
        // Neutral
        'mc-background-color-surface-adaptive': tone.value === 'neutral' && fill.value,
        // Danger
        'mc-background-color-danger-base': tone.value === 'danger' && fill.value,
        'hover:mc-background-color-danger-hover active:mc-background-color-danger-pressed':
          tone.value === 'danger' && fill.value && isInteractive.value,
        // Caution
        'mc-background-color-caution-base': tone.value === 'caution' && fill.value,
        'hover:mc-background-color-caution-hover active:mc-background-color-caution-pressed':
          tone.value === 'caution' && fill.value && isInteractive.value,

        // Plain
        'mc-background-color': tone.value === 'plain' && fill.value,

        // Shared hover/active for neutral and plain (filled)
        'hover:mc-background-color-surface active:mc-background-color-pressed':
          (tone.value === 'neutral' || tone.value === 'plain') && fill.value && isInteractive.value,
        // #endregion - Styles for filled lozenge
      },
    );

    const labelClasses = classNames(
      'mc-lozenge__label mc-label-xs-medium mc-flex-1 mc-min-w-0 mc-whitespace-nowrap mc-text-ellipsis mc-overflow-hidden',
    );

    return {
      wrapperClasses,
      baseClasses,
      toneClasses,
      labelClasses,
    };
  });

  return {
    lozengeClasses,
  };
};
