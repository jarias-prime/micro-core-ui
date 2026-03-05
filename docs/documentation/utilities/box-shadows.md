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
      <td><code>.spr-drop-shadow-sm</code></td>
      <td>Small drop shadow for subtle depth</td>
      <td><code>spr-shadow-drop-sm</code></td>
    </tr>
    <tr>
      <td><code>.spr-drop-shadow</code></td>
      <td>Medium drop shadow for standard elevation</td>
      <td><code>spr-shadow-drop</code></td>
    </tr>
    <tr>
      <td><code>.spr-drop-shadow-md</code></td>
      <td>Large drop shadow for high elevation</td>
      <td><code>spr-shadow-drop-md</code></td>
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
      <td><code>.spr-drop-shadow-top-sm</code></td>
      <td>Small top drop shadow</td>
      <td><code>spr-shadow-drop-top-sm</code></td>
    </tr>
    <tr>
      <td><code>.spr-drop-shadow-top</code></td>
      <td>Medium top drop shadow</td>
      <td><code>spr-shadow-drop-top</code></td>
    </tr>
    <tr>
      <td><code>.spr-drop-shadow-top-md</code></td>
      <td>Large top drop shadow</td>
      <td><code>spr-shadow-drop-top-md</code></td>
    </tr>
  </tbody>
</table>

## Visual Hierarchy

Box shadows are an excellent way to establish visual hierarchy in your interface:

- **Small shadows** (`spr-drop-shadow-sm`) - For subtle elevation like cards or inputs
- **Medium shadows** (`spr-drop-shadow`) - For standard components like buttons or modals
- **Large shadows** (`spr-drop-shadow-md`) - For floating elements like dropdowns or tooltips

## Examples

```html
<!-- Basic usage -->
<div class="p-4 spr-drop-shadow">Card with medium shadow</div>

<!-- Different shadow sizes -->
<div class="p-4 mb-4 spr-drop-shadow-sm">Subtle shadow for input-like elements</div>

<div class="p-4 mb-4 spr-drop-shadow">Standard shadow for cards</div>

<div class="p-4 mb-4 spr-drop-shadow-md">Prominent shadow for floating elements</div>

<!-- Top shadows for elements anchored to bottom -->
<div class="spr-drop-shadow-top p-4">Footer with top shadow</div>

<!-- Responsive shadow usage -->
<div class="spr-drop-shadow-sm md:spr-drop-shadow">Responsive shadow that increases on larger screens</div>

<!-- Combined with other utilities -->
<div class="spr-background-color p-6 spr-rounded-border-radius-lg spr-drop-shadow">
  Card with shadow, rounded corners and background
</div>
```

## Common Use Cases

- **Cards**: Use `spr-drop-shadow` or `spr-drop-shadow-sm` for content cards
- **Modals**: Use `spr-drop-shadow-md` for modal overlays
- **Dropdowns**: Use `spr-drop-shadow-md` for dropdown menus
- **Buttons**: Use `spr-drop-shadow-sm` for subtle button elevation
- **Floating Action Buttons**: Use `spr-drop-shadow-md` for prominent floating elements
- **Navigation**: Use `spr-drop-shadow-top` for sticky footers or bottom navigation
