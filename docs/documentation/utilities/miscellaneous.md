---
title: Miscellaneous Utilities
descripttion: Additional utility classes for scrolling behavior, visual states, and component-specific styling that don't fit into other utility categories.
outline: deep
---

# Miscellaneous Utilities

Additional utility classes for scrolling behavior, visual states, and component-specific styling that don't fit into other utility categories.

## Scrollbar Utilities

### Hidden Scrollbars

<table>
  <thead>
    <tr>
      <th>Class Name</th>
      <th>Description</th>
      <th>Effect</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>.spr-hidden-scrolls</code></td>
      <td>Hides webkit scrollbars while maintaining scroll functionality</td>
      <td>Applies <code>spr-hidden</code> to <code>::-webkit-scrollbar</code></td>
    </tr>
  </tbody>
</table>

## Animation and Visual Effects

### Skeletal Loading Animation

<table>
  <thead>
    <tr>
      <th>Class Name</th>
      <th>Description</th>
      <th>CSS Properties</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>.spr-skeletal-loader</code></td>
      <td>Creates a pulsing animation with gradient background for skeleton loading states</td>
      <td>
        <code>spr-animate-pulse</code><br>
        <code>spr-border-neutral-200</code><br>
        <code>spr-bg-[linear-gradient(...)]</code>
      </td>
    </tr>
  </tbody>
</table>

## Usage Examples

### Hidden Scrollbars

Use when you want to maintain scroll functionality but hide the visual scrollbar for a cleaner appearance:

```html
<!-- Container with hidden scrollbar -->
<div class="spr-hidden-scrolls overflow-y-auto max-h-96">
  <div class="space-y-4">
    <!-- Content that exceeds container height -->
    <div class="p-4">Item 1</div>
    <div class="p-4">Item 2</div>
    <div class="p-4">Item 3</div>
    <!-- ... more items -->
  </div>
</div>

<!-- Chat or message container -->
<div class="spr-hidden-scrolls overflow-y-auto h-64 p-4">
  <div class="space-y-2">
    <div class="spr-background-color-surface p-3 rounded">Message 1</div>
    <div class="spr-background-color-surface p-3 rounded">Message 2</div>
    <!-- ... more messages -->
  </div>
</div>
```

### Skeletal Loading

Use for loading states to improve perceived performance:

```html
<!-- Basic skeleton loader -->
<div class="spr-skeletal-loader spr-h-4 spr-w-full"></div>

<!-- Card skeleton -->
<div class="spr-background-color p-6 rounded-lg space-y-4">
  <!-- Title skeleton -->
  <div class="spr-skeletal-loader spr-h-6 spr-w-3/4"></div>

  <!-- Content skeleton lines -->
  <div class="space-y-2">
    <div class="spr-skeletal-loader spr-h-4 spr-w-full"></div>
    <div class="spr-skeletal-loader spr-h-4 spr-w-full"></div>
    <div class="spr-skeletal-loader spr-h-4 spr-w-2/3"></div>
  </div>

  <!-- Button skeleton -->
  <div class="spr-skeletal-loader spr-h-10 spr-w-24 spr-rounded-border-radius-md"></div>
</div>

<!-- Profile skeleton -->
<div class="flex items-center space-x-4">
  <!-- Avatar skeleton -->
  <div class="spr-skeletal-loader rounded-full spr-h-12 spr-w-12"></div>

  <div class="space-y-2 flex-1">
    <!-- Name skeleton -->
    <div class="spr-skeletal-loader spr-h-4 spr-w-32"></div>
    <!-- Email skeleton -->
    <div class="spr-skeletal-loader spr-h-3 spr-w-48"></div>
  </div>
</div>

<!-- List skeleton -->
<div class="space-y-3">
  <div v-for="i in 5" :key="i" class="flex items-center space-x-3">
    <div class="spr-skeletal-loader rounded spr-h-8 spr-w-8"></div>
    <div class="flex-1 space-y-2">
      <div class="spr-skeletal-loader spr-h-4 spr-w-3/4"></div>
      <div class="spr-skeletal-loader spr-h-3 spr-w-1/2"></div>
    </div>
  </div>
</div>
```

## Component-Specific Usage

### Table with Hidden Scrollbars

```html
<div class="spr-table-wrapper">
  <table class="w-full">
    <thead>
      <tr>
        <th>Column 1</th>
        <th>Column 2</th>
        <th>Column 3</th>
      </tr>
    </thead>
    <tbody class="spr-hidden-scrolls">
      <!-- Table rows -->
    </tbody>
  </table>
</div>
```

### Loading State with Skeleton

```html
<!-- Before data loads -->
<div v-if="loading" class="space-y-4">
  <div class="spr-skeletal-loader spr-h-8 spr-w-64"></div>
  <div class="grid grid-cols-3 gap-4">
    <div class="spr-skeletal-loader spr-h-32"></div>
    <div class="spr-skeletal-loader spr-h-32"></div>
    <div class="spr-skeletal-loader spr-h-32"></div>
  </div>
</div>

<!-- After data loads -->
<div v-else>
  <h1 class="spr-heading-lg">Loaded Content</h1>
  <!-- Actual content -->
</div>
```

## Best Practices

### Hidden Scrollbars

- **Use sparingly**: Only hide scrollbars when the design specifically calls for it
- **Ensure accessibility**: Make sure users can still understand that content is scrollable
- **Provide visual cues**: Consider adding fade effects or scroll indicators
- **Test across devices**: Verify behavior on different operating systems and browsers

### Skeletal Loading

- **Match content structure**: Skeleton should reflect the actual content layout
- **Use appropriate timing**: Show skeletons for operations taking longer than 200ms
- **Maintain aspect ratios**: Skeleton dimensions should match expected content
- **Combine with transitions**: Use fade-in animations when loading completes

```html
<!-- Good skeleton - matches content structure -->
<div class="space-y-4">
  <div class="spr-skeletal-loader spr-h-6 spr-w-3/4"></div>
  <!-- Title -->
  <div class="spr-skeletal-loader spr-h-4 spr-w-full"></div>
  <!-- Line 1 -->
  <div class="spr-skeletal-loader spr-h-4 spr-w-5/6"></div>
  <!-- Line 2 -->
  <div class="spr-skeletal-loader spr-h-10 spr-w-32 spr-rounded-border-radius-md"></div>
  <!-- Button -->
</div>

<!-- Transition when content loads -->
<transition name="fade" mode="out-in">
  <div v-if="loading" class="skeleton-container">
    <!-- Skeleton content -->
  </div>
  <div v-else class="actual-content">
    <!-- Real content -->
  </div>
</transition>
```
