---
title: Component Documentation
outline: deep
---

# Documenting a Component

Component documentation follows a consistent structure to ensure clarity and usability. Each component doc should include usage examples, visual demonstrations, and a complete API reference.

## Documentation Structure

### 1. Frontmatter

```md
---
title: Component Name
description: Brief description of the component's purpose and capabilities
outline: deep
---
```

### 2. Overview

Start with a heading and detailed description:

```md
# Component Name

Detailed explanation of what the component does, its use cases, and key features.
```

### 3. Basic Usage

Show the simplest implementation:

````md
## Basic Usage

<mc-component-name />

```vue
<mc-component-name />
```
````

### 4. Feature Sections

Document each prop/feature with:

- Visual example using the actual component
- Code snippet showing implementation

````md
## Size

<div class="mc-flex mc-gap-2">
  <mc-button size="small">Small</mc-button>
  <mc-button>Medium</mc-button>
  <mc-button size="large">Large</mc-button>
</div>

```vue
<mc-button size="small">Small</mc-button>
<mc-button>Medium</mc-button>
<mc-button size="large">Large</mc-button>
```
````

### 5. API Reference

Provide complete tables for Props, Events, and Slots:

```md
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
      <td>propName</td>
      <td>Detailed description with usage notes</td>
      <td>'option1' | 'option2'</td>
      <td>'option1'</td>
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
      <td>eventName</td>
      <td>When this event is emitted</td>
      <td>(param: Type)</td>
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
      <td>Content to be displayed inside the component</td>
    </tr>
  </tbody>
</table>
```

## Best Practices

- Use live component examples with Tailwind utility classes for layout
- Show all variants and states visually
- Include code snippets that match the visual examples
- Provide detailed prop descriptions with use cases
- Document accessibility features when applicable
- Use consistent naming: `mc-component-name` format
