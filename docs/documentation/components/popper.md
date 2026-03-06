---
outline: 'deep'
---

# Popper

Popper provides a utility for positioning floating elements relative to reference elements, commonly used for tooltips, dropdowns, and other overlay content.

## Key Features

<ul>
  <li>
    <strong>Dynamic Positioning:</strong>
    <span>Automatically positions content relative to a reference element.</span>
  </li>
  <li>
    <strong>Flexible Placement:</strong>
    <span>Supports multiple placement options including top, bottom, left, right, and their variations.</span>
  </li>
  <li>
    <strong>Click Outside:</strong>
    <span>Built-in click-outside detection to automatically close the popper.</span>
  </li>
  <li>
    <strong>Slot-based Content:</strong>
    <span>Flexible content management through Vue slots for both trigger and content.</span>
  </li>
  <li>
    <strong>Accessibility:</strong>
    <span>ARIA-compliant for better accessibility support.</span>
  </li>
</ul>

## Basic Usage

A basic popper requires a trigger element and content to display.

<div class="mc-w-fit">
  <mc-popper
    id="basic-example"
    distance="4"
    placement="bottom"
    :triggers="[]"
    :popper-hide-triggers="[]"
    :auto-hide="false"
    :delay="0"
  >
    <mc-button>Click for Menu</mc-button>
    <template #content>
      <div class="mc-p-4 mc-bg-white mc-shadow-lg mc-rounded-lg">
        <h3 class="mc-text-lg mc-font-medium mc-mb-2">Menu Options</h3>
        <ul class="mc-space-y-2">
          <li class="mc-flex mc-items-center mc-gap-2 mc-p-2 mc-hover:bg-gray-50 mc-rounded">
            <Icon icon="ph:user" class="mc-w-5 mc-h-5" />
            <span>Profile</span>
          </li>
          <li class="mc-flex mc-items-center mc-gap-2 mc-p-2 mc-hover:bg-gray-50 mc-rounded">
            <Icon icon="ph:gear" class="mc-w-5 mc-h-5" />
            <span>Settings</span>
          </li>
          <li class="mc-flex mc-items-center mc-gap-2 mc-p-2 mc-hover:bg-gray-50 mc-rounded">
            <Icon icon="ph:sign-out" class="mc-w-5 mc-h-5" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </template>
  </mc-popper>
</div>

```vue
<template>
  <mc-popper
    id="basic-example"
    distance="4"
    placement="bottom"
    :triggers="[]"
    :popper-hide-triggers="[]"
    :auto-hide="false"
    :delay="0"
  >
    <mc-button>Click for Menu</mc-button>
    <template #content>
      <div class="mc-bg-white mc-rounded-lg mc-p-4 mc-shadow-lg">
        <h3 class="mc-mb-2 mc-text-lg mc-font-medium">Menu Options</h3>
        <ul class="mc-space-y-2">
          <li class="mc-hover:bg-gray-50 mc-flex mc-items-center mc-gap-2 mc-rounded mc-p-2">
            <Icon icon="ph:user" class="mc-h-5 mc-w-5" />
            <span>Profile</span>
          </li>
          <li class="mc-hover:bg-gray-50 mc-flex mc-items-center mc-gap-2 mc-rounded mc-p-2">
            <Icon icon="ph:gear" class="mc-h-5 mc-w-5" />
            <span>Settings</span>
          </li>
          <li class="mc-hover:bg-gray-50 mc-flex mc-items-center mc-gap-2 mc-rounded mc-p-2">
            <Icon icon="ph:sign-out" class="mc-h-5 mc-w-5" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </template>
  </mc-popper>
</template>

<script setup>
import { Icon } from '@iconify/vue';
</script>
```

## Placement

The popper can be positioned in different locations relative to the trigger element.

<div class="mc-w-fit mc-grid mc-grid-cols-4 mc-gap-4 mc-p-8">

  <mc-popper id="top-popper" placement="top" distance="4">
    <mc-button tone="information">
      <template #prefix-icon>
        <Icon icon="ph:arrow-up" />
      </template>
      Top Popper
    </mc-button>
    <template #content>
      <div class="mc-p-3 mc-bg-white mc-shadow-lg mc-rounded-lg mc-flex mc-items-center mc-gap-2">
        <Icon icon="ph:info" class="mc-text-blue-500 mc-w-5 mc-h-5" />
        <span>Top positioned content</span>
      </div>
    </template>
  </mc-popper>

  <mc-popper id="right-popper" placement="right" distance="4">
    <mc-button tone="success">
      <template #prefix-icon>
        <Icon icon="ph:arrow-right" />
      </template>
      Right Popper
    </mc-button>
    <template #content>
      <div class="mc-p-3 mc-bg-white mc-shadow-lg mc-rounded-lg mc-flex mc-items-center mc-gap-2">
        <Icon icon="ph:check-circle" class="mc-text-green-500 mc-w-5 mc-h-5" />
        <span>Right positioned content</span>
      </div>
    </template>
  </mc-popper>
  
  <mc-popper id="bottom-popper" placement="bottom" distance="4">
    <mc-button tone="danger">
      <template #prefix-icon>
        <Icon icon="ph:arrow-down" />
      </template>
      Bottom Popper
    </mc-button>
    <template #content>
      <div class="mc-p-3 mc-bg-white mc-shadow-lg mc-rounded-lg mc-flex mc-items-center mc-gap-2">
        <Icon icon="ph:warning" class="mc-text-red-500 mc-w-5 mc-h-5" />
        <span>Bottom positioned content</span>
      </div>
    </template>
  </mc-popper>
  
  <mc-popper id="left-popper" placement="left" distance="4">
    <mc-button tone="neutral">
      <template #prefix-icon>
        <Icon icon="ph:arrow-left" />
      </template>
      Left Popper
    </mc-button>
    <template #content>
      <div class="mc-p-3 mc-bg-white mc-shadow-lg mc-rounded-lg mc-flex mc-items-center mc-gap-2">
        <Icon icon="ph:bell" class="mc-text-gray-500 mc-w-5 mc-h-5" />
        <span>Left positioned content</span>
      </div>
    </template>
  </mc-popper>
</div>

```vue
<template>
  <mc-popper id="top-popper" placement="top">
    <mc-button tone="information">
      <template #prefix-icon>
        <Icon icon="ph:arrow-up" />
      </template>
      Top Popper
    </mc-button>
    <template #content>
      <div class="mc-bg-white mc-flex mc-items-center mc-gap-2 mc-rounded-lg mc-p-3 mc-shadow-lg">
        <Icon icon="ph:info" class="mc-h-5 mc-w-5 mc-text-blue-500" />
        <span>Top positioned content</span>
      </div>
    </template>
  </mc-popper>

  <!-- Similar for right, bottom, and left -->
</template>

<script setup>
import { Icon } from '@iconify/vue';
</script>
```

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
      <td>id</td>
      <td>Unique identifier for the popper container. Required for proper functionality.</td>
      <td>string</td>
      <td>-</td>
    </tr>
    <tr>
      <td>placement</td>
      <td>Determines the position of the popper relative to its reference element. Supports: 'auto', 'auto-start', 'auto-end', 'top', 'top-start', 'top-end', 'right', 'right-start', 'right-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end'</td>
      <td>string</td>
      <td>'bottom'</td>
    </tr>
    <tr>
      <td>triggers</td>
      <td>Array of events that will trigger the popper to show. Common values include:
        <ul>
          <li><code>click</code>: Shows on click</li>
          <li><code>hover</code>: Shows on mouse enter</li>
          <li><code>focus</code>: Shows on focus</li>
          <li><code>touch</code>: Shows on touch events</li>
        </ul>
        Empty array means manual control through v-model.
      </td>
      <td>string[]</td>
      <td>['click']</td>
    </tr>
    <tr>
      <td>popper-hide-triggers</td>
      <td>Array of events that will trigger the popper to hide. Uses the same values as triggers. Empty array means manual control.</td>
      <td>string[]</td>
      <td>['click']</td>
    </tr>
    <tr>
      <td>auto-hide</td>
      <td>When true, the popper will automatically hide when clicking outside of it.</td>
      <td>boolean</td>
      <td>true</td>
    </tr>
    <tr>
      <td>delay</td>
      <td>Delay in milliseconds before showing/hiding the popper. Useful for hover interactions.</td>
      <td>number</td>
      <td>0</td>
    </tr>
    <tr>
      <td>distance</td>
      <td>Distance in pixels between the popper and its reference element.</td>
      <td>number | string</td>
      <td>"4"</td>
    </tr>
  </tbody>
</table>

### Slots

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>default</td>
      <td>The trigger element that will show/hide the popper content when clicked.</td>
    </tr>
    <tr>
      <td>content</td>
      <td>The content to be displayed in the popper when triggered.</td>
    </tr>
  </tbody>
</table>

<script lang="ts" setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import McPopper from "@/components/popper/popper.vue";
import McButton from "@/components/button/button.vue";
</script>
