---
title: URL Input
descripttion: URL input with native browser validation for properly formatted URLs.
outline: deep
---

# URL Input

URL input with native browser validation for properly formatted URLs.

## Basic Usage

<mc-input-url v-model="inputModels.basic" label="Website" placeholder="https://example.com" />

```vue
<template>
  <mc-input-url v-model="inputModel" label="Website" placeholder="https://example.com" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const inputModel = ref('');
</script>
```

## Active State

<mc-input-url v-model="inputModels.activeState" label="Website" placeholder="https://example.com" active />

```vue
<template>
  <mc-input-url v-model="inputModel" label="Website" placeholder="https://example.com" active />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const inputModel = ref('');
</script>
```

## Error State

<mc-input-url v-model="inputModels.errorState" label="Website" placeholder="https://example.com" :error="true">
  <template #icon>
    <Icon icon="ph:warning-circle-fill" />
  </template>
</mc-input-url>

```vue
<template>
  <mc-input-url v-model="inputModel" label="Website" placeholder="https://example.com" :error="true">
    <template #icon>
      <Icon icon="ph:warning-circle-fill" />
    </template>
  </mc-input-url>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const inputModel = ref('');
</script>
```

## Disabled State

<mc-input-url v-model="inputModels.disabledState" label="Website" placeholder="https://example.com" :disabled="true" />

## API Reference

This username input shares the same props, events, slots, and validation behavior as the base **Input**
component. Refer to the canonical API documentation here:

<a href="/documentation/components/input/input.html#api-reference">Input Component API Reference</a>

Only the visual intent (username context) differs; no additional props or unique events are introduced at this time.

```vue
<template>
  <mc-input-url v-model="inputModel" label="Website" placeholder="https://example.com" :disabled="true" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const inputModel = ref('');
</script>
```

<script setup lang="ts">
import { ref } from 'vue';

import { Icon } from '@iconify/vue';

import McInputUrl from '@/components/input/input-url/input-url.vue';

const inputModels = ref({
  basic: '',
  activeState: '',
  errorState: '',
  disabledState: '',
});
</script>
