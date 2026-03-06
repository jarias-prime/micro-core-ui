---
title: Button
descripttion: The Button component is a versatile and commonly used element in user interfaces, designed to trigger actions or events when clicked. It can be customized in various ways, including size, tone, and variant, to suit different design needs. The button can also include icons for enhanced visual communication and can be disabled to prevent user interaction when necessary.
outline: deep
---

# Button

The Button component is a versatile and commonly used element in user interfaces, designed to trigger actions or events when clicked. It can be customized in various ways, including size, tone, and variant, to suit different design needs. The button can also include icons for enhanced visual communication and can be disabled to prevent user interaction when necessary.

## Basic Usage

<div class="mc-flex mc-items-center mc-gap-2">
  <mc-button>Buttons</mc-button>
</div>

```vue
<mc-button>Button</mc-button>
```

## Tone

<div class="mc-flex mc-items-center mc-gap-2">
  <mc-button data-testid="button-tone-neutral">Neutral</mc-button>
  <mc-button data-testid="button-tone-success" tone="success">Success</mc-button>
  <mc-button data-testid="button-tone-danger" tone="danger">Danger</mc-button>
</div>

```vue
<mc-button>Neutral/Default</mc-button>
<mc-button tone="success">Success</mc-button>
<mc-button tone="danger">Danger</mc-button>
```

## Sizes

<div class="mc-flex mc-items-center mc-gap-2">
  <mc-button size="small" data-testid="button-size-small">Small</mc-button>
  <mc-button data-testid="button-size-medium">Medium</mc-button>
  <mc-button size="large" data-testid="button-size-large">Large</mc-button>
</div>

```vue
<mc-button size="small">Small</mc-button>
<mc-button>Medium/Default</mc-button>
<mc-button size="large">Large</mc-button>
```

## Variant

<div class="mc-flex mc-items-center mc-gap-2 mc-mb-2">
  <mc-button data-testid="button-tone-neutral-variant-primary">Primary</mc-button>
  <mc-button variant="secondary" data-testid="button-tone-neutral-variant-secondary">Secondary</mc-button>
  <mc-button variant="tertiary" data-testid="button-tone-neutral-variant-tertiary">Tertiary</mc-button>
</div>
<div class="mc-flex mc-items-center mc-gap-2 mc-mb-2">
  <mc-button tone="success" data-testid="button-tone-success-variant-primary">Primary</mc-button>
  <mc-button tone="success" variant="secondary" data-testid="button-tone-success-variant-secondary">Secondary</mc-button>
  <mc-button tone="success" variant="tertiary" data-testid="button-tone-success-variant-tertiary">Tertiary</mc-button>
</div>
<div class="mc-flex mc-items-center mc-gap-2">
  <mc-button tone="danger" data-testid="button-tone-danger-variant-primary">Primary</mc-button>
  <mc-button tone="danger" variant="secondary" data-testid="button-tone-danger-variant-secondary">Secondary</mc-button>
  <mc-button tone="danger" variant="tertiary" data-testid="button-tone-danger-variant-tertiary">Tertiary</mc-button>
</div>

```vue
// Primary/Default
<mc-button>Primary/Default</mc-button>
<mc-button variant="secondary">Secondary</mc-button>
<mc-button variant="tertiary">Tertiary</mc-button>

// Succees
<mc-button tone="success">Primary/Default</mc-button>
<mc-button tone="success" variant="secondary">Secondary</mc-button>
<mc-button tone="success" variant="tertiary">Tertiary</mc-button>

// Danger
<mc-button tone="danger">Primary/Default</mc-button>
<mc-button tone="danger" variant="secondary">Secondary</mc-button>
<mc-button tone="danger" variant="tertiary">Tertiary</mc-button>
```

## Disabled

<div class="mc-flex mc-items-center mc-gap-2 mc-mb-2">
  <mc-button size="small" disabled>Primary</mc-button>
  <mc-button size="small" variant="secondary" disabled>Secondary</mc-button>
  <mc-button size="small" variant="tertiary" disabled>Tertiary</mc-button>
</div>
<div class="mc-flex mc-items-center mc-gap-2 mc-mb-2">
  <mc-button  disabled>Primary</mc-button>
  <mc-button variant="secondary" disabled>Secondary</mc-button>
  <mc-button variant="tertiary" disabled>Tertiary</mc-button>
</div>
<div class="mc-flex mc-items-center mc-gap-2">
  <mc-button size="large" disabled>Primary</mc-button>
  <mc-button size="large" variant="secondary" disabled>Secondary</mc-button>
  <mc-button size="large" variant="tertiary" disabled>Tertiary</mc-button>
</div>

```vue
<mc-button disabled ize="small">Small</mc-button>
<mc-button disabled>Medium/Default</mc-button>
<mc-button disabled size="large">Large</mc-button>
```

## Icon

### Icon With Text

<div class="mc-mt-4">
  <div class="mc-flex mc-items-center mc-gap-2 mc-mb-2">
    <mc-button size="small" hasIcon >
      <Icon icon="ph:trash" />
      <span>Button</span>
    </mc-button>
    <mc-button variant="secondary" hasIcon>
      <Icon icon="ph:trash" />
      <span>Button</span>
    </mc-button>
    <mc-button size="large" variant="tertiary" hasIcon>
      <Icon icon="ph:trash" />
      <span>Button</span>
    </mc-button>
  </div>

  <div class="mc-flex mc-items-center mc-gap-2 mc-mb-2">
    <mc-button size="small" tone="success" hasIcon>
      <Icon icon="ph:trash" />
      <span>Button</span>
    </mc-button>
    <mc-button tone="success" variant="secondary" hasIcon>
      <Icon icon="ph:trash" />
      <span>Button</span>
    </mc-button>
    <mc-button size="large" tone="success"variant="tertiary" hasIcon>
      <Icon icon="ph:trash" />
      <span>Button</span>
    </mc-button>
  </div>

  <div class="mc-flex mc-items-center mc-gap-2 mc-mb-2">
    <mc-button size="small" tone="danger" hasIcon>
      <Icon icon="ph:trash" />
      <span>Button</span>
    </mc-button>
    <mc-button tone="danger" variant="secondary" hasIcon>
      <Icon icon="ph:trash" />
      <span>Button</span>
    </mc-button>
    <mc-button size="large" tone="danger" variant="tertiary" hasIcon>
      <Icon icon="ph:trash" />
      <span>Button</span>
    </mc-button>
  </div>

  <div class="mc-flex mc-items-center mc-gap-2 mc-mb-2">
    <mc-button size="small" tone="danger" hasIcon disabled>
      <Icon icon="ph:trash" />
      <span>Button</span>
    </mc-button>
    <mc-button tone="danger" variant="secondary" hasIcon disabled>
      <Icon icon="ph:trash" />
      <span>Button</span>
    </mc-button>
    <mc-button size="large" tone="danger" variant="tertiary" hasIcon disabled>
      <Icon icon="ph:trash" />
      <span>Button</span>
    </mc-button>
  </div>
</div>

### Icon Only

<div class="mc-mt-4">
  <div class="mc-flex mc-items-center mc-gap-2 mc-mb-2">
    <mc-button size="small" hasIcon>
      <Icon icon="ph:trash" />
    </mc-button>
    <mc-button variant="secondary" hasIcon>
      <Icon icon="ph:trash" />
    </mc-button>
    <mc-button size="large" variant="tertiary" hasIcon>
      <Icon icon="ph:trash" />
    </mc-button>
  </div>

  <div class="mc-flex mc-items-center mc-gap-2 mc-mb-2">
    <mc-button size="small" tone="success" hasIcon>
      <Icon icon="ph:trash" />
    </mc-button>
    <mc-button tone="success"  variant="secondary" hasIcon>
      <Icon icon="ph:trash" />
    </mc-button>
    <mc-button size="large" tone="success"variant="tertiary" hasIcon>
      <Icon icon="ph:trash" />
    </mc-button>
  </div>

  <div class="mc-flex mc-items-center mc-gap-2 mc-mb-2">
    <mc-button size="small" tone="danger" hasIcon>
      <Icon icon="ph:trash" />
    </mc-button>
    <mc-button tone="danger" variant="secondary" hasIcon>
      <Icon icon="ph:trash" />
    </mc-button>
    <mc-button size="large" tone="danger" variant="tertiary" hasIcon>
      <Icon icon="ph:trash" />
    </mc-button>
  </div>

  <div class="mc-flex mc-items-center mc-gap-2 mc-mb-2">
    <mc-button size="small" tone="danger" hasIcon disabled>
      <Icon icon="ph:trash" />
    </mc-button>
    <mc-button tone="danger" variant="secondary" hasIcon disabled>
      <Icon icon="ph:trash" />
    </mc-button>
    <mc-button size="large" tone="danger" variant="tertiary" hasIcon disabled>
      <Icon icon="ph:trash" />
    </mc-button>
  </div>
</div>

```vue
<template>
  <mc-button hasIcon>
    <Icon icon="ph:trash" />
    <span>Button</span>
  </mc-button>

  <mc-button iconOnly>
    <Icon icon="ph:trash" />
    <span>Button</span>
  </mc-button>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';
</script>
```

## Fullwidth

<div class="mc-space-y-2">
<mc-button fullwidth>Buttons</mc-button>
<mc-button fullwidth variant="secondary">Buttons</mc-button>
<mc-button fullwidth variant="tertiary">Buttons</mc-button>
</div>

```vue
<mc-button fullwidth>Button</mc-button>
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
      <td>tone</td>
      <td>Controls the button's color theme. Use <code>neutral</code> for standard actions, <code>success</code> for positive actions, and <code>danger</code> for destructive actions.</td>
      <td>'neutral' | 'success' | 'danger'</td>
      <td>'neutral'</td>
    </tr>
    <tr>
      <td>size</td>
      <td>Defines the button's size, affecting padding, font size, and overall dimensions.</td>
      <td>'small' | 'medium' | 'large'</td>
      <td>'medium'</td>
    </tr>
    <tr>
      <td>variant</td>
      <td>Controls the button's visual style. <code>primary</code> provides the strongest emphasis, <code>secondary</code> has medium emphasis with an outline, and <code>tertiary</code> offers the subtlest styling.</td>
      <td>'primary' | 'secondary' | 'tertiary'</td>
      <td>'primary'</td>
    </tr>
    <tr>
      <td>type</td>
      <td>Specifies the native HTML button type attribute.</td>
      <td>'button' | 'submit' | 'reset'</td>
      <td>'button'</td>
    </tr>
    <tr>
      <td>state</td>
      <td>Defines the visual state of the button. Mostly used internally.</td>
      <td>'base' | 'hover' | 'pressed' | 'focus'</td>
      <td>'base'</td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>When set to <code>true</code>, prevents user interaction and applies a visual disabled state.</td>
      <td>boolean</td>
      <td>false</td>
    </tr>
    <tr>
      <td>hasIcon</td>
      <td>Indicates that the button contains an icon, which affects spacing and layout.</td>
      <td>boolean</td>
      <td>false</td>
    </tr>
    <tr>
      <td>fullwidth</td>
      <td>When set to <code>true</code>, the button will expand to fill the width of its container.</td>
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
      <td>click</td>
      <td>Emitted when the button is clicked and not disabled.</td>
      <td>(event: MouseEvent)</td>
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
      <td>Content to be displayed inside the button. This can include text, icons, or other elements.</td>
    </tr>
  </tbody>
</table>

### Accessibility

The button component follows accessibility best practices:

- Uses native `<button>` element for proper keyboard navigation and screen reader support
- Sets `aria-disabled="true"` when the button is disabled
- Preserves hover and focus states for keyboard users
- Maintains sufficient color contrast in all states and variants
- Supports autofocus when the `state` prop is set to 'focus'

<script lang="ts" setup>
import McButton from "@/components/button/button.vue";
import { Icon } from '@iconify/vue';
</script>
