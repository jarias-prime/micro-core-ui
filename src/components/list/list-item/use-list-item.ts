import { computed, toRefs } from 'vue';

import type { ComputedRef } from 'vue';
import type { ListItemPropTypes } from './list-item';

export function useListItem(
  props: ListItemPropTypes,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _emit?: unknown,
): {
  listItem: ComputedRef<ListItemPropTypes['item']>;
  hasIcon: ComputedRef<boolean>;
  iconName: ComputedRef<string>;
  iconClasses: ComputedRef<string>;
  hasSublevels: ComputedRef<boolean>;
  showLozengeMode: ComputedRef<boolean>;
  hasAvatar: ComputedRef<boolean>;
} {
  const { item, itemIcon, itemIconTone, itemIconFill, lozenge, avatarVariant } = toRefs(props);

  const listItem = computed(() => item?.value);

  const hasIcon = computed(() => !!(itemIcon.value || item?.value!.icon));

  const hasAvatar = computed(() => !!(avatarVariant.value && !hasIcon.value));

  const iconName = computed(() => itemIcon.value || item?.value!.icon || '');

  const iconClasses = computed(() => {
    // If item has a specific iconColor, use that
    if (item?.value?.iconColor) {
      return item.value.iconColor;
    }

    const tone = itemIconTone?.value || 'plain';
    const fill = itemIconFill?.value || false;

    const toneClasses: Record<string, string> = {
      plain: 'mc-text-color-base',
      pending: fill
        ? 'mc-bg-yellow-100 mc-text-yellow-700 mc-rounded-md mc-p-1.5'
        : 'mc-text-yellow-600 mc-rounded-md mc-p-1.5',
      information: fill
        ? 'mc-bg-blue-100 mc-text-blue-700 mc-rounded-md mc-p-1.5'
        : 'mc-text-blue-600 mc-rounded-md mc-p-1.5',
      success: fill
        ? 'mc-bg-green-100 mc-text-green-700 mc-rounded-md mc-p-1.5'
        : 'mc-text-green-600 mc-rounded-md mc-p-1.5',
      danger: fill ? 'mc-bg-red-100 mc-text-red-700 mc-rounded-md mc-p-1.5' : 'mc-text-red-600 mc-rounded-md mc-p-1.5',
      neutral: fill
        ? 'mc-bg-gray-100 mc-text-gray-700 mc-rounded-md mc-p-1.5'
        : 'mc-text-gray-600 mc-rounded-md mc-p-1.5',
      caution: fill
        ? 'mc-bg-orange-100 mc-text-orange-700 mc-rounded-md mc-p-1.5'
        : 'mc-text-orange-600 mc-rounded-md mc-p-1.5',
    };

    return toneClasses[tone] || toneClasses['plain'];
  });

  const hasSublevels = computed(() => !!(item?.value!.sublevel && item?.value!.sublevel.length > 0));

  const showLozengeMode = computed(() => lozenge.value && !!item?.value!.lozengeProps);

  return {
    listItem,
    hasIcon,
    hasAvatar,
    iconName,
    iconClasses,
    hasSublevels,
    showLozengeMode,
  };
}
