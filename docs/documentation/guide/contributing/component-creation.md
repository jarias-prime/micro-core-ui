---
title: Creating Components
outline: deep
---

# Creating Components

Micro Core UI follows a **composable-first architecture** that separates concerns into three distinct files. This approach promotes reusability, testability, and maintainability by isolating template markup, type definitions, and business logic.

## Component Structure

Each component follows a consistent three-file pattern:

```
component-name/
├── component-name.vue      # Template and setup
├── component-name.ts       # Props, emits, and types
└── use-component-name.ts   # Composable logic
```

### File Responsibilities

**component-name.vue**
- Template markup
- Script setup with props/emits
- Imports composable logic

**component-name.ts**
- Prop definitions with validators
- Emit type definitions
- TypeScript types and interfaces

**use-component-name.ts**
- Component logic and state
- Computed properties
- Event handlers
- Returns reactive values and methods

## Nested Components

For components with variants or sub-components:

```
parent-component/
├── child-component/
│   ├── child-component.vue
│   ├── child-component.ts
│   └── use-child-component.ts
├── parent-component.vue
├── parent-component.ts
└── use-parent-component.ts
```

Examples: `button/button-dropdown`, `select/select-multiple`, `date-picker/date-range-picker`
