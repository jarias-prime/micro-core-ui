import { computed, toRefs, type SetupContext } from 'vue';
import { useVModel } from '@vueuse/core';

import classNames from 'classnames';

import type { ButtonDropdownEmitTypes, ButtonDropdownPropTypes } from './button-dropdown';

export const useButtonDropdown = (
  props: ButtonDropdownPropTypes,
  emits: SetupContext<ButtonDropdownEmitTypes>['emit'],
) => {
  const { tone, variant, disabled } = toRefs(props);

  const selectedMenu = useVModel(props, 'modelValue', emits);

  const buttonDropdownClasses = computed(() => {
    const mainButtonClasses = classNames('mc-rounded-r-none mc-border-r', {
      '!mc-border-solid mc-border-l-0 mc-border-t-0 mc-border-b-0': disabled.value && variant.value !== 'secondary',
      'mc-border-r-kangkong-800': tone.value === 'success' && !disabled.value,
      'mc-border-r-mushroom-200': tone.value !== 'success' || (tone.value === 'success' && disabled.value),
    });

    const dropdownButtonClasses = classNames('mc-rounded-l-none', {
      'mc-border-solid mc-border-l-0': variant.value === 'secondary',
      'mc-border-l-transparent': variant.value !== 'secondary',
    });

    return { mainButtonClasses, dropdownButtonClasses };
  });

  return {
    selectedMenu,
    buttonDropdownClasses,
  };
};
