---
title: Installation
outline: deep
---

# Installation

## NPM Installation

The easiest way to get started with Micro Core UI is to install it from npm.

View the package on npm: [micro-core-ui](https://www.npmjs.com/package/micro-core-ui)

### Prerequisites

- Node.js 16.0 or higher
- A Vue 3 project (or create one with Vite)

### Using NPM

```bash
npm install micro-core-ui
```

### Using Yarn

```bash
yarn add micro-core-ui
```

### Using PNPM

```bash
pnpm add micro-core-ui
```

## Setup in Your Project

### 1. Import Styles

Micro Core UI uses Tailwind CSS for styling. Import the styles in your `main.ts`:

```ts
import { createApp } from 'vue';
import App from './App.vue';

import 'micro-core-ui/style.css';

const app = createApp(App);

app.mount('#app');
```

### 2. Import Components

Once installed, you can import components directly into your Vue components:

```vue
<script setup>
import { McButton } from 'micro-core-ui';
</script>

<template>
  <McButton>Click me</McButton>
</template>
```

### 3. Global Registration (Optional)

If you want to register components globally in your application, you can do so in your `main.ts`:

```ts
import { createApp } from 'vue';
import App from './App.vue';

import '@/assets/styles/tailwind.css';

import MicroCoreUI from 'micro-core-ui';

const app = createApp(App);

app.use(MicroCoreUI);

app.mount('#app');
```

## Verification

To verify that Micro Core UI is properly installed, check your `package.json`:

```json
{
  "dependencies": {
    "micro-core-ui": "^1.2.0"
  }
}
```

You're all set! You can now start using Micro Core UI components in your project. Check out the [Component Documentation](/documentation/components/accordion.html) to explore all available components.
