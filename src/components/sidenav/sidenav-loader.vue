<template>
  <div v-for="loader in count" :key="loader" class="mc-flex lg:mc-m-auto">
    <div class="mc-skeletal-loader mc-h-[40px] mc-w-full mc-rounded-lg lg:mc-h-[24px] lg:mc-w-[24px]" />
  </div>
</template>

<script lang="ts" setup>
defineProps({
  count: {
    type: Number,
    default: 2,
  },
});
</script>
