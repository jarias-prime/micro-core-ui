---
title: Badge
descripttion: The Badge component is a small visual indicator that can be used to convey information, status, or notifications. It is often used in conjunction with other UI elements to provide context or highlight important information. Badges can be customized in terms of text, color, size, and position.
outline: deep
---

# Badge

The Badge component is a small visual indicator that can be used to convey information, status, or notifications. It is often used in conjunction with other UI elements to provide context or highlight important information. Badges can be customized in terms of text, color, size, and position.

## Key Features

<ul>
  <li><strong>Text:</strong>  Badges typically contain a short piece of text or a number to convey information.
  </li>
  <li><strong>Variant:</strong>  Badges can have different color schemes to indicate various statuses, such as disabled, brand, danger, or information.
  </li>
  <li><strong>Size:</strong> Badges can come in different sizes to fit various design requirements. (e.g, "big", "small", tiny).
  </li>
    <li><strong>Positioning:</strong> Badges can be positioned relative to the element they are attached to, such as at the top-right or bottom-right corner.
  </li>
</ul>

## Basic Usage

<div class="mc-flex mc-items-center mc-gap-2 mc-p-1">
  <mc-badge variant="neutral" size="big" />
  <mc-badge variant="disabled" size="big" />
  <mc-badge variant="danger" size="big" />
  <mc-badge variant="information" size="big" />
  <mc-badge variant="brand" size="big" />
</div>

<div class="mc-flex mc-items-center mc-gap-2 mc-p-1">
  <mc-badge variant="neutral" size="small" />
  <mc-badge variant="disabled" size="small" />
  <mc-badge variant="danger" size="small" />
  <mc-badge variant="information" size="small" />
  <mc-badge variant="brand" size="small" />
</div>

<div class="mc-flex mc-items-center mc-gap-2 mc-p-1">
  <mc-badge variant="neutral" size="tiny" />
  <mc-badge variant="disabled" size="tiny" />
  <mc-badge variant="danger" size="tiny" />
  <mc-badge variant="information" size="tiny" />
  <mc-badge variant="brand" size="tiny" />
</div>

```vue
<template>
  <div>
    <mc-badge text="9" variant="neutral" size="big" />
    <mc-badge text="9" variant="disabled" size="big" />
    <mc-badge text="9" variant="danger" size="big" />
    <mc-badge text="9" variant="information" size="big" />
    <mc-badge text="9" variant="brand" size="big" />
  </div>

  <div>
    <mc-badge text="9" variant="neutral" size="small" />
    <mc-badge text="9" variant="disabled" size="small" />
    <mc-badge text="9" variant="danger" size="small" />
    <mc-badge text="9" variant="information" size="small" />
    <mc-badge text="9" variant="brand" size="small" />
  </div>

  <div>
    <mc-badge variant="neutral" size="tiny" />
    <mc-badge variant="disabled" size="tiny" />
    <mc-badge variant="danger" size="tiny" />
    <mc-badge variant="information" size="tiny" />
    <mc-badge variant="brand" size="tiny" />
  </div>
</template>
```

## Variant

used to customize the background of the badge

<div class="mc-p-1 mc-flex mc-gap-4">
  <mc-badge text="9" variant="neutral" size="big" />
  <mc-badge text="9" variant="disabled" size="big" />
  <mc-badge text="9" variant="danger" size="big" />
  <mc-badge text="9" variant="information" size="big" />
  <mc-badge text="9" variant="brand" size="big" />
</div>

```vue
<template>
  <div>
    <mc-badge text="9" variant="neutral" size="big" />
    <mc-badge text="9" variant="disabled" size="big" />
    <mc-badge text="9" variant="danger" size="big" />
    <mc-badge text="9" variant="information" size="big" />
    <mc-badge text="9" variant="brand" size="big" />
  </div>
</template>
```

## Size

<div class="mc-flex mc-gap-4">
  <mc-badge text="4" variant="information" size="tiny" />
  <mc-badge text="0" variant="information" size="small" />
  <mc-badge text="30" variant="information" size="big" />
</div>

```vue
<template>
  <div>
    <mc-badge text="4" variant="information" size="tiny" />
    <mc-badge text="0" variant="information" size="small" />
    <mc-badge text="30" variant="information" size="big" />
  </div>
</template>
```

## Position

used to display the badge in different positions (top, bottom).

<div class="mc-grid mc-gap-4">
  <div class="mc-flex mc-gap-4">
    <mc-badge text="9" variant="neutral" size="big" position="top">
      <mc-lozenge label="top" />
    </mc-badge>
    <mc-badge text="9" variant="neutral" size="small" position="top">
      <mc-lozenge label="top"/>
    </mc-badge>    
    <mc-badge text="9" variant="neutral" size="tiny" position="top">
      <mc-lozenge label="top"/>
    </mc-badge>
  </div>

  <div class="mc-flex mc-gap-4">
    <mc-badge text="9" variant="brand" size="big" position="top">
      <mc-lozenge label="top" />
    </mc-badge>
    <mc-badge text="9" variant="brand" size="small" position="top">
      <mc-lozenge label="top"/>
    </mc-badge>    
    <mc-badge text="9" variant="brand" size="tiny" position="top">
      <mc-lozenge label="top"/>
    </mc-badge>
  </div>

  <div class="mc-flex mc-gap-4">
    <mc-badge text="9" variant="information" size="big" position="bottom">
      <mc-lozenge label="bottom"/>
    </mc-badge>
    <mc-badge text="9" variant="information" size="small" position="bottom">
      <mc-lozenge label="bottom"/>
    </mc-badge>    
    <mc-badge text="9" variant="information" size="tiny" position="bottom">
      <mc-lozenge label="bottom"/>
    </mc-badge>
  </div>

  <div class="mc-flex mc-gap-4">
    <mc-badge text="9" variant="danger" size="big" >
      <mc-lozenge label="default"/>
    </mc-badge>
    <mc-badge text="9" variant="danger" size="small">
      <mc-lozenge label="default"/>
    </mc-badge>    
    <mc-badge text="9" variant="danger" size="tiny">
      <mc-lozenge label="default"/>
    </mc-badge>
  </div>
</div>

```vue
<template>
  <div>
    <mc-badge text="9" variant="neutral" size="big" position="top">
      <mc-lozenge label="top" />
    </mc-badge>
    <mc-badge text="9" variant="neutral" size="small" position="top">
      <mc-lozenge label="top" />
    </mc-badge>
    <mc-badge text="9" variant="neutral" size="tiny" position="top">
      <mc-lozenge label="top" />
    </mc-badge>
  </div>

  <div>
    <mc-badge text="9" variant="brand" size="big" position="top">
      <mc-lozenge label="top" />
    </mc-badge>
    <mc-badge text="9" variant="brand" size="small" position="top">
      <mc-lozenge label="top" />
    </mc-badge>
    <mc-badge text="9" variant="brand" size="tiny" position="top">
      <mc-lozenge label="top" />
    </mc-badge>
  </div>

  <div>
    <mc-badge text="9" variant="information" size="big" position="bottom">
      <mc-lozenge label="bottom" />
    </mc-badge>
    <mc-badge text="9" variant="information" size="small" position="bottom">
      <mc-lozenge label="bottom" />
    </mc-badge>
    <mc-badge text="9" variant="information" size="tiny" position="bottom">
      <mc-lozenge label="bottom" />
    </mc-badge>
  </div>

  <div>
    <mc-badge text="9" variant="danger" size="big">
      <mc-lozenge label="default" />
    </mc-badge>
    <mc-badge text="9" variant="danger" size="small">
      <mc-lozenge label="default" />
    </mc-badge>
    <mc-badge text="9" variant="danger" size="tiny">
      <mc-lozenge label="default" />
    </mc-badge>
  </div>
</template>
```

### Default position using slot

When using the default position, use can use the slot to wrap the element to which you want to attach the badge.

<div class="mc-flex mc-gap-4">
  <mc-badge text="9" variant="brand" size="big" position="top">
    <mc-lozenge label="top"/>
  </mc-badge>
  <mc-badge text="9" variant="brand" size="small" position="top">
    <mc-lozenge label="top"/>
  </mc-badge>
  <mc-badge text="9" variant="brand" size="tiny" position="top">
    <mc-lozenge label="top"/>
  </mc-badge>
</div>

```vue
<template>
  <div>
    <mc-badge text="9" variant="brand" size="big" position="top">
      <mc-lozenge label="top" />
    </mc-badge>
    <mc-badge text="9" variant="brand" size="small" position="top">
      <mc-lozenge label="top" />
    </mc-badge>
    <mc-badge text="9" variant="brand" size="tiny" position="top">
      <mc-lozenge label="top" />
    </mc-badge>
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
      <th>Default</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>text</td>
      <td>
        The content displayed inside the badge. Typically a short text or number representing a count, notification, or status indicator. Note that when the size is set to <code>tiny</code>, the text will not be displayed.
      </td>
      <td>string</td>
      <td>'0'</td>
    </tr>
    <tr>
      <td>variant</td>
      <td>
        Determines the color scheme and visual style of the badge to indicate various statuses:
        <ul>
          <li><code>brand</code>: Primary brand color, used for standard notifications</li>
          <li><code>information</code>: Blue color, used for informational notifications</li>
          <li><code>danger</code>: Red color, used for critical or error notifications</li>
          <li><code>disabled</code>: Gray color, used for inactive or disabled states</li>
        </ul>
      </td>
      <td>'brand' | 'information' | 'danger' | 'disabled'</td>
      <td>'brand'</td>
    </tr>
    <tr>
      <td>size</td>
      <td>
        Controls the size of the badge:
        <ul>
          <li><code>big</code>: Largest size (20px height, 20px min-width), best for important notifications or when using longer text</li>
          <li><code>small</code>: Medium size (16px height, 16px min-width), suitable for most use cases</li>
          <li><code>tiny</code>: Smallest size (10px height, 10px min-width), used as a simple indicator dot without text</li>
        </ul>
      </td>
      <td>'big' | 'small' | 'tiny'</td>
      <td>'small'</td>
    </tr>
    <tr>
      <td>position</td>
      <td>
        Determines the position of the badge relative to its container or slotted content:
        <ul>
          <li><code>top</code>: Positions the badge at the top-right corner of the parent element</li>
          <li><code>bottom</code>: Positions the badge at the bottom-right corner of the parent element</li>
          <li><code>default</code>: Displays the badge as a standalone element</li>
        </ul>
        When using <code>top</code> or <code>bottom</code> position, you should use the default slot to wrap the element that the badge will be attached to.
      </td>
      <td>'top' | 'bottom' | 'default'</td>
      <td>'default'</td>
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
      <td>
        Content to which the badge will be attached. This is required when using the <code>top</code> or <code>bottom</code> position. The badge will be positioned relative to this content. If no slot content is provided, the badge will be displayed as a standalone element.
      </td>
    </tr>
  </tbody>
</table>

<script lang="ts" setup>
import { ref } from 'vue';

import McBadge from "@/components/badge/badge.vue"
import McLozenge from '@/components/lozenge/lozenge.vue';
</script>
