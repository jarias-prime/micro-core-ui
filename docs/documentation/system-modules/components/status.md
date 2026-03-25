---
title: Status
descripttion: The Status component provides a standardized way to display status indicators across the application. It ensures consistent color, iconography, and accessibility for different states such as Success, Information, Pending, Caution, and Danger.
outline: deep
---

# Status

The Status component provides a standardized way to display status indicators across the application. It ensures consistent color, iconography, and accessibility for different states such as Success, Information, Pending, Caution, and Danger.

## Basic Usage

<div class="mc-flex mc-flex-row mc-gap-2">
  <mc-status state="success" />
  <mc-status state="information" />
  <mc-status state="pending" />
  <mc-status state="caution" />
  <mc-status state="danger" />
</div>

```vue
<template>
  <mc-status state="success" />
  <mc-status state="information" />
  <mc-status state="pending" />
  <mc-status state="caution" />
  <mc-status state="danger" />
</template>
```

## Sizes

status component has 7 different sizes. You can use the `size` prop to set the size of the status. The default size is `base`. The available sizes are `2xl`, `xl`, `lg`, `base`, `sm`, `xs`, `2xs`.

<div class="mc-flex mc-flex-row mc-gap-2 mc-items-center">
  <mc-status state="success" size="2xl" />
  <mc-status state="success" size="xl" />
  <mc-status state="success" size="lg" />
  <mc-status state="success" size="base" />
  <mc-status state="success" size="sm" />
  <mc-status state="success" size="xs" />
  <mc-status state="success" size="2xs" />
</div>

<div class="mc-flex mc-flex-row mc-gap-2 mc-items-center">
  <mc-status state="information" size="2xl" />
  <mc-status state="information" size="xl" />
  <mc-status state="information" size="lg"/>
  <mc-status state="information" size="base" />
  <mc-status state="information" size="sm" />
  <mc-status state="information" size="xs" />
  <mc-status state="information" size="2xs" />
</div>

<div class="mc-flex mc-flex-row mc-gap-2 mc-items-center">
  <mc-status state="pending" size="2xl" />
  <mc-status state="pending" size="xl" />
  <mc-status state="pending" size="lg"/>
  <mc-status state="pending" size="base" />
  <mc-status state="pending" size="sm" />
  <mc-status state="pending" size="xs" />
  <mc-status state="pending" size="2xs" />
</div>

<div class="mc-flex mc-flex-row mc-gap-2 mc-items-center">
  <mc-status state="caution" size="2xl" />
  <mc-status state="caution" size="xl" />
  <mc-status state="caution" size="lg"/>
  <mc-status state="caution" size="base" />
  <mc-status state="caution" size="sm" />
  <mc-status state="caution" size="xs" />
  <mc-status state="caution" size="2xs" />
</div>

<div class="mc-flex mc-flex-row mc-gap-2 mc-items-center">
  <mc-status state="danger" size="2xl" />
  <mc-status state="danger" size="xl" />
  <mc-status state="danger" size="lg"/>
  <mc-status state="danger" size="base" />
  <mc-status state="danger" size="sm" />
  <mc-status state="danger" size="xs" />
  <mc-status state="danger" size="2xs" />
</div>

## API Reference

### Props

<table>
  <thead>
    <tr>
      <th class="mc-min-w-[180px]">Name</th>
      <th>Description</th>
      <th>Type</th>
      <th>Default</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>state</code>
      </td>
      <td>
        Defines the status state to display. Each state has a specific color and icon:
        <ul>
          <li><code>success</code>: Green check circle for successful operations</li>
          <li><code>information</code>: Blue info icon for informational messages</li>
          <li><code>pending</code>: Yellow warning icon for pending states</li>
          <li><code>caution</code>: Orange warning icon for caution states</li>
          <li><code>danger</code>: Red warning circle for error or danger states</li>
        </ul>
      </td>
      <td>'success' | 'information' | 'pending' | 'caution' | 'danger'</td>
      <td><code>'success'</code></td>
    </tr>
    <tr>
      <td>
        <code>size</code>
      </td>
      <td>
        Defines the size of the status indicator. Provides flexibility for different UI layouts and emphasis levels:
        <ul>
          <li><code>2xs</code>: 14px × 14px</li>
          <li><code>xs</code>: 16px × 16px</li>
          <li><code>sm</code>: 20px × 20px</li>
          <li><code>base</code>: 24px × 24px</li>
          <li><code>lg</code>: 32px × 32px</li>
          <li><code>xl</code>: 40px × 40px</li>
          <li><code>2xl</code>: 48px × 48px</li>
        </ul>
      </td>
      <td>'2xs' | 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl'</td>
      <td><code>'base'</code></td>
    </tr>    
  </tbody>
</table>

### Icons

<table>
  <thead>
    <tr>
      <th class="mc-min-w-[180px]">State</th>
      <th>Icon</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Success</td>
      <td><code>ph:check-circle-fill</code></td>
    </tr>
    <tr>
      <td>Information</td>
      <td><code>ph:info-fill</code></td>
    </tr>
    <tr>
      <td>Pending</td>
      <td><code>ph:warning-fill</code></td>
    </tr>
    <tr>
      <td>Caution</td>
      <td><code>ph:warning-fill</code></td>
    </tr>
    <tr>
      <td>Danger</td>
      <td><code>ph:warning-circle-fill</code></td>
    </tr>
  </tbody>
</table>

<script lang="ts" setup>
import McStatus from "@/components/status/status.vue";
</script>
