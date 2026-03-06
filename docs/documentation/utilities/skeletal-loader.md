---
title: Skeletal Loader
descripttion: The Skeletal Loader utility provides placeholder elements to indicate loading content, enhancing user experience during data fetch operations.
outline: deep
---

# Skeletal Loader

The Skeletal Loader is a utility designed to provide a placeholder for content that is being loaded. It is commonly used in user interfaces to enhance the user experience by indicating that data is being fetched, thereby reducing perceived loading times and improving user engagement.

## Basic Usage

To use the Skeletal Loader, you can include it in your HTML as follows:

<div class="mc-space-y-2">
  <div class="mc-skeletal-loader mc-h-4 mc-w-full"></div>
  <div class="mc-skeletal-loader mc-h-4 mc-w-full"></div>
  <div class="mc-skeletal-loader mc-h-4 mc-w-full"></div>
</div>

```html
<div class="mc-space-y-2">
  <div class="mc-skeletal-loader mc-h-4 mc-w-full"></div>
  <div class="mc-skeletal-loader mc-h-4 mc-w-full"></div>
  <div class="mc-skeletal-loader mc-h-4 mc-w-full"></div>
</div>
```

## Variations

### Different Sizes

You can customize the size of the Skeletal Loader by using different height and width utility classes:

<div class="mc-space-y-2">
  <!-- Small loader -->
  <div class="mc-skeletal-loader mc-h-2 mc-w-24"></div>

  <!-- Medium loader -->
  <div class="mc-skeletal-loader mc-h-4 mc-w-48"></div>

  <!-- Large loader -->
  <div class="mc-skeletal-loader mc-h-6 mc-w-full"></div>
</div>

```html
<!-- Small loader -->
<div class="mc-skeletal-loader mc-h-2 mc-w-24"></div>

<!-- Medium loader -->
<div class="mc-skeletal-loader mc-h-4 mc-w-48"></div>

<!-- Large loader -->
<div class="mc-skeletal-loader mc-h-6 mc-w-full"></div>
```

### Rounded Corners

Add rounded corners for a more polished appearance:

<div class="mc-skeletal-loader mc-h-4 mc-w-full mc-rounded-md"></div>

```html
<div class="mc-skeletal-loader mc-h-4 mc-w-full mc-rounded-md"></div>
```

### Circle Loader

Create a circular loader for profile pictures or icons:

<div class="mc-skeletal-loader mc-h-12 mc-w-12 mc-rounded-full"></div>

```html
<div class="mc-skeletal-loader mc-h-12 mc-w-12 mc-rounded-full"></div>
```

## Complex Layouts

You can combine multiple skeletal loaders to create complex loading states for cards, tables, or other UI elements:

<!-- Card loading state -->
<div class="mc-card mc-space-y-4 mc-p-4">
  <!-- Header -->
  <div class="mc-flex mc-items-center mc-space-x-3">
    <div class="mc-skeletal-loader mc-h-10 mc-w-10 mc-rounded-full"></div>
    <div class="mc-flex-1 mc-space-y-2">
      <div class="mc-skeletal-loader mc-h-3 mc-w-1/2"></div>
      <div class="mc-skeletal-loader mc-h-2 mc-w-1/4"></div>
    </div>
  </div>

  <!-- Content -->
  <div class="mc-space-y-2">
    <div class="mc-skeletal-loader mc-h-4 mc-w-full"></div>
    <div class="mc-skeletal-loader mc-h-4 mc-w-full"></div>
    <div class="mc-skeletal-loader mc-h-4 mc-w-3/4"></div>
  </div>
</div>

```html
<!-- Card loading state -->
<div class="mc-card mc-space-y-4 mc-p-4">
  <!-- Header -->
  <div class="mc-flex mc-items-center mc-space-x-3">
    <div class="mc-skeletal-loader mc-h-10 mc-w-10 mc-rounded-full"></div>
    <div class="mc-flex-1 mc-space-y-2">
      <div class="mc-skeletal-loader mc-h-3 mc-w-1/2"></div>
      <div class="mc-skeletal-loader mc-h-2 mc-w-1/4"></div>
    </div>
  </div>

  <!-- Content -->
  <div class="mc-space-y-2">
    <div class="mc-skeletal-loader mc-h-4 mc-w-full"></div>
    <div class="mc-skeletal-loader mc-h-4 mc-w-full"></div>
    <div class="mc-skeletal-loader mc-h-4 mc-w-3/4"></div>
  </div>
</div>
```
