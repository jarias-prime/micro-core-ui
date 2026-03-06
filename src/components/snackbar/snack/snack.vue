<template>
  <div
    v-bind="snackProps"
    ref="snackRef"
    class="snackbar mc-background-color-inverted mc-text-color-inverted-strong mc-font-size-200 mc-line-height-400 mc-border-color-strong mc-box-border mc-flex mc-h-fit mc-flex-row mc-items-center mc-rounded-border-radius-lg mc-border mc-border-solid mc-px-size-spacing-2xs mc-py-size-spacing-3xs"
    @click="handleClick"
  >
    <div class="mc-flex mc-flex-auto mc-items-center">
      <slot name="icon">
        <Icon
          v-if="showIcon"
          :icon="snackIcon"
          :width="iconSize"
          :height="iconSize"
          :class="[snackToneCssClass, 'mc-mr-size-spacing-3xs mc-flex-shrink-0']"
        />
      </slot>

      <slot name="label">
        <label>{{ text }}</label>
      </slot>
    </div>
    <template v-if="showAction">
      <slot>
        <label
          :class="[
            snackToneCssClass,
            'mc-font-size-100 mc-line-height-100 mc-ml-size-spacing-3xs mc-flex mc-items-center mc-font-medium mc-uppercase selection:mc-cursor-pointer',
          ]"
          @click="() => action()"
        >
          <mc-button
            v-if="actionIconProps"
            icon-only
            :class="['!mc-p-size-spacing-4xs hover:mc-cursor-pointer', { 'mc-mr-2': actionText !== '' }]"
            size="small"
            variant="secondary"
            :tone="actionIconProps.tone"
          >
            <Icon :icon="actionIconProps.icon" width="20" height="20" />
          </mc-button>
          {{ actionText }}
        </label>
      </slot>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import McButton from '@/components/button/button.vue';
import { snackEmitTypes, snackPropTypes } from './snack';
import { useSnack } from './use-snack';

const iconSize = '24px';

const props = defineProps(snackPropTypes);
const emit = defineEmits(snackEmitTypes);

const { snackRef, snackProps, snackToneCssClass, snackIcon, handleClick } = useSnack(props, emit);
</script>

<style lang="scss" scoped>
.snackbar {
  width: 360px;
  max-width: 360px;
  min-height: 56px;
  max-height: 76px;
}
</style>
