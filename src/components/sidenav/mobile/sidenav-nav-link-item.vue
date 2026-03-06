<template>
  <div
    v-if="!sideNavLinks.hidden"
    :id="props.id"
    :class="[
      'mc-flex mc-w-full mc-cursor-pointer mc-items-center mc-gap-3 !mc-p-size-spacing-3xs',
      'mc-select-none mc-rounded-border-radius-md',
      '-webkit-tap-highlight-color-transparent',
      'mc-transition-all mc-duration-500 mc-ease-in-out',
      {
        'mc-background-color-single-active mc-border-color-brand-base mc-border-[1.5px] mc-border-solid': isActiveNav,
      },
    ]"
    style="-webkit-tap-highlight-color: transparent; -webkit-touch-callout: none; -webkit-user-select: none"
    @click="handleOnLinkClick"
  >
    <!-- Icon -->
    <div v-if="parentLink" id="sidenav_item_icon" class="mc-flex mc-h-6 mc-w-6 mc-items-center mc-justify-center">
      <template v-if="parentLink.icon && parentLink.icon.includes('https://')">
        <img :src="parentLink.icon" :alt="`${sideNavLinks.title} icon`" class="mc-h-6 mc-w-6 mc-object-cover" />
      </template>
      <template v-else>
        <Icon
          v-if="parentLink.icon"
          :icon="props.activeNav.parentNav === sideNavLinks.title ? `${parentLink.icon}-fill` : parentLink.icon"
          :class="[
            'mc-h-6 mc-w-6 mc-transition-all mc-duration-500 mc-ease-in-out',
            { 'mc-text-color-brand-base': isActiveNav },
          ]"
        />
        <Icon
          v-else
          :icon="props.activeNav.parentNav === sideNavLinks.title ? 'ph:globe-fill' : 'ph:globe'"
          class="mc-h-6 mc-w-6"
        />
      </template>
    </div>

    <!-- Title and Badge -->
    <div class="mc-flex mc-flex-1 mc-items-center mc-justify-between">
      <span class="mc-body-sm-regular mc-text-color-strong">
        {{ sideNavLinks.title }}
      </span>

      <!-- Badge if attributes exist -->
      <div class="mc-flex mc-items-center mc-gap-2">
        <template v-if="props.convertedNavAttributes.length > 0">
          <mc-lozenge
            v-for="(attribute, attributeIndex) in props.convertedNavAttributes"
            :key="attributeIndex"
            :label="attribute.lozengeLabel"
            :tone="attribute.lozengeTone"
            size="small"
          />
        </template>

        <!-- Arrow if has children -->
        <Icon
          v-if="hasChildrenLinks"
          icon="ph:caret-right"
          class="mc-text-color-supporting"
          width="16px"
          height="16px"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, type PropType } from 'vue';
import {
  type MenuLinkItem,
  type ParentLinkItem,
  type SubmenuLinkItem,
  type ActiveNav,
  type ConvertedNavAttribute,
} from '@/components/sidenav/sidenav';
import McLozenge from '@/components/lozenge/lozenge.vue';
import { Icon } from '@iconify/vue';

const props = defineProps({
  linkType: {
    type: String as PropType<'parent' | 'menu' | 'submenu'>,
    required: true,
  },
  linkItem: {
    type: Object as PropType<MenuLinkItem | ParentLinkItem | SubmenuLinkItem>,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  activeNav: {
    type: Object as PropType<ActiveNav>,
    required: true,
  },
  convertedNavAttributes: {
    type: Array as PropType<ConvertedNavAttribute[]>,
    default: () => [],
  },
});

const emit = defineEmits(['on-select-link']);

const sideNavLinks = computed(() => {
  if (props.linkType === 'parent') {
    return props.linkItem as ParentLinkItem;
  } else if (props.linkType === 'menu') {
    return props.linkItem as MenuLinkItem;
  } else {
    return props.linkItem as SubmenuLinkItem;
  }
});

const hasChildrenLinks = computed(() => {
  if (props.linkType === 'parent') {
    return (
      (sideNavLinks.value as ParentLinkItem).menuLinks && (sideNavLinks.value as ParentLinkItem).menuLinks.length > 0
    );
  } else if (props.linkType === 'menu') {
    return (
      (sideNavLinks.value as MenuLinkItem).submenuLinks && (sideNavLinks.value as MenuLinkItem).submenuLinks.length > 0
    );
  } else {
    return false;
  }
});

const parentLink = computed(() => {
  if (props.linkType === 'parent') {
    return sideNavLinks.value as ParentLinkItem;
  }
  return null;
});

const isActiveNav = computed(() => {
  if (props.linkType === 'parent') {
    return props.activeNav.parentNav === sideNavLinks.value.title;
  } else if (props.linkType === 'menu') {
    return props.activeNav.menu === sideNavLinks.value.title;
  } else if (props.linkType === 'submenu') {
    return props.activeNav.submenu === sideNavLinks.value.title;
  }

  return false;
});

const handleOnLinkClick = () => {
  emit('on-select-link');
};
</script>
