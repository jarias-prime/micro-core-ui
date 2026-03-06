---
title: Box Shadows
descripttion: These utility classes provide consistent drop shadow effects for elements. Use them to add depth and visual hierarchy to your UI components.
outline: deep
---

# Box Shadows

These utility classes provide consistent drop shadow effects for elements. Use them to add depth and visual hierarchy to your UI components.

## Usage

### Drop Shadows

<table>
  <thead>
    <tr>
      <th>Class Name</th>
      <th>Description</th>
      <th>Underlying Class</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>.mc-drop-shadow-sm</code></td>
      <td>Small drop shadow for subtle depth</td>
      <td><code>mc-shadow-drop-sm</code></td>
    </tr>
    <tr>
      <td><code>.mc-drop-shadow</code></td>
      <td>Medium drop shadow for standard elevation</td>
      <td><code>mc-shadow-drop</code></td>
    </tr>
    <tr>
      <td><code>.mc-drop-shadow-md</code></td>
      <td>Large drop shadow for high elevation</td>
      <td><code>mc-shadow-drop-md</code></td>
    </tr>
  </tbody>
</table>

### Top Drop Shadows

<table>
  <thead>
    <tr>
      <th>Class Name</th>
      <th>Description</th>
      <th>Underlying Class</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>.mc-drop-shadow-top-sm</code></td>
      <td>Small top drop shadow</td>
      <td><code>mc-shadow-drop-top-sm</code></td>
    </tr>
    <tr>
      <td><code>.mc-drop-shadow-top</code></td>
      <td>Medium top drop shadow</td>
      <td><code>mc-shadow-drop-top</code></td>
    </tr>
    <tr>
      <td><code>.mc-drop-shadow-top-md</code></td>
      <td>Large top drop shadow</td>
      <td><code>mc-shadow-drop-top-md</code></td>
    </tr>
  </tbody>
</table>

## Visual Hierarchy

Box shadows are an excellent way to establish visual hierarchy in your interface:

- **Small shadows** (`mc-drop-shadow-sm`) - For subtle elevation like cards or inputs
- **Medium shadows** (`mc-drop-shadow`) - For standard components like buttons or modals
- **Large shadows** (`mc-drop-shadow-md`) - For floating elements like dropdowns or tooltips

## Examples

```html
<!-- Basic usage -->
<div class="p-4 mc-drop-shadow">Card with medium shadow</div>

<!-- Different shadow sizes -->
<div class="p-4 mb-4 mc-drop-shadow-sm">Subtle shadow for input-like elements</div>

<div class="p-4 mb-4 mc-drop-shadow">Standard shadow for cards</div>

<div class="p-4 mb-4 mc-drop-shadow-md">Prominent shadow for floating elements</div>

<!-- Top shadows for elements anchored to bottom -->
<div class="mc-drop-shadow-top p-4">Footer with top shadow</div>

<!-- Responsive shadow usage -->
<div class="mc-drop-shadow-sm md:mc-drop-shadow">Responsive shadow that increases on larger screens</div>

<!-- Combined with other utilities -->
<div class="mc-background-color p-6 mc-rounded-border-radius-lg mc-drop-shadow">
  Card with shadow, rounded corners and background
</div>
```

## Common Use Cases

- **Cards**: Use `mc-drop-shadow` or `mc-drop-shadow-sm` for content cards
- **Modals**: Use `mc-drop-shadow-md` for modal overlays
- **Dropdowns**: Use `mc-drop-shadow-md` for dropdown menus
- **Buttons**: Use `mc-drop-shadow-sm` for subtle button elevation
- **Floating Action Buttons**: Use `mc-drop-shadow-md` for prominent floating elements
- **Navigation**: Use `mc-drop-shadow-top` for sticky footers or bottom navigation
