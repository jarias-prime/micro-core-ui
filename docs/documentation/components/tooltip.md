---
title: Tooltip
descripttion: The tooltip component is a simple component that displays a tooltip when hovered over.
outline: deep
---

# Tooltip

The tooltip component is a simple component that displays a tooltip when hovered over.

## Basic Usage

<div class="mc-grid mc-gap-3">
  <mc-tooltip text="This is my tooltip text">
    <mc-button tone="success">Hover me to view tooltip</mc-button>
  </mc-tooltip>
  <mc-tooltip text="This is my tooltip text">
    <mc-chips class="mc-w-full" label="Chips" />
  </mc-tooltip>
  <mc-tooltip text="This is my tooltip text">
    <mc-lozenge class="mc-w-full" label="Lozange" />
  </mc-tooltip>
  <mc-tooltip text="This is my tooltip text">
    <mc-input v-model="inputValueBasic" placeholder="Enter your text" class="mc-w-full" />
  </mc-tooltip>
</div>

```vue
<mc-tooltip text="This is my tooltip text">
    <!-- Your component here -->
</mc-tooltip>
```

## Custom Text

By adding the `text` prop to the tooltip component, you can customize the text that is displayed in the tooltip.

<div class="mc-grid mc-gap-3">
  <mc-tooltip text="This is my custom tooltip text">
    <mc-button tone="success">Hover me to view tooltip</mc-button>
  </mc-tooltip>
</div>

```vue
<mc-tooltip text="This is my custom tooltip text">
    <!-- Your component here -->
</mc-tooltip>
```

## Custom Text Using HTML

You can also use HTML to further customize the text that you wanted to displayed in the tooltip by using a template named `#popper-content`.

::: info Important to note:
If both `text` props and template `#popper-content` are used, the `text` prop will be always first displayed before the `#popper-content`.
:::

<mc-tooltip text="This is my custom tooltip text">
  <template #popper-content>
    <h5>This is a sample title</h5>
  </template>
  <mc-button tone="success">Hover me to view tooltip</mc-button>
</mc-tooltip>

```vue
<mc-tooltip text="This is my custom tooltip text">
  <template #popper-content>
    <h5>This is a sample title</h5>
  </template>

  <!-- Your component here -->
</mc-tooltip>
```

## Plaacement

<div class="mc-flex mc-flex-col mc-gap-3">
  <div class="mc-flex mc-gap-3">
    <mc-tooltip class="!mc-w-full" text="My tooltip" placement="top">
      <mc-button class="mc-w-full" tone="success">Top</mc-button>
    </mc-tooltip>
    <mc-tooltip class="!mc-w-full" text="My tooltip" placement="top-start">
      <mc-button class="mc-w-full" tone="success">Top Start</mc-button>
    </mc-tooltip>
    <mc-tooltip class="!mc-w-full" text="My tooltip" placement="top-end">
      <mc-button class="mc-w-full" tone="success">Top End</mc-button>
    </mc-tooltip>
  </div>
  <div class="mc-flex mc-gap-3">
    <mc-tooltip class="!mc-w-full" text="My tooltip" placement="bottom">
      <mc-button class="mc-w-full" tone="success">Bottom</mc-button>
    </mc-tooltip>
    <mc-tooltip class="!mc-w-full" text="My tooltip" placement="bottom-start">
      <mc-button class="mc-w-full" tone="success">Bottom Start</mc-button>
    </mc-tooltip>
    <mc-tooltip class="!mc-w-full" text="My tooltip" placement="bottom-end">
      <mc-button class="mc-w-full" tone="success">Bottom End</mc-button>
    </mc-tooltip>
  </div>
  <div class="mc-flex mc-gap-3">
    <mc-tooltip class="!mc-w-full" text="My tooltip" placement="left">
      <mc-button class="mc-w-full" tone="success">Left</mc-button>
    </mc-tooltip>
    <mc-tooltip class="!mc-w-full" text="My tooltip" placement="left-start">
      <mc-button class="mc-w-full" tone="success">Left Start</mc-button>
    </mc-tooltip>
    <mc-tooltip class="!mc-w-full" text="My tooltip" placement="left-end">
      <mc-button class="mc-w-full" tone="success">Left End</mc-button>
    </mc-tooltip>
  </div>
  <div class="mc-flex mc-gap-3">
    <mc-tooltip class="!mc-w-full" text="My tooltip" placement="right">
      <mc-button class="mc-w-full" tone="success">Right</mc-button>
    </mc-tooltip>
    <mc-tooltip class="!mc-w-full" text="My tooltip" placement="right-start">
      <mc-button class="mc-w-full" tone="success">Right Start</mc-button>
    </mc-tooltip>
    <mc-tooltip class="!mc-w-full" text="My tooltip" placement="right-end">
      <mc-button class="mc-w-full" tone="success">Right End</mc-button>
    </mc-tooltip>
  </div>
</div>

```vue
<mc-tooltip text="My tooltip" placement="top-start">
    <!-- Your component here -->
</mc-tooltip>
```

## Distance

You can set the distance of the tooltip from the target element by using the `distance` prop. The default distance is `8px`. You can set it to any value you want.

<div class="mc-flex mc-gap-3">
  <mc-tooltip text="My tooltip" :distance="16">
    <mc-button tone="success">Distance 16px</mc-button>
  </mc-tooltip>
  <mc-tooltip text="My tooltip" :distance="32">
    <mc-button tone="success">Distance 32px</mc-button>
  </mc-tooltip>
  <mc-tooltip text="My tooltip" :distance="64">
    <mc-button tone="success">Distance 64px</mc-button>
  </mc-tooltip>
</div>

```vue
<mc-tooltip text="My tooltip" :distance="16">
    <!-- Your component here -->
</mc-tooltip>
```

## Width

You can set the width of the tooltip by using the `fit-content` prop. By default, the tooltip will only take the width of its content. When the `fit-content` prop is set to false, the tooltip will take the full width of its parent container.

### Using Max-width

You can enable or disable the maximum width of the tooltip by using the `has-max-width prop`. By default, the max-width is enabled. When the `has-max-width` prop is set to true, the tooltip will have a maximum width of `280px`.

<div class="mc-grid mc-gap-3">
  <mc-tooltip placement="top">
    <template #popper-content>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia, 
        ante sit amet condimentum varius, metus enim luctus magna, ut vehicula ipsum quam vel odio.
      </p>
    </template>
    <mc-button tone="success">Has Max Width</mc-button>
  </mc-tooltip>
  <mc-tooltip placement="top" :has-max-width="false">
    <template #popper-content>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia, 
        ante sit amet condimentum varius, metus enim luctus magna, ut vehicula ipsum quam vel odio.
      </p>
    </template>
    <mc-button tone="success">Has No Max Width</mc-button>
  </mc-tooltip>
</div>

```vue
<mc-tooltip>
  <template #popper-content>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia, 
      ante sit amet condimentum varius, metus enim luctus magna, ut vehicula ipsum quam vel odio.
    </p>
  </template>

  <!-- Your component here -->
</mc-tooltip>

<mc-tooltip>
  <template #popper-content :has-max-width="false">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia, 
      ante sit amet condimentum varius, metus enim luctus magna, ut vehicula ipsum quam vel odio.
    </p>
  </template>

  <!-- Your component here -->
</mc-tooltip>
```

## Dynamic Changing Tooltip Text

You can dynamically change the tooltip text by using the `text` prop. The tooltip will automatically update when the `text` prop changes.

<div>
  <mc-tooltip 
    :text="tootltipText" 
    :fit-content="false" 
    show-triggers="hover" 
    hide-triggers="hover"
  >
    <mc-input v-model="inputValueDynamic" placeholder="Enter your text" class="mc-w-full" />
  </mc-tooltip>
</div>

```vue
<template>
  <mc-tooltip :text="tootltipText" :fit-content="false" show-triggers="hover" hide-triggers="hover">
    <mc-input v-model="inputValueDynamic" placeholder="Enter your text" class="mc-w-full" />
  </mc-tooltip>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

const inputValueDynamic = ref('');
const tootltipText = ref('This is my tooltip text');

watch(inputValueDynamic, (newValue) => {
  tootltipText.value = newValue ? newValue : '-';
});
</script>
```

## Triggers

You can customize the triggers for showing and hiding the tooltip by using the `show-triggers` and `hide-triggers` props. By default, the tooltip will show on hover and hide on mouse leave. You can set these props to any valid trigger events.

Possible trigger events include `focus`, `click`, `hover`, and `touch`. You can also combine triggers to show the tooltip on one event and hide it on another.

<div class="mc-flex mc-gap-6">
  <mc-tooltip 
    text="This tooltip shows on focus" 
    show-triggers="focus" 
    hide-triggers="focus"
  >
    <mc-button tone="success">Focus Trigger</mc-button>
  </mc-tooltip>
  <mc-tooltip 
    text="This tooltip shows on click" 
    show-triggers="click" 
    hide-triggers="click"
  >
    <mc-button tone="success">Click Trigger</mc-button>
  </mc-tooltip>
  <mc-tooltip 
    text="This tooltip shows on hover" 
    show-triggers="hover" 
    hide-triggers="hover"
  >
    <mc-button tone="success">Hover Trigger</mc-button>
  </mc-tooltip>
</div>

You can also combine triggers, for example, to show the tooltip on click and hide it on hover:

<div class="mc-flex mc-gap-3">
  <mc-tooltip 
    text="This tooltip shows on click" 
    :show-triggers="['click', 'hover']" 
    :hide-triggers="['click', 'hover']"
  >
    <mc-button tone="success">Click + Hover Trigger</mc-button>
  </mc-tooltip>
</div>

```vue
<template>
  <div class="mc-flex mc-gap-3">
    <mc-tooltip text="This tooltip shows on focus" show-triggers="focus" hide-triggers="blur">
      <mc-button tone="success">Focus Trigger</mc-button>
    </mc-tooltip>
    <mc-tooltip text="This tooltip shows on click" show-triggers="click" hide-triggers="click">
      <mc-button tone="success">Click Trigger</mc-button>
    </mc-tooltip>
    <mc-tooltip text="This tooltip shows on hover" show-triggers="hover" hide-triggers="hover">
      <mc-button tone="success">Hover Trigger</mc-button>
    </mc-tooltip>
  </div>

  <div class="mc-flex mc-gap-3">
    <mc-tooltip
      text="This tooltip shows on click"
      :show-triggers="['click', 'hover']"
      :hide-triggers="['click', 'hover']"
    >
      <mc-button tone="success">Click + Hover Trigger</mc-button>
    </mc-tooltip>
  </div>
</template>
```

## API Reference

### Props

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
      <th>Type</th>
      <th>Available Values</th>
      <th>Default</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>text</td>
      <td>The content to display inside the tooltip. This can be a simple text string or more complex content.</td>
      <td>string</td>
      <td>Any text string</td>
      <td>''</td>
    </tr>
    <tr>
      <td>placement</td>
      <td>Determines where the tooltip is positioned relative to the target element. The placement can be at the top, bottom, left, or right, with additional modifiers for start and end alignment.</td>
      <td>string</td>
      <td>'top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end'</td>
      <td>'top'</td>
    </tr>
    <tr>
      <td>distance</td>
      <td>The distance in pixels between the tooltip and the target element. Increasing this value creates more space between the tooltip and its target.</td>
      <td>number</td>
      <td>Any positive number</td>
      <td>6</td>
    </tr>
    <tr>
      <td>hasMaxWidth</td>
      <td>Controls whether the tooltip has a maximum width constraint. When enabled, the tooltip has a maximum width of 280px, which helps with long content. When disabled, the tooltip width is determined by its content.</td>
      <td>boolean</td>
      <td>true, false</td>
      <td>true</td>
    </tr>
    <tr>
      <td>fitContent</td>
      <td>Determines if the tooltip width should fit its content or take the full width of its parent container. When true, the tooltip width adjusts to fit its content. When false, the tooltip takes the full width available.</td>
      <td>boolean</td>
      <td>true, false</td>
      <td>true</td>
    </tr>
    <tr>
      <td>showTriggers</td>
      <td>Specifies the events that will trigger the tooltip to show. Can be a single event string or an array of event strings. Common triggers include hover (mouseenter), focus, click, and touch.</td>
      <td>string | string[]</td>
      <td>'hover', 'focus', 'click', 'touch', or arrays like ['hover', 'focus']</td>
      <td>'hover'</td>
    </tr>
    <tr>
      <td>hideTriggers</td>
      <td>Specifies the events that will trigger the tooltip to hide. Can be a single event string or an array of event strings. Often set to match the showTriggers for consistent behavior.</td>
      <td>string | string[]</td>
      <td>'hover', 'focus', 'click', 'touch', or arrays like ['hover', 'focus']</td>
      <td>'hover'</td>
    </tr>
    <tr>
      <td>autoHide</td>
      <td>When enabled, the tooltip will automatically hide when the cursor leaves the tooltip area. This is useful for tooltips that require interaction but should hide when no longer needed.</td>
      <td>boolean</td>
      <td>true, false</td>
      <td>false</td>
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
      <td>The content that will trigger the tooltip. This can be any component or HTML element that should display the tooltip when interacted with.</td>
    </tr>
    <tr>
      <td>popper-content</td>
      <td>Custom content to display inside the tooltip. This slot allows for more complex tooltip content beyond simple text, including HTML elements and components. If both the <code>text</code> prop and this slot are provided, the <code>text</code> prop will be displayed first, followed by this slot's content.</td>
    </tr>
  </tbody>
</table>

<script lang="ts" setup>
import { ref, watch } from "vue";

import McTooltip from "@/components/tooltip/tooltip.vue";
import McButton from "@/components/button/button.vue";
import McChips from "@/components/chips/chips.vue";
import McLozenge from "@/components/lozenge/lozenge.vue"
import McInput from "@/components/input/input.vue";

const inputValueBasic = ref("");
const inputValueDynamic = ref("");

const tootltipText = ref("This is my tooltip text");

watch(inputValueDynamic, (newValue) => {
  tootltipText.value = newValue ? newValue : '-';
});
</script>
