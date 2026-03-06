<template>
  <div :class="['mc-lozenge__wrapper', lozengeClasses.wrapperClasses]">
    <div v-if="visible && !loading" :class="['mc-lozenge__base', lozengeClasses.baseClasses]">
      <div
        :class="['mc-lozenge__tone', lozengeClasses.toneClasses]"
        :tabindex="props.interactive || props.dropdown ? 0 : -1"
        :style="{ maxWidth: props.maxWidth }"
      >
        <div
          v-if="$slots.icon || props.icon"
          class="mc-lozenge__prefix-icon mc-flex mc-h-3 mc-w-3 mc-items-center mc-overflow-hidden"
        >
          <slot name="icon">
            <icon :icon="props.icon" />
          </slot>
        </div>

        <div v-if="$slots.avatar || props.url" class="mc-lozenge__avatar">
          <slot name="avatar">
            <div v-if="url" class="mc-h-4 mc-w-4 mc-overflow-hidden">
              <img class="mc-h-full mc-w-full mc-rounded-full mc-object-cover" :src="url" alt="avatar" />
            </div>
          </slot>
        </div>

        <span :class="lozengeClasses.labelClasses">{{ label }}</span>

        <div
          v-if="$slots.postfixIcon || props.postfixIcon || props.dropdown"
          class="mc-lozenge__prefix-icon mc-flex mc-h-3 mc-w-3 mc-items-center mc-overflow-hidden"
        >
          <slot name="postfixIcon">
            <icon v-if="props.postfixIcon" :icon="props.postfixIcon" />
            <icon v-else icon="ph:caret-down-fill" />
          </slot>
        </div>
      </div>
    </div>
    <div v-if="visible && loading" :class="['mc-lozenge__loading', lozengeClasses.baseClasses]" />
  </div>
</template>

<script lang="ts" setup>
import { lozengePropTypes } from './lozenge';
import { useLozenge } from './use-lozenge';
import { Icon } from '@iconify/vue';

const props = defineProps(lozengePropTypes);
const { lozengeClasses } = useLozenge(props);
</script>
