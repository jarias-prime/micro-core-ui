<template>
  <div class="mc-flex mc-h-fit mc-flex-row">
    <mc-button
      v-bind="props"
      :class="buttonDropdownClasses.mainButtonClasses"
      @click="(event) => emits('click', event)"
    >
      <slot />
    </mc-button>
    <mc-dropdown
      :id="props.dropdownId"
      v-model="selectedMenu"
      :menu-list="menuList"
      :width="props.width"
      :popper-width="props.popperWidth"
      :popper-inner-width="props.popperInnerWidth"
      :placement="props.placement"
      no-check-in-list
    >
      <mc-button
        v-bind="props"
        :fullwidth="false"
        :has-icon="true"
        :class="buttonDropdownClasses.dropdownButtonClasses"
      >
        <icon icon="ph:caret-down" />
      </mc-button>
    </mc-dropdown>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';

import { buttonDropdownEmits, buttonDropdownProps } from './button-dropdown';
import { useButtonDropdown } from './use-button-dropdown';

import McButton from '@/components/button/button.vue';
import McDropdown from '@/components/dropdown/dropdown.vue';

const props = defineProps(buttonDropdownProps);
const emits = defineEmits(buttonDropdownEmits);

const { selectedMenu, buttonDropdownClasses } = useButtonDropdown(props, emits);
</script>
