<template>
  <Menu
    v-model:shown="isOpen"
    :aria-id="props.fullWidth ? 'time-picker-wrapper-full-width' : 'time-picker-wrapper'"
    distance="4"
    placement="bottom-start"
    :triggers="['click']"
    :popper-hide-triggers="[]"
    :container="`#${uniqueId}`"
    :style="{
      width: '100%',
    }"
    instant-move
  >
    <div
      :id="uniqueId"
      :style="{
        width: '100%',
      }"
    >
      <mc-input
        :id="props.id"
        v-model="selectedValue"
        type="text"
        :placeholder="getPlaceHolder"
        :readonly="props.disableTyping"
        :disabled="props.disabled"
        :label="props.label"
        :error="props.error"
        :display-helper="!!props.helperText"
        :helper-text="props.helperText"
        @input="filterInput"
      >
        <template #icon>
          <Icon icon="ph:clock" />
        </template>
      </mc-input>
    </div>

    <template #popper>
      <div :class="optionClasses">
        <div v-if="filteredOptions.length > 0">
          <div
            v-for="option in filteredOptions"
            :key="option"
            :class="[
              'mc-body-xs-regular mc-flex mc-cursor-pointer mc-justify-between mc-rounded-border-radius-md mc-p-size-spacing-3xs',
              'hover:mc-background-color-hover',
              {
                'mc-background-color-single-active mc-rounded-border-radius-md':
                  option.toUpperCase() === selectedValue?.toUpperCase(),
              },
            ]"
            @mousedown.prevent="selectOption(option)"
          >
            {{ option }}

            <span
              v-if="option.toUpperCase() === selectedValue?.toUpperCase()"
              class="mc-text-color-brand-base mc-font-bold"
            >
              <Icon icon="ph:check" />
            </span>
          </div>
        </div>
        <div v-else class="mc-px-3 mc-py-2 mc-text-gray-500">No matching options found</div>
      </div>
    </template>
  </Menu>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { Menu } from 'floating-vue';
import 'floating-vue/dist/style.css';
import McInput from '@/components/input/input.vue';

import { timePickerPropTypes, timePickerEmitTypes } from './time-picker';
import { useTimePicker } from './use-time-picker';

const props = defineProps(timePickerPropTypes);
const emit = defineEmits(timePickerEmitTypes);

const { optionClasses, isOpen, filteredOptions, selectedValue, getPlaceHolder, selectOption, filterInput, uniqueId } =
  useTimePicker(props, emit);
</script>
