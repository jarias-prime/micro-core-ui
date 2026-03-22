<template>
  <PageNotFound v-if="page.isNotFound" />

  <template v-else>
    <HomeLayout v-if="frontmatter.layout === 'Home'" />

    <DefaultLayout v-else />
  </template>
</template>

<script setup>
import { useData } from 'vitepress';

import PageNotFound from './PageNotFound.vue';
import HomeLayout from './Layouts/HomeLayout.vue';
import DefaultLayout from './Layouts/DefaultLayout.vue';

const { page, frontmatter } = useData();
</script>
