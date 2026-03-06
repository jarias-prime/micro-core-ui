<template>
  <div id="empty-state" :class="containerClasses">
    <slot :class="emptyStateClasses.imageSizeClasses" />

    <div v-if="!$slots.default" :class="emptyStateClasses.imageSizeClasses">
      <img :src="getImageUrl" alt="empty" class="mc-h-full mc-w-full mc-object-cover" />
    </div>

    <section class="mc-flex mc-flex-col mc-items-center mc-justify-center mc-gap-size-spacing-md">
      <div class="mc-text-color-strong mc-body-md mc-body-md-regular-medium mc-flex mc-flex-col">
        <span>{{ description }}</span>
        <div class="mc-text-color-base mc-body-sm-regular">
          {{ subDescription }}
        </div>
      </div>

      <slot name="button" />
    </section>
  </div>
</template>

<script lang="ts" setup>
import { emptyStatePropTypes } from './empty-state';
import { useEmptyState } from './use-empty-state';

defineEmits(['onClick']);

const props = defineProps(emptyStatePropTypes);

const { emptyStateClasses, getImageUrl, containerClasses } = useEmptyState(props);
</script>
