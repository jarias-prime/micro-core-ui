---
title: Collapsible
descripttion: The Collapsible component provides a way to show and hide content in a smooth, animated transition. It's commonly used to create expandable sections, accordions, and dropdown menus, helping to conserve screen space while keeping content accessible.
outline: deep
---

# Collapsible

The Collapsible component provides a way to show and hide content in a smooth, animated transition. It's commonly used to create expandable sections, accordions, and dropdown menus, helping to conserve screen space while keeping content accessible.

## Basic Usage

The Collapsible component is controlled through a `v-model` binding that determines whether it's expanded or collapsed. Typically, you'll pair it with a trigger element (like a button) that toggles this state.

<mc-button tone="success" @click="collapsible1 = !collapsible1">Toggle Me</mc-button>
<mc-collapsible v-model="collapsible1">

  <div class="mc-p-4">
    Collapsible content here
  </div>
</mc-collapsible>

```vue
<template>
  <mc-button tone="success" @click="collapsible1 = !collapsible1">Toggle Me</mc-button>
  <mc-collapsible v-model="collapsible1">
    <div class="mc-p-4">Collapsible content here</div>
  </mc-collapsible>
</template>

<script setup>
import { ref } from 'vue';

const collapsible1 = ref(false); // Starts collapsed by default
</script>
```

## With Card

The Collapsible component works well with the Card component to create expandable card sections. This pattern is useful for dashboards, settings panels, or any interface where you want to show/hide detailed information.

<mc-card title="Contact Info" subtitle="Lorem ipsum dolor sit amet consectetur. Dui nunc elit vel sit at quis." has-collapsible :is-collapsible-open="collapsible2">
  <template #header>
    <div class="mc-ml-auto">
      <mc-button variant="secondary" hasIcon size="small" @click="collapsible2 = !collapsible2">
        <Icon icon="ph:caret-down" />
      </mc-button>    
    </div>
  </template>
  <mc-collapsible v-model="collapsible2">
    <div class="mc-px-4 mc-py-3">
      Collapsible Content
    </div>
  </mc-collapsible>
</mc-card>

```vue
<template>
  <mc-card
    title="Contact Info"
    subtitle="Lorem ipsum dolor sit amet consectetur. Dui nunc elit vel sit at quis."
    has-collapsible
    :is-collapsible-open="collapsible2"
  >
    <template #header>
      <div class="mc-ml-auto">
        <mc-button variant="secondary" hasIcon size="small" @click="collapsible2 = !collapsible2">
          <Icon icon="ph:caret-down" />
        </mc-button>
      </div>
    </template>

    <mc-collapsible v-model="collapsible2">
      <div class="mc-px-4 mc-py-3">Collapsible Content</div>
    </mc-collapsible>
  </mc-card>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const collapsible2 = ref(false);
</script>
```

:::tip Card Integration
When using `mc-collapsible` with `mc-card`, you can set the card's `has-collapsible` prop to `true` and use `is-collapsible-open` to keep the card's styling in sync with the collapsible state.
:::

## Custom Trigger

The Collapsible component provides a `trigger` slot that gives you access to the `toggleCollapsible` function. This allows you to create custom trigger elements that can toggle the collapsible state without needing to manage the state externally.

<mc-collapsible v-model="collapsible3">
  <template #trigger="{ toggleCollapsible }">
    <mc-button @click="toggleCollapsible">Custom Trigger</mc-button>
  </template>
  <div>
    Collapsible Content
  </div>
</mc-collapsible>

```vue
<template>
  <mc-collapsible v-model="collapsible3">
    <template #trigger="{ toggleCollapsible }">
      <mc-button @click="toggleCollapsible">Custom Trigger</mc-button>
    </template>
    <div>Collapsible Content</div>
  </mc-collapsible>
</template>

<script setup>
import { ref } from 'vue';

const collapsible3 = ref(false);
</script>
```

:::tip Using the trigger slot
The `toggleCollapsible` function provided in the trigger slot automatically updates the `v-model` value, so you don't need to manually toggle the state yourself.
:::

## Advanced Usage

### Customizing Transition Duration

You can customize how quickly the collapsible content expands and collapses by adjusting the `transitionDuration` prop (in milliseconds).

```vue
<template>
  <!-- Slow transition (500ms) -->
  <mc-collapsible v-model="isOpen" :transition-duration="500">
    <div class="mc-p-4">Slowly expanding/collapsing content</div>
  </mc-collapsible>

  <!-- Fast transition (50ms) -->
  <mc-collapsible v-model="isOpen" :transition-duration="50">
    <div class="mc-p-4">Quickly expanding/collapsing content</div>
  </mc-collapsible>
</template>
```

### Creating an Accordion

Multiple collapsible components can be combined to create an accordion interface where opening one section closes the others.

```vue
<template>
  <div class="mc-space-y-2">
    <div v-for="(section, index) in sections" :key="index" class="mc-rounded mc-border mc-p-2">
      <div
        class="mc-flex mc-cursor-pointer mc-items-center mc-justify-between mc-font-medium"
        @click="toggleSection(index)"
      >
        {{ section.title }}
        <Icon :icon="activeSection === index ? 'ph:caret-up' : 'ph:caret-down'" />
      </div>

      <mc-collapsible :model-value="activeSection === index">
        <div class="mc-pt-2">{{ section.content }}</div>
      </mc-collapsible>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const sections = [
  { title: 'Section 1', content: 'Content for section 1' },
  { title: 'Section 2', content: 'Content for section 2' },
  { title: 'Section 3', content: 'Content for section 3' },
];

const activeSection = ref(0); // First section open by default

const toggleSection = (index) => {
  activeSection.value = activeSection.value === index ? -1 : index;
};
</script>
```

## API Reference

### Props

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>modelValue</td>
      <td>boolean</td>
      <td>-</td>
      <td><strong>Required.</strong> Controls whether the content is expanded (true) or collapsed (false)</td>
    </tr>
    <tr>
      <td>transitionDuration</td>
      <td>number</td>
      <td>150</td>
      <td>Duration of the expand/collapse animation in milliseconds</td>
    </tr>
  </tbody>
</table>

### Events

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
      <th>Parameters</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>update:modelValue</td>
      <td>Emitted when the expanded/collapsed state changes</td>
      <td><code>(value: boolean)</code>: The new state</td>
    </tr>
  </tbody>
</table>

### Slots

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
      <th>Props</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>default</td>
      <td>The content that will be collapsed/expanded</td>
      <td>None</td>
    </tr>
    <tr>
      <td>trigger</td>
      <td>Custom trigger element that will toggle the collapsible state</td>
      <td><code>{ toggleCollapsible: () => void }</code></td>
    </tr>
  </tbody>
</table>

<script lang="ts" setup>
import { ref } from 'vue';
import McCollapsible from "@/components/collapsible/collapsible.vue";
import McButton from '@/components/button/button.vue';
import McCard from '@/components/card/card.vue';
import { Icon } from '@iconify/vue';

const collapsible1 = ref(false)
const collapsible2 = ref(false)
const collapsible3 = ref(false)
</script>
