---
title: Quick Start
outline: deep
---

# Quick Start

Get up and running with Micro Core UI in just a few minutes!

## 1. Installation

If haven't already, install Micro Core UI from npm:

```bash
npm install micro-core-ui
```

For detailed installation instructions, see [Installation Guide](./installation.md).

## 2. Basic Component Usage

### Option A: Direct Import

Import and use components directly in your Vue components:

```vue
<script setup>
import { McButton, McCard } from 'micro-core-ui';

import 'micro-core-ui/style.css';

const handleClick = () => {
  console.log('Button clicked!');
};
</script>

<template>
  <McCard>
    <h2>Welcome to Micro Core UI</h2>
    <mc-button @click="handleClick">Click Me</mc-button>
  </McCard>
</template>
```

Register style in your `main.ts`:

```ts
import { createApp } from 'vue';
import App from './App.vue';

import 'micro-core-ui/style.css';

const app = createApp(App);

app.mount('#app');
```

### Option B: Global Registration

Register components globally in your `main.ts`:

```ts
import { createApp } from 'vue';
import App from './App.vue';

import MicroCoreUI from 'micro-core-ui';

import 'micro-core-ui/style.css';

const app = createApp(App);

app.use(MicroCoreUI);

app.mount('#app');
```

Then use them anywhere in your templates without importing:

```vue
<template>
  <McButton>No import needed!</McButton>
</template>
```

## 3. Common Components

Here are some commonly used components to get you started:

### Button

```vue
<mc-button variant="primary" size="md">
  Primary Button
</mc-button>

<mc-button variant="secondary" disabled>
  Disabled Button
</mc-button>
```

### Input

```vue
<script setup>
import { ref } from 'vue';

import { McInput } from 'micro-core-ui';

const username = ref('');
</script>

<template>
  <McInput v-model="username" placeholder="Enter username" label="Username" />
</template>
```

### Card

```vue
<McCard>
  <template #header>
    <h3>Card Title</h3>
  </template>
  <p>Card content goes here</p>
</McCard>
```

### Modal

```vue
<script setup>
import { ref } from 'vue';

import { McModal, McButton } from 'micro-core-ui';

const isOpen = ref(false);
</script>

<template>
  <mc-button @click="isOpen = true"> Open Modal </mc-button>

  <McModal v-model:open="isOpen" title="Welcome">
    <p>Modal content here</p>
  </McModal>
</template>
```

## 4. Styling with Tailwind CSS

Micro Core UI uses Tailwind CSS for styling. You can customize components by:

### Using Tailwind Classes

```vue
<mc-button class="px-8 py-4 rounded-lg">
  Custom Styled Button
</mc-button>
```

### Customizing via Props

Most components accept props for common styling options:

```vue
<mc-button variant="success" size="lg">
  Large Success Button
</mc-button>
```

## 5. Exploring More Components

Micro Core UI includes many more components:

- **Forms**: Input, Textarea, Select, Radio, Checkbox, DatePicker, TimePicker
- **Layout**: Card, Modal, SidePanel, SideNav, Tabs
- **Feedback**: Snackbar, Toast, Alert, Badge, Icon
- **Data Display**: Table, List, Avatar, Status
- **Navigation**: Button, Dropdown, Breadcrumb

Check out the [Component Documentation](/documentation/components/accordion.html) for complete details on all available components and their props.

## 6. TypeScript Support

Micro Core UI is fully typed with TypeScript! Get full autocomplete and type checking:

```vue
<script setup lang="ts">
import { ref } from 'vue';

import { McButton } from 'micro-core-ui';

import type { ButtonVariant } from 'micro-core-ui';

const variant = ref<ButtonVariant>('primary');
</script>
```
