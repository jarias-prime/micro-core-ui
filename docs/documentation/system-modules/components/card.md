---
title: Card
descripttion: A flexible container with optional header, content, and footer used to group related information.
outline: deep
---

# Card

A flexible container with optional header, content, and footer used to group related information.

## Basic Usage

<mc-card>
  <template #content>
    <div>
      Card content
    </div>
    <div>
      Lorem ipsectetur adipiscing elit. Sed etiam, sed etiam.
      <br/>
      Lorem ipsectetur adipiscing elit. Sed etiam, sed etiam.
      <br/>
    </div>
  </template>
</mc-card>

```vue
<template>
  <mc-card>
    <template #content>
      <div>Card content</div>
      <div>Lorem ipsectetur adipiscing elit. Sed etiam, sed etiam.</div>
    </template>
  </mc-card>
</template>
```

## Tone

Cards support different tones to indicate various states or importance levels. The available tones are: `plain`, `neutral`, `success`, `information`, `pending`, `caution`, `accent`, and `danger`.

<div class="mc-grid mc-gap-2">
  <div class="mc-flex mc-gap-2 mc-justify-between">
    <mc-card class="mc-w-full" tone="plain">
      <template #content>
        <div class="mc-text-center">
          Plain
        </div>
      </template>
    </mc-card>
    <mc-card class="mc-w-full" tone="neutral">
      <template #content>
        <div class="mc-text-center">
          Neutral
        </div>
      </template>
    </mc-card>
    <mc-card class="mc-w-full" tone="success">
      <template #content>
        <div class="mc-text-center">
          Success
        </div>
      </template>
    </mc-card>
    <mc-card class="mc-w-full" tone="information">
      <template #content>
        <div class="mc-text-center">
          Information
        </div>
      </template>
    </mc-card>
  </div>
  <div class="mc-flex mc-gap-2 mc-justify-between">
    <mc-card class="mc-w-full" tone="pending">
      <template #content>
        <div class="mc-text-center">
          Pending
        </div>
      </template>
    </mc-card>
    <mc-card class="mc-w-full" tone="caution">
      <template #content>
        <div class="mc-text-center">
          Caution
        </div>
      </template>
    </mc-card>
    <mc-card class="mc-w-full" tone="accent">
      <template #content>
        <div class="mc-text-center">
          Accent
        </div>
      </template>
    </mc-card>
    <mc-card class="mc-w-full" tone="danger">
      <template #content>
        <div class="mc-text-center">
          Danger
        </div>
      </template>
    </mc-card>
  </div>
</div>

## Header and Footer

Passing a `title` automatically displays the header. Use the `footer` slot to add a footer.

<mc-card title="Card Title">
  <template #content>
    <div>
      Card content
    </div>
    <div>
      Lorem ipsectetur adipiscing elit. Sed etiam, sed etiam.
    </div>
    <div>
      Lorem ipsectetur adipiscing elit. Sed etiam, sed etiam.
    </div>
  </template>
  <template #footer>
    <div class="mc-flex mc-items-center mc-ms-auto mc-gap-size-spacing-3xs"> 
      <mc-button variant="secondary">secondary</mc-button>
      <mc-button tone="success">primary</mc-button>
    </div>
  </template>
</mc-card>

```vue
<template>
  <mc-card title="Card Title">
    <template #content>
      <div>Card content</div>
      <div>Lorem ipsectetur adipiscing elit. Sed etiam, sed etiam.</div>
      <div>Lorem ipsectetur adipiscing elit. Sed etiam, sed etiam.</div>
    </template>
    <template #footer>
      <div class="mc-ms-auto mc-flex mc-items-center mc-gap-size-spacing-3xs">
        <mc-button variant="secondary">secondary</mc-button>
        <mc-button tone="success">primary</mc-button>
      </div>
    </template>
  </mc-card>
</template>
```

## Force Hide Header and Footer

Pass `show-header` and `show-footer` props as `false` to hide the header and footer even if content is provided.

<mc-card title="Card Title" :show-header="false" :show-footer="false">
  <template #content>
    <div>
      Card content
    </div>
    <div>
      Lorem ipsectetur adipiscing elit. Sed etiam, sed etiam.
    </div>
    <div>
      Lorem ipsectetur adipiscing elit. Sed etiam, sed etiam.
    </div>
  </template>
  <template #footer>
    <div class="mc-flex mc-items-center mc-ms-auto mc-gap-size-spacing-3xs"> 
      <mc-button variant="secondary">secondary</mc-button>
      <mc-button tone="success">primary</mc-button>
    </div>
  </template>
</mc-card>

```vue
<template>
  <mc-card title="Card Title" :show-header="false" :show-footer="false">
    <template #content>
      <div>Card content</div>
      <div>Lorem ipsectetur adipiscing elit. Sed etiam, sed etiam.</div>
      <div>Lorem ipsectetur adipiscing elit. Sed etiam, sed etiam.</div>
    </template>
    <template #footer>
      <div class="mc-ms-auto mc-flex mc-items-center mc-gap-size-spacing-3xs">
        <mc-button variant="secondary">secondary</mc-button>
        <mc-button tone="success">primary</mc-button>
      </div>
    </template>
  </mc-card>
</template>
```

## Icon

Pass a `header-icon` prop to display an icon in the header. The `title` prop is required for the icon to be visible.

<mc-card title="Card Title" header-icon="ph:check-circle-duotone">
  <template #content>
    <div>
      Card content
    </div>
    <div>
      Lorem ipsectetur adipiscing elit. Sed etiam, sed etiam.
    </div>
  </template>
  <template #footer>
    <div class="mc-flex mc-items-center mc-ms-auto mc-gap-size-spacing-3xs"> 
      <mc-button variant="secondary">secondary</mc-button>
      <mc-button tone="success">primary</mc-button>
    </div>
  </template>
</mc-card>

```vue
<template>
  <mc-card title="Card Title" header-icon="ph:check-circle-duotone">
    <template #content>
      <div>Card content</div>
      <div>Lorem ipsectetur adipiscing elit. Sed etiam, sed etiam.</div>
    </template>
    <template #footer>
      <div class="mc-ms-auto mc-flex mc-items-center mc-gap-size-spacing-3xs">
        <mc-button variant="secondary">secondary</mc-button>
        <mc-button tone="success">primary</mc-button>
      </div>
    </template>
  </mc-card>
</template>
```

## Subtitle

Pass a `subtitle` prop to display a subtitle below the title. The `title` prop is required.

<mc-card title="Card Title" subtitle="This is a subtitle example" header-icon="ph:check-circle-duotone">
  <template #content>
    <div>
      Card content
    </div>  
    <div>
      Lorem ipsectetur adipiscing elit. Sed etiam, sed etiam.
    </div>
  </template>
  <template #footer>
    <div class="mc-flex mc-items-center mc-ms-auto mc-gap-size-spacing-3xs"> 
      <mc-button variant="secondary">secondary</mc-button>
      <mc-button tone="success">primary</mc-button>
    </div>
  </template>
</mc-card>

```vue
<template>
  <mc-card title="Card Title" subtitle="This is a subtitle example" header-icon="ph:check-circle-duotone">
    <template #content>
      <div>Card content</div>
      <div>Lorem ipsectetur adipiscing elit. Sed etiam, sed etiam.</div>
    </template>
    <template #footer>
      <div class="mc-ms-auto mc-flex mc-items-center mc-gap-size-spacing-3xs">
        <mc-button variant="secondary">secondary</mc-button>
        <mc-button tone="success">primary</mc-button>
      </div>
    </template>
  </mc-card>
</template>
```

## Custom Header

Use the `header` slot to add a content to the header. It will be placed next to the title.

<mc-card title="Card Title" header-icon="ph:newspaper-duotone">
  <template #header>
    <div class="mc-flex mc-items-center mc-justify-between mc-grow">
      <mc-badge text="9" variant="danger" size="small"/>
      <mc-button variant="secondary" size="small">Secondary</mc-button>
    </div>
  </template>
  <template #content>
    <div>
      Card content
    </div>
    <div>
      Lorem ipsectetur adipiscing elit. Sed etiam, sed etiam.
    </div>
  </template>
</mc-card>

```vue
<template>
  <mc-card title="Card Title" header-icon="ph:newspaper-duotone">
    <template #header>
      <div class="mc-flex mc-grow mc-items-center mc-justify-between">
        <mc-badge text="9" variant="danger" size="small" />
        <mc-button variant="secondary" size="small">Secondary</mc-button>
      </div>
    </template>
    <template #content>
      <div>Card content</div>
      <div>Lorem ipsectetur adipiscing elit. Sed etiam, sed etiam.</div>
    </template>
  </mc-card>
</template>
```

If the `title` prop is omitted, the `header` slot can fully customize the header.

<mc-card>
  <template #header>
    <div>
      <img src="@/assets/images/banner-sample.svg" class="mc-w-full mc-h-[18px] mc-object-cover mc-rounded-t-border-radius-xl mc-pointer-events-none" />
    </div>
  </template>
  <template #content>
    <div>
      Card content
    </div>
    <div>
      Lorem ipsectetur adipiscing elit. Sed etiam, sed etiam.
    </div>
  </template>
</mc-card>

```vue
<template>
  <mc-card>
    <template #header>
      <div>
        <img
          src="@/assets/images/banner-sample.svg"
          class="mc-pointer-events-none mc-h-[18px] mc-w-full mc-rounded-t-border-radius-xl mc-object-cover"
        />
      </div>
    </template>
    <template #content>
      <div>Card content</div>
      <div>Lorem ipsectetur adipiscing elit. Sed etiam, sed etiam.</div>
    </template>
  </mc-card>
</template>
```

## Border Width

Pass a `border-width` prop to customize the border width of the card. Accepts any valid CSS width value.

<mc-card title="Card Title" border-width="6px">
  <template #content>
    <div>Card content</div>
    <div>Lorem ipsectetur adipiscing elit. Sed etiam, sed etiam.</div>
    <div>Lorem ipsectetur adipiscing elit. Sed etiam, sed etiam.</div>
  </template>
  <template #footer>
    <div class="mc-ms-auto mc-flex mc-items-center mc-gap-size-spacing-3xs">
      <mc-button variant="secondary">secondary</mc-button>
      <mc-button tone="success">primary</mc-button>
    </div>
  </template>
</mc-card>

```vue
<template>
  <mc-card title="Card Title" border-width="6px">
    <template #content>
      <div>Card content</div>
      <div>Lorem ipsectetur adipiscing elit. Sed etiam, sed etiam.</div>
      <div>Lorem ipsectetur adipiscing elit. Sed etiam, sed etiam.</div>
    </template>
    <template #footer>
      <div class="mc-ms-auto mc-flex mc-items-center mc-gap-size-spacing-3xs">
        <mc-button variant="secondary">secondary</mc-button>
        <mc-button tone="success">primary</mc-button>
      </div>
    </template>
  </mc-card>
</template>
```

## Border Radius

Pass a `border-radius-size` prop to customize the border radius of the card. Accepts predefined sizes: `xl`, `lg`, `md`, `sm`, `xs`, and `2xs`.

<mc-card title="Card Title" border-radius-size="sm">
  <template #content>
    <div>Card content</div>
    <div>Lorem ipsectetur adipiscing elit. Sed etiam, sed etiam.</div>
    <div>Lorem ipsectetur adipiscing elit. Sed etiam, sed etiam.</div>
  </template>
  <template #footer>
    <div class="mc-ms-auto mc-flex mc-items-center mc-gap-size-spacing-3xs">
      <mc-button variant="secondary">secondary</mc-button>
      <mc-button tone="success">primary</mc-button>
    </div>
  </template>
</mc-card>

```vue
<template>
  <mc-card title="Card Title" border-radius-size="sm">
    <template #content>
      <div>Card content</div>
      <div>Lorem ipsectetur adipiscing elit. Sed etiam, sed etiam.</div>
      <div>Lorem ipsectetur adipiscing elit. Sed etiam, sed etiam.</div>
    </template>
    <template #footer>
      <div class="mc-ms-auto mc-flex mc-items-center mc-gap-size-spacing-3xs">
        <mc-button variant="secondary">secondary</mc-button>
        <mc-button tone="success">primary</mc-button>
      </div>
    </template>
  </mc-card>
</template>
```

## API Reference

### Props

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>id</td>
      <td>string</td>
      <td>''</td>
      <td>
        Unique identifier for the input element. Used for associating the input with a label for accessibility.
      </td>
    </tr>
    <tr>
      <td>tone</td>
      <td>
        'plain' | 'neutral' | 'success' | 'information' | 'pending' | 'caution' | 'accent' | 'danger'
      </td>
      <td>''</td>
      <td>Sets the card's title in the header section.</td>
    </tr>
    <tr>
      <td>title</td>
      <td>string</td>
      <td>''</td>
      <td>Sets the card's title in the header section.</td>
    </tr>
    <tr>
      <td>subtitle</td>
      <td>string</td>
      <td>''</td>
      <td>Sets the card's subtitle displayed below the title. Requires title to be visible.</td>
    </tr>
    <tr>
      <td>header-icon</td>
      <td>string</td>
      <td>''</td>
      <td>Displays an icon in the header using the Iconify icon name format. Requires title to be visible.</td>
    </tr>
    <tr>
      <td>show-header</td>
      <td>boolean</td>
      <td>true</td>
      <td>Controls the visibility of the header section.</td>
    </tr>
    <tr>
      <td>show-footer</td>
      <td>boolean</td>
      <td>true</td>
      <td>Controls the visibility of the footer section.</td>
    </tr>
    <tr>
      <td>border-width</td>
      <td>Width Style</td>
      <td>'1px'</td>
      <td>Sets the border width of the card.</td>
    </tr>
    <tr>
      <td>border-radius-size</td>
      <td>'xl' | 'lg' | 'md' | 'sm' | 'xs' | '2xs'</td>
      <td>'xl'</td>
      <td>Sets the border radius of the card including header and footer.</td>
    </tr>
    <tr>
      <td>has-collapsible</td>
      <td>boolean</td>
      <td>false</td>
      <td>Indicates that the card is used with a collapsible component, which affects the border styling.</td>
    </tr>
    <tr>
      <td>is-collapsible-open</td>
      <td>boolean</td>
      <td>false</td>
      <td>Tracks whether the content is expanded when used with a collapsible component to apply appropriate border styles.</td>
    </tr>
    <tr>
      <td>has-content-padding</td>
      <td>boolean</td>
      <td>true</td>
      <td>Controls whether padding is applied to the content area of the card.</td>
    </tr>
    <tr>
      <td>flexbox</td>
      <td>boolean</td>
      <td>false</td>
      <td>When true, applies flexbox layout to the card, making it a flex container with column direction.</td>
    </tr>
    <tr>
      <td>customBorderSize</td>
      <td>string | null</td>
      <td>null</td>
      <td>Sets a custom border size for the card. If not set, the default border size will be used.</td>
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
      <td>header</td>
      <td>Custom content for the card header. Will be displayed alongside the title if provided, or can completely replace the default header if no title is set.</td>
    </tr>
    <tr>
      <td>content</td>
      <td>The main content of the card. This slot is recommended for organizing content within the card.</td>
    </tr>
    <tr>
      <td>default</td>
      <td>Alternative slot for content. Only used if no content slot is provided.</td>
    </tr>
    <tr>
      <td>footer</td>
      <td>Custom content for the card footer. Typically used for action buttons or summary information.</td>
    </tr>
  </tbody>
</table>

<script lang="ts" setup>
import McCard from '@/components/card/card.vue';
import McButton from '@/components/button/button.vue';
import McBadge from '@/components/badge/badge.vue';
</script>
