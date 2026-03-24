<template>
  <Navbar />

  <Content :class="['mc:mt-43.75', 'mc:sm:mt-23.75']" />

  <Footer />
</template>

<script setup lang="ts">
import { Content } from 'vitepress';

import Navbar from '../Compoents/Navbar.vue';
import Footer from '../Compoents/Footer.vue';
</script>
