---
title: Sidepanel
descripttion: The Sidepanel component is a versatile UI element that slides in from the edge of the screen to display supplementary content, forms, or detailed information without disrupting the main interface. It provides a contextual and non-intrusive way to present additional content and actions.
outline: deep
---

# Sidepanel

The Sidepanel component is a versatile UI element that slides in from the edge of the screen to display supplementary content, forms, or detailed information without disrupting the main interface. It provides a contextual and non-intrusive way to present additional content and actions.

## Overview

Sidepanels are ideal for presenting:

- Contextual details for selected items
- Forms for creating or editing content
- Filtering and search interfaces
- Multi-step workflows
- Supplementary information that doesn't require a full page

![Sidepanel Sample](/images/sidepanel-sample.png)

## Basic Usage

The basic implementation of a Sidepanel requires:

1. A control element (like a button) to trigger the panel
2. The Sidepanel component with content
3. State management for opening and closing

<div>
  <mc-button tone="success" @click="isSidepanelOpen = true">
    Open Sidepanel
  </mc-button>
  <mc-sidepanel
    :is-open="isSidepanelOpen"
    @close="isSidepanelOpen = false"
    header-title="Sidepanel Example"
  >
    <div class="mc-p-4">
      Sidepanel Content
    </div>
    <template #footer>
      <div class="mc-px-4 mc-flex mc-justify-end mc-gap-2">
        <mc-button @click="isSidepanelOpen = false">Cancel</mc-button>
        <mc-button tone="success">Submit</mc-button>
      </div>
    </template>
  </mc-sidepanel>
</div>

```vue
<template>
  <!-- Trigger button -->
  <mc-button tone="success" @click="isSidepanelOpen = true"> Open Sidepanel </mc-button>

  <!-- Sidepanel component -->
  <mc-sidepanel :is-open="isSidepanelOpen" @close="isSidepanelOpen = false" header-title="Sidepanel Example">
    <!-- Main content -->
    <div class="mc-p-4">Sidepanel Content</div>

    <!-- Footer actions -->
    <template #footer>
      <div class="mc-flex mc-justify-end mc-gap-2 mc-px-4">
        <mc-button @click="isSidepanelOpen = false">Cancel</mc-button>
        <mc-button tone="success">Submit</mc-button>
      </div>
    </template>
  </mc-sidepanel>
</template>

<script setup>
import { ref } from 'vue';

const isSidepanelOpen = ref(false);
</script>
```

:::tip
The Sidepanel includes a built-in close button in the header and can also be closed by clicking outside the panel or pressing the ESC key.
:::

## Expandable Sidepanel

<div>
  <mc-button tone="success" @click="isExpandableSidepanelOpen = true">
    Open Sidepanel
  </mc-button>
  <mc-sidepanel
    :is-open="isExpandableSidepanelOpen"
    @close="isExpandableSidepanelOpen = false"
    :is-expandable="true"
    :is-expanded="isSidepanelExpanded"
    @expand="isSidepanelExpanded = true"
    @shrink="isSidepanelExpanded = false"
    header-title="Sidepanel Example"
  >
    <div class="mc-p-4">
      Sidepanel Content
    </div>
    <template #footer>
      <div class="mc-px-4 mc-flex mc-justify-end mc-gap-2">
        <mc-button @click="isExpandableSidepanelOpen = false">Cancel</mc-button>
        <mc-button tone="success">Submit</mc-button>
      </div>
    </template>
  </mc-sidepanel>
</div>

```vue
<template>
  <div>
    <mc-button tone="success" @click="isExpandableSidepanelOpen = true"> Open Sidepanel </mc-button>
    <mc-sidepanel
      :is-open="isExpandableSidepanelOpen"
      @close="isExpandableSidepanelOpen = false"
      :is-expandable="true"
      :is-expanded="isSidepanelExpanded"
      @expand="isSidepanelExpanded = true"
      @shrink="isSidepanelExpanded = false"
      header-title="Sidepanel Example"
    >
      <div class="mc-p-4">Sidepanel Content</div>
      <template #footer>
        <div class="mc-flex mc-justify-end mc-gap-2 mc-px-4">
          <mc-button @click="isExpandableSidepanelOpen = false">Cancel</mc-button>
          <mc-button tone="success">Submit</mc-button>
        </div>
      </template>
    </mc-sidepanel>
  </div>
</template>
```

## Sidepanel Sizes

The Sidepanel component offers three predefined sizes to accommodate different content needs. Use the `size` prop to specify the width of the panel.

<div>
  <div class="mc-flex mc-space-x-4">
    <mc-button tone="success" @click="isSmallSidepanelOpen = true">Small (360px)</mc-button>
    <mc-button tone="success" @click="isMediumSidepanelOpen = true">Medium (420px)</mc-button>
    <mc-button tone="success" @click="isLargeSidepanelOpen = true">Large (480px)</mc-button>
  </div>
  <mc-sidepanel
    size="sm"
    :is-open="isSmallSidepanelOpen"
    @close="isSmallSidepanelOpen = false"
    header-title="Small Sidepanel"
  >
    <div class="mc-p-4">
      <p class="mc-mb-2 mc-font-semibold">Width: 360px</p>
      <p>Small sidepanels are ideal for simple forms, filters, or quick information display.</p>
    </div>
  </mc-sidepanel>
  <mc-sidepanel
    size="md"
    :is-open="isMediumSidepanelOpen"
    @close="isMediumSidepanelOpen = false"
    header-title="Medium Sidepanel"
  >
    <div class="mc-p-4">
      <p class="mc-mb-2 mc-font-semibold">Width: 420px</p>
      <p>Medium sidepanels provide more space for complex forms or detailed information displays.</p>
    </div>
  </mc-sidepanel>
  <mc-sidepanel
    size="lg"
    :is-open="isLargeSidepanelOpen"
    @close="isLargeSidepanelOpen = false"
    header-title="Large Sidepanel"
  >
    <div class="mc-p-4">
      <p class="mc-mb-2 mc-font-semibold">Width: 480px</p>
      <p>Large sidepanels are best for complex interfaces with multiple inputs or rich content display.</p>
    </div>
  </mc-sidepanel>
</div>

```vue
<template>
  <div class="mc-flex mc-space-x-4">
    <mc-button tone="success" @click="isSmallSidepanelOpen = true"> Small (360px) </mc-button>
    <mc-button tone="success" @click="isMediumSidepanelOpen = true"> Medium (420px) </mc-button>
    <mc-button tone="success" @click="isLargeSidepanelOpen = true"> Large (480px) </mc-button>
  </div>

  <!-- Small Sidepanel -->
  <mc-sidepanel
    size="sm"
    :is-open="isSmallSidepanelOpen"
    @close="isSmallSidepanelOpen = false"
    header-title="Small Sidepanel"
  >
    <div class="mc-p-4">Width: 360px</div>
  </mc-sidepanel>

  <!-- Medium Sidepanel -->
  <mc-sidepanel
    size="md"
    :is-open="isMediumSidepanelOpen"
    @close="isMediumSidepanelOpen = false"
    header-title="Medium Sidepanel"
  >
    <div class="mc-p-4">Width: 420px</div>
  </mc-sidepanel>

  <!-- Large Sidepanel -->
  <mc-sidepanel
    size="lg"
    :is-open="isLargeSidepanelOpen"
    @close="isLargeSidepanelOpen = false"
    header-title="Large Sidepanel"
  >
    <div class="mc-p-4">Width: 480px</div>
  </mc-sidepanel>
</template>

<script setup>
import { ref } from 'vue';

const isSmallSidepanelOpen = ref(false);
const isMediumSidepanelOpen = ref(false);
const isLargeSidepanelOpen = ref(false);
</script>
```

:::tip Responsive Behavior
On small screens (mobile devices), sidepanels automatically adjust to take up most of the screen width while maintaining padding for usability.
:::

## Customizing Header and Footer

### Custom Footer Padding

Use the `footer-no-padding` prop to remove the default padding from the footer. This is useful when you need to create custom layouts or when using components that provide their own padding.

<div>
  <div class="mc-flex mc-space-x-4">
    <mc-button tone="success" @click="isNoPaddingModal = true">Footer Without Padding</mc-button>
  </div>
  <mc-sidepanel
    size="sm"
    :is-open="isNoPaddingModal"
    header-title="Custom Footer Example"
    footer-no-padding
    @close="isNoPaddingModal = false"
  >
    <div class="mc-p-4">
      <p>The footer below has no default padding, allowing for custom styling.</p>
    </div>
    <template #footer>
      <div class="mc-bg-neutral-50 mc-p-3 mc-flex mc-justify-end mc-gap-2">
        <mc-button variant="secondary" @click="isNoPaddingModal = false">Cancel</mc-button>
        <mc-button tone="success">Confirm</mc-button>
      </div>
    </template>
  </mc-sidepanel>
</div>

```vue
<template>
  <mc-button tone="success" @click="isNoPaddingModal = true"> Footer Without Padding </mc-button>

  <mc-sidepanel
    size="sm"
    :is-open="isNoPaddingModal"
    header-title="Custom Footer Example"
    footer-no-padding
    @close="isNoPaddingModal = false"
  >
    <div class="mc-p-4">
      <p>The footer below has no default padding, allowing for custom styling.</p>
    </div>
    <template #footer>
      <div class="mc-flex mc-justify-end mc-gap-2 mc-bg-neutral-50 mc-p-3">
        <mc-button variant="secondary" @click="isNoPaddingModal = false">Cancel</mc-button>
        <mc-button tone="success">Confirm</mc-button>
      </div>
    </template>
  </mc-sidepanel>
</template>

<script setup>
import { ref } from 'vue';

const isNoPaddingModal = ref(false);
</script>
```

### Custom Header

You can fully customize the header section using the `header` slot.

```vue
<template>
  <mc-sidepanel :is-open="isOpen" @close="isOpen = false">
    <!-- Custom header -->
    <template #header>
      <div class="mc-flex mc-items-center mc-justify-between mc-bg-neutral-50 mc-p-4">
        <div class="mc-flex mc-items-center mc-gap-2">
          <Icon icon="ph:user-circle" class="mc-text-brand-600 mc-size-6" />
          <h3 class="mc-subheading-md">User Profile</h3>
        </div>
        <Icon icon="ph:x" class="mc-text-color-weak mc-cursor-pointer" @click="isOpen = false" />
      </div>
    </template>

    <!-- Panel content -->
    <div class="mc-p-4">Content goes here</div>
  </mc-sidepanel>
</template>
```

:::warning
When using a custom header with the `header` slot, you'll need to implement your own close button functionality.
:::

## Advanced Features

### Custom Height

You can customize the height of the sidepanel using the `height` prop. This can be specified as a number (interpreted as pixels) or a string with CSS units.

```vue
<template>
  <!-- Fixed height in pixels -->
  <mc-sidepanel :is-open="isOpen" @close="isOpen = false" height="500">
    <!-- Content -->
  </mc-sidepanel>

  <!-- Height with CSS units -->
  <mc-sidepanel :is-open="isOpen" @close="isOpen = false" height="80vh">
    <!-- Content -->
  </mc-sidepanel>
</template>
```

### Backdrop Control

You can control whether the sidepanel displays a backdrop using the `has-backdrop` prop.

```vue
<template>
  <!-- Without backdrop -->
  <mc-sidepanel :is-open="isOpen" @close="isOpen = false" :has-backdrop="false">
    <!-- Content -->
  </mc-sidepanel>
</template>
```

### Close Behavior

Control how the sidepanel can be closed using the `close-outside` and `escape-close` props.

```vue
<template>
  <!-- Prevent closing when clicking outside -->
  <mc-sidepanel :is-open="isOpen" @close="isOpen = false" :close-outside="false">
    <!-- Content -->
  </mc-sidepanel>

  <!-- Prevent closing with ESC key -->
  <mc-sidepanel :is-open="isOpen" @close="isOpen = false" :escape-close="false">
    <!-- Content -->
  </mc-sidepanel>
</template>
```

## Slots

The Sidepanel component provides three slots for customizing different sections of the panel.

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><em>default</em></td>
      <td>The main content area of the sidepanel. This is where your primary content should be placed.</td>
    </tr>
    <tr>
      <td><code>header</code></td>
      <td>Used to replace the default header with custom content. When using this slot, you'll need to implement your own close button.</td>
    </tr>
    <tr>
      <td><code>subtitle</code></td>
      <td>Used to replace the default header subtitle with custom content.</td>
    </tr>
    <tr>
      <td><code>footer</code></td>
      <td>Used to add a footer section at the bottom of the sidepanel. Typically contains action buttons.</td>
    </tr>
  </tbody>
</table>

## API Reference

### Props

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
      <th>Type</th>
      <th>Default</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>is-open</code></td>
      <td>Controls whether the sidepanel is open or closed</td>
      <td>boolean</td>
      <td>false</td>
    </tr>
    <tr>
      <td><code>header-title</code></td>
      <td>The title text displayed in the sidepanel's header</td>
      <td>string</td>
      <td>'Sidepanel Header'</td>
    </tr>
    <tr>
      <td><code>size</code></td>
      <td>Controls the width of the sidepanel</td>
      <td>'sm' | 'md' | 'lg'</td>
      <td>'sm'</td>
    </tr>
    <tr>
      <td><code>height</code></td>
      <td>Specifies the height of the sidepanel. Can be a number (in pixels) or a string with CSS units</td>
      <td>string | number</td>
      <td>'calc(100vh - 32px)'</td>
    </tr>
    <tr>
      <td><code>hide-header</code></td>
      <td>When true, hides the default header section</td>
      <td>boolean</td>
      <td>false</td>
    </tr>
    <tr>
      <td><code>position</code></td>
      <td>Specifies which side the panel appears from</td>
      <td>'right'</td>
      <td>'right'</td>
    </tr>
    <tr>
      <td><code>has-backdrop</code></td>
      <td>When true, displays a semi-transparent backdrop behind the sidepanel</td>
      <td>boolean</td>
      <td>true</td>
    </tr>
    <tr>
      <td><code>close-outside</code></td>
      <td>When true, allows closing the sidepanel by clicking outside of it</td>
      <td>boolean</td>
      <td>true</td>
    </tr>
    <tr>
      <td><code>escape-close</code></td>
      <td>When true, allows closing the sidepanel by pressing the ESC key</td>
      <td>boolean</td>
      <td>true</td>
    </tr>
    <tr>
      <td><code>is-stacking</code></td>
      <td>Enables stacking behavior for the sidepanel (for nested panels)</td>
      <td>boolean</td>
      <td>false</td>
    </tr>
    <tr>
      <td><code>footer-no-padding</code></td>
      <td>When true, removes the default padding from the footer section</td>
      <td>boolean</td>
      <td>false</td>
    </tr>
    <tr>
      <td><code>isExpandable</code></td>
      <td>When true, renders an icon for expanding or shrinking the sidepanel.</td>
      <td>boolean</td>
      <td>false</td>
    </tr>
    <tr>
      <td><code>isExpanded</code></td>
      <td>Specifies if the sidepanel is currently expanded.</td>
      <td>boolean</td>
      <td>false</td>
    </tr>
    <tr>
      <td><code>isActivePanel</code></td>
      <td>Specifies if the sidepanel is currently shown in a stacked sidepanels. Inactive Panels have pointer events disabled.</td>
      <td>boolean</td>
      <td>false</td>
    </tr>
    <tr>
      <td><code>footerNoTopBorder</code></td>
      <td>When true, removes the top border from the footer slot.</td>
      <td>boolean</td>
      <td>false</td>
    </tr>
    <tr>
      <td><code>headerSubtitle</code></td>
      <td>The title text displayed under the sidepanel's header title.</td>
      <td>string</td>
      <td>-</td>
    </tr>
    <tr>
      <td><code>isLoading</code></td>
      <td>When true, will render skelatal loaders in the header.</td>
      <td>boolean</td>
      <td>false</td>
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
      <td><code>close</code></td>
      <td>Emitted when the sidepanel should be closed (from close button, outside click, or ESC key)</td>
      <td>None</td>
    </tr>
    <tr>
      <td><code>on-close</code></td>
      <td>Emitted after the sidepanel has been closed</td>
      <td>None</td>
    </tr>
    <tr>
      <td><code>expand</code></td>
      <td>Emitted when the expand icon is clicked</td>
      <td>None</td>
    </tr>
    <tr>
      <td><code>shrink</code></td>
      <td>Emitted when the shrink icon is clicked</td>
      <td>None</td>
    </tr>
  </tbody>
</table>

<script lang="ts" setup>
import { ref } from 'vue';

import McSidepanel from '@/components/sidepanel/sidepanel.vue';
import McButton from "@/components/button/button.vue";

const isSidepanelOpen = ref(false)
const isSmallSidepanelOpen = ref(false)
const isMediumSidepanelOpen = ref(false)
const isLargeSidepanelOpen = ref(false)
const isCustomHeaderTitleOpen = ref(false)
const isNoPaddingModal = ref(false)
const isSidepanelExpanded = ref(false)
const isExpandableSidepanelOpen = ref(false)

import McSidenav from '@/components/sidenav/sidenav.vue';

</script>
