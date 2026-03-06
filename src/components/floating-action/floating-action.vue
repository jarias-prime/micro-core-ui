<template>
  <Transition
    name="slide-up"
    enter-active-class="mc-transition mc-duration-[150ms] mc-ease-in-out"
    enter-from-class="mc-translate-y-20"
    enter-to-class="mc-translate-y-0"
    leave-active-class="mc-transition mc-duration-[150ms] mc-ease-in-out"
    leave-from-class="mc-translate-y-0"
    leave-to-class="mc-translate-y-20"
  >
    <div v-if="isVisible" :class="[floatingActionClasses.wrapperClass]">
      <div
        v-if="!$slots.default"
        class="mc-flex mc-w-full mc-items-center mc-justify-between mc-px-size-spacing-md mc-py-size-spacing-2xs"
      >
        <slot v-if="$slots.message" name="message" />

        <div v-if="$slots.actions" class="mc-flex mc-items-center mc-gap-1">
          <slot name="actions" />
        </div>
      </div>
      <slot />
    </div>
  </Transition>
</template>
<script lang="ts" setup>
import { floatingActionPropTypes } from './floating-action';
import { useFloatingAction } from './use-floating-action';

const props = defineProps(floatingActionPropTypes);
const { isVisible, floatingActionClasses } = useFloatingAction(props);
</script>
