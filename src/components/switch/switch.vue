<template>
  <div v-bind="switchProps" :class="['mc-flex mc-items-center mc-gap-2', switchTextClass]">
    <label v-if="!isLeftTextLabel" :for="defaultId" class="mc-cursor-pointer">
      <slot name="leftText">
        <slot></slot>
      </slot>
    </label>
    <div
      ref="switchWrapperRef"
      :class="{
        'mc-relative mc-flex mc-items-center': true,
        'mc-cursor-pointer mc-transition mc-duration-300 mc-ease-in-out active:mc-scale-90': !props.disabled,
      }"
    >
      <input
        :id="defaultId"
        ref="switchRef"
        v-model="proxyValue"
        type="checkbox"
        name="checkbox"
        :class="['input mc-absolute mc-left-0 mc-top-0 mc-z-10 mc-m-0 mc-h-6 mc-w-12 mc-opacity-0', switchInputClass]"
        :disabled="props.disabled"
      />
      <span
        :class="[
          'switch-mark mc-relative mc-box-border mc-inline-block mc-h-6 mc-w-12 mc-rounded-[40px] mc-p-1',
          switchMarkClass,
        ]"
      ></span>
    </div>
    <label v-if="!isRightTextLabel" :for="defaultId" class="mc-cursor-pointer">
      <slot name="rightText"></slot>
    </label>
  </div>
</template>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core';

import { switchEmitTypes, switchPropTypes } from './switch';
import { useSwitch } from './use-switch';

const props = defineProps(switchPropTypes);
const emit = defineEmits(switchEmitTypes);

const defaultId = props.id
  ? props.id + '_' + Math.random().toString(36).substring(2, 8)
  : 'switch_input_' + Math.random().toString(36).substring(2, 8);

const proxyValue = useVModel(props, 'modelValue', emit);

const {
  switchWrapperRef,
  switchRef,
  switchProps,
  switchMarkClass,
  switchTextClass,
  switchInputClass,
  isLeftTextLabel,
  isRightTextLabel,
} = useSwitch(props);
</script>

<style lang="scss" scoped>
.input {
  &:checked ~ .switch-mark:before {
    @apply mc-left-[1.7rem];
  }
}

.switch-mark {
  &:before,
  &:after {
    @apply mc-absolute;
    content: '';
  }

  &:before {
    @apply mc-left-1 mc-top-1 mc-h-4 mc-w-4 mc-rounded-[50%] mc-bg-white-50;
  }
}
</style>
