---
title: Avatar
descripttion: The Avatar component is a versatile and commonly used element in user interfaces, designed to represent users or entities visually. It can display images, initials, or icons, and can be customized in various ways, including size, tone, and variant, to suit different design needs. The avatar can also include notification indicators and badges for enhanced visual communication and can be disabled to prevent user interaction when necessary.
outline: deep
---

# AVATAR

The Avatar component is a versatile and commonly used element in user interfaces, designed to represent users or entities visually. It can display images, initials, or icons, and can be customized in various ways, including size, tone, and variant, to suit different design needs. The avatar can also include notification indicators and badges for enhanced visual communication and can be disabled to prevent user interaction when necessary.

## Basic Usage

<mc-avatar />

```vue
<template>
  <mc-avatar />
</template>
```

## Notification

<mc-avatar :notification="true" />

```vue
<template>
  <mc-avatar :notification="true" />
</template>
```

## Badge

<mc-avatar :badge="true" />

```vue
<template>
  <mc-avatar :badge="true" />
</template>
```

## Image

<div>
  <mc-avatar 
    variant="image" 
    src="https://iciw.centracdn.net/client/dynamic/images/12917_212b7a319e-13555-001-1-1350x0.jpg" 
    :notification="true" 
    :badge="true" 
    size="2xl" 
  />
</div>

```vue
<template>
  <mc-avatar
    variant="image"
    src="https://iciw.centracdn.net/client/dynamic/images/12917_212b7a319e-13555-001-1-1350x0.jpg"
    :notification="true"
    :badge="true"
    size="2xl"
  />
</template>
```

## Sizes

avatar component has 7 different sizes. You can use the `size` prop to set the size of the avatar. The default size is `2xl`. The available sizes are `2xl`, `xl`, `lg`, `md`, `sm`, `xs`, `2xs`.

<div class="mc-space-x-3 mc-flex">
  <mc-avatar 
    variant="image" 
    src="https://iciw.centracdn.net/client/dynamic/images/12917_212b7a319e-13555-001-1-1350x0.jpg" 
    :notification="true" 
    :badge="true" 
    size="2xl" 
  />
  <mc-avatar 
    variant="image" 
    src="https://iciw.centracdn.net/client/dynamic/images/12917_212b7a319e-13555-001-1-1350x0.jpg" 
    :notification="true" 
    :badge="true" 
    size="xl" 
  />
  <mc-avatar 
    variant="image" 
    src="https://iciw.centracdn.net/client/dynamic/images/12917_212b7a319e-13555-001-1-1350x0.jpg" 
    :notification="true" 
    :badge="true" 
    size="lg" 
  />
  <mc-avatar 
    variant="image" 
    src="https://iciw.centracdn.net/client/dynamic/images/12917_212b7a319e-13555-001-1-1350x0.jpg" 
    :notification="true" 
    :badge="true" 
    size="md" 
  />
  <mc-avatar 
    variant="image" 
    src="https://iciw.centracdn.net/client/dynamic/images/12917_212b7a319e-13555-001-1-1350x0.jpg" 
    :notification="true" 
    :badge="true" 
    size="sm" 
  />
  <mc-avatar 
    variant="image" 
    src="https://iciw.centracdn.net/client/dynamic/images/12917_212b7a319e-13555-001-1-1350x0.jpg" 
    :notification="true" 
    :badge="true" 
    size="xs" 
  />
  <mc-avatar 
    variant="image" 
    src="https://iciw.centracdn.net/client/dynamic/images/12917_212b7a319e-13555-001-1-1350x0.jpg" 
    :notification="true" 
    :badge="true" 
    size="2xs" 
  />
</div>

```vue
<template>
  <mc-avatar
    variant="image"
    src="https://iciw.centracdn.net/client/dynamic/images/12917_212b7a319e-13555-001-1-1350x0.jpg"
    :notification="true"
    :badge="true"
    size="2xl"
  />

  <mc-avatar
    variant="image"
    src="https://iciw.centracdn.net/client/dynamic/images/12917_212b7a319e-13555-001-1-1350x0.jpg"
    :notification="true"
    :badge="true"
    size="xl"
  />

  <mc-avatar
    variant="image"
    src="https://iciw.centracdn.net/client/dynamic/images/12917_212b7a319e-13555-001-1-1350x0.jpg"
    :notification="true"
    :badge="true"
    size="lg"
  />

  <mc-avatar
    variant="image"
    src="https://iciw.centracdn.net/client/dynamic/images/12917_212b7a319e-13555-001-1-1350x0.jpg"
    :notification="true"
    :badge="true"
    size="md"
  />

  <mc-avatar
    variant="image"
    src="https://iciw.centracdn.net/client/dynamic/images/12917_212b7a319e-13555-001-1-1350x0.jpg"
    :notification="true"
    :badge="true"
    size="sm"
  />

  <mc-avatar
    variant="image"
    src="https://iciw.centracdn.net/client/dynamic/images/12917_212b7a319e-13555-001-1-1350x0.jpg"
    :notification="true"
    :badge="true"
    size="xs"
  />

  <mc-avatar
    variant="image"
    src="https://iciw.centracdn.net/client/dynamic/images/12917_212b7a319e-13555-001-1-1350x0.jpg"
    :notification="true"
    :badge="true"
    size="2xs"
  />
</template>
```

## Variant

<div class="mc-grid mc-gap-4">
  <div class="mc-space-x-3 mc-flex">
    <mc-avatar  initial="Juan Dela Cruz" size="2xl" />
    <mc-avatar  initial="John Jay Joe" size="xl" />
    <mc-avatar  initial="Anthony" size="lg" />
    <mc-avatar  initial="Juan Dela Cruz" size="md" />
    <mc-avatar  initial="Juan Dela Cruz" size="sm" />
    <mc-avatar  initial="Juan Dela Cruz" size="xs" />
    <mc-avatar  initial="Juan Dela Cruz" size="2xs" />
  </div>

  <div class="mc-space-x-3 mc-flex">
    <mc-avatar variant="count" count="10" color="secondary" size="2xl" />
    <mc-avatar variant="count" count="2"  color="secondary" size="xl" />
    <mc-avatar variant="count" count="3"  color="secondary" size="lg" />
    <mc-avatar variant="count" count="4"  color="secondary" size="md" />
    <mc-avatar variant="count" count="5"  color="secondary" size="sm" />
    <mc-avatar variant="count" count="6"  color="secondary" size="xs" />
    <mc-avatar variant="count" count="7"  color="secondary" size="2xs" />
  </div>

  <div class="mc-space-x-3 mc-flex">
    <mc-avatar variant="user-group" size="2xl" />
    <mc-avatar variant="user-group" size="xl" />
    <mc-avatar variant="user-group" size="lg" />
    <mc-avatar variant="user-group" size="md" />
    <mc-avatar variant="user-group" size="sm" />
    <mc-avatar variant="user-group" size="xs" />
    <mc-avatar variant="user-group" size="2xs" />
  </div>

  <div class="mc-space-x-3 mc-flex">
    <mc-avatar variant="user"  size="2xl" />
    <mc-avatar variant="user"  size="xl" />
    <mc-avatar variant="user"  size="lg" />
    <mc-avatar variant="user"  size="md" />
    <mc-avatar variant="user"  size="sm" />
    <mc-avatar variant="user"  size="xs" />
    <mc-avatar variant="user"  size="2xs" />
  </div>

  <div class="mc-space-x-3 mc-flex">
    <mc-avatar variant="client" size="2xl" />
    <mc-avatar variant="client" size="xl" />
    <mc-avatar variant="client" size="lg" />
    <mc-avatar variant="client" size="md" />
    <mc-avatar variant="client" size="sm" />
    <mc-avatar variant="client" size="xs" />
    <mc-avatar variant="client" size="2xs" />
  </div>

  <div class="mc-space-x-3 mc-flex">
    <mc-avatar variant="users-four" size="2xl" />
    <mc-avatar variant="user-sound" size="xl" />
    <mc-avatar variant="airplane" size="lg" />
    <mc-avatar variant="android-logo" size="md" />
    <mc-avatar variant="arrow-down" size="sm" />
    <mc-avatar variant="arrow-up" size="xs" />
    <mc-avatar variant="arrow-left" size="2xs" />
  </div>
</div>

```vue
<template>
  <div class="mc-grid mc-gap-4">
    <div class="mc-space-x-3">
      <mc-avatar initial="Juan Dela Cruz" size="2xl" />
      <mc-avatar initial="John Jay Joe" size="xl" />
      <mc-avatar initial="Anthony" size="lg" />
      <mc-avatar initial="Juan Dela Cruz" size="md" />
      <mc-avatar initial="Juan Dela Cruz" size="sm" />
      <mc-avatar initial="Juan Dela Cruz" size="xs" />
      <mc-avatar initial="Juan Dela Cruz" size="2xs" />
    </div>

    <div class="mc-space-x-3">
      <mc-avatar variant="count" count="10" color="secondary" size="2xl" />
      <mc-avatar variant="count" count="2" color="secondary" size="xl" />
      <mc-avatar variant="count" count="3" color="secondary" size="lg" />
      <mc-avatar variant="count" count="4" color="secondary" size="md" />
      <mc-avatar variant="count" count="5" color="secondary" size="sm" />
      <mc-avatar variant="count" count="6" color="secondary" size="xs" />
      <mc-avatar variant="count" count="7" color="secondary" size="2xs" />
    </div>

    <div class="mc-space-x-3">
      <mc-avatar variant="user-group" size="2xl" />
      <mc-avatar variant="user-group" size="xl" />
      <mc-avatar variant="user-group" size="lg" />
      <mc-avatar variant="user-group" size="md" />
      <mc-avatar variant="user-group" size="sm" />
      <mc-avatar variant="user-group" size="xs" />
      <mc-avatar variant="user-group" size="2xs" />
    </div>

    <div class="mc-space-x-3">
      <mc-avatar variant="user" size="2xl" />
      <mc-avatar variant="user" size="xl" />
      <mc-avatar variant="user" size="lg" />
      <mc-avatar variant="user" size="md" />
      <mc-avatar variant="user" size="sm" />
      <mc-avatar variant="user" size="xs" />
      <mc-avatar variant="user" size="2xs" />
    </div>

    <div class="mc-space-x-3">
      <mc-avatar variant="client" size="2xl" />
      <mc-avatar variant="client" size="xl" />
      <mc-avatar variant="client" size="lg" />
      <mc-avatar variant="client" size="md" />
      <mc-avatar variant="client" size="sm" />
      <mc-avatar variant="client" size="xs" />
      <mc-avatar variant="client" size="2xs" />
    </div>

    //CUSTOM ICONS
    <div class="mc-space-x-3">
      <mc-avatar variant="users-four" size="2xl" />
      <mc-avatar variant="user-sound" size="xl" />
      <mc-avatar variant="airplane" size="lg" />
      <mc-avatar variant="android-logo" size="md" />
      <mc-avatar variant="arrow-down" size="sm" />
      <mc-avatar variant="arrow-up" size="xs" />
      <mc-avatar variant="arrow-left" size="2xs" />
    </div>
  </div>
</template>
```

## Slot

Slot can be used to add custom content to the avatar. note: adjust your custom content to fit the avatar size.

<div class="mc-grid mc-gap-4">
  <div class="mc-space-x-3 mc-flex">
    <mc-avatar :notification="true" :badge="true" size="2xl" color="primary">
      <Icon icon="ph:trash" />
    </mc-avatar>
    <mc-avatar :notification="true" :badge="true" size="xl" color="primary">
      <Icon icon="ph:trash" />
    </mc-avatar>
    <mc-avatar :notification="true" :badge="true" size="lg" color="primary">
      <Icon icon="ph:trash" />
    </mc-avatar>
    <mc-avatar :notification="true" :badge="true" size="md" color="primary">
      <Icon icon="ph:trash" />
    </mc-avatar>
    <mc-avatar :notification="true" :badge="true" size="sm" color="primary">
      <Icon icon="ph:trash" />
    </mc-avatar>
    <mc-avatar :notification="true" :badge="true" size="xs" color="primary">
      <Icon icon="ph:trash" />
    </mc-avatar>
    <mc-avatar :notification="true" :badge="true" size="2xs" color="primary">
      <Icon icon="ph:trash" />
    </mc-avatar>
  </div>

  <div class="mc-space-x-3 mc-flex">
    <mc-avatar :notification="true" :badge="true" size="2xl">
      <img src="https://iciw.centracdn.net/client/dynamic/images/12917_212b7a319e-13555-001-1-1350x0.jpg" alt="User Avatar" />
    </mc-avatar>
    <mc-avatar :notification="true" :badge="true" size="xl">
      <img src="https://iciw.centracdn.net/client/dynamic/images/12917_212b7a319e-13555-001-1-1350x0.jpg" alt="User Avatar" />
    </mc-avatar>
    <mc-avatar :notification="true" :badge="true" size="lg">
      <img src="https://iciw.centracdn.net/client/dynamic/images/12917_212b7a319e-13555-001-1-1350x0.jpg" alt="User Avatar" />
    </mc-avatar>
    <mc-avatar :notification="true" :badge="true" size="md">
      <img src="https://iciw.centracdn.net/client/dynamic/images/12917_212b7a319e-13555-001-1-1350x0.jpg" alt="User Avatar" />
    </mc-avatar>
    <mc-avatar :notification="true" :badge="true" size="sm">
      <img src="https://iciw.centracdn.net/client/dynamic/images/12917_212b7a319e-13555-001-1-1350x0.jpg" alt="User Avatar" />
    </mc-avatar>
    <mc-avatar :notification="true" :badge="true" size="xs">
      <img src="https://iciw.centracdn.net/client/dynamic/images/12917_212b7a319e-13555-001-1-1350x0.jpg" alt="User Avatar" />
    </mc-avatar>
    <mc-avatar :notification="true" :badge="true" size="2xs">
      <img src="https://iciw.centracdn.net/client/dynamic/images/12917_212b7a319e-13555-001-1-1350x0.jpg" alt="User Avatar" />
    </mc-avatar>
  </div>
</div>

```vue
<template>
  <div>
    <mc-avatar :notification="true" :badge="true" size="2xl" color="primary">
      <Icon icon="ph:trash" />
    </mc-avatar>
    <mc-avatar :notification="true" :badge="true" size="xl" color="primary">
      <Icon icon="ph:trash" />
    </mc-avatar>
    <mc-avatar :notification="true" :badge="true" size="lg" color="primary">
      <Icon icon="ph:trash" />
    </mc-avatar>
    <mc-avatar :notification="true" :badge="true" size="md" color="primary">
      <Icon icon="ph:trash" />
    </mc-avatar>
    <mc-avatar :notification="true" :badge="true" size="sm" color="primary">
      <Icon icon="ph:trash" />
    </mc-avatar>
    <mc-avatar :notification="true" :badge="true" size="xs" color="primary">
      <Icon icon="ph:trash" />
    </mc-avatar>
    <mc-avatar :notification="true" :badge="true" size="2xs" color="primary">
      <Icon icon="ph:trash" />
    </mc-avatar>
  </div>

  <div>
    <mc-avatar :notification="true" :badge="true" size="2xl">
      <img
        src="https://iciw.centracdn.net/client/dynamic/images/12917_212b7a319e-13555-001-1-1350x0.jpg"
        alt="User Avatar"
      />
    </mc-avatar>
    <mc-avatar :notification="true" :badge="true" size="xl">
      <img
        src="https://iciw.centracdn.net/client/dynamic/images/12917_212b7a319e-13555-001-1-1350x0.jpg"
        alt="User Avatar"
      />
    </mc-avatar>
    <mc-avatar :notification="true" :badge="true" size="lg">
      <img
        src="https://iciw.centracdn.net/client/dynamic/images/12917_212b7a319e-13555-001-1-1350x0.jpg"
        alt="User Avatar"
      />
    </mc-avatar>
    <mc-avatar :notification="true" :badge="true" size="md">
      <img
        src="https://iciw.centracdn.net/client/dynamic/images/12917_212b7a319e-13555-001-1-1350x0.jpg"
        alt="User Avatar"
      />
    </mc-avatar>
    <mc-avatar :notification="true" :badge="true" size="sm">
      <img
        src="https://iciw.centracdn.net/client/dynamic/images/12917_212b7a319e-13555-001-1-1350x0.jpg"
        alt="User Avatar"
      />
    </mc-avatar>
    <mc-avatar :notification="true" :badge="true" size="xs">
      <img
        src="https://iciw.centracdn.net/client/dynamic/images/12917_212b7a319e-13555-001-1-1350x0.jpg"
        alt="User Avatar"
      />
    </mc-avatar>
    <mc-avatar :notification="true" :badge="true" size="2xs">
      <img
        src="https://iciw.centracdn.net/client/dynamic/images/12917_212b7a319e-13555-001-1-1350x0.jpg"
        alt="User Avatar"
      />
    </mc-avatar>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';
</script>
```

## Status

<div class="mc-space-x-3 mc-flex">
  <mc-avatar variant="initial" status="danger" initial="Matthew"  :badge="true" size="2xl" />
  <mc-avatar variant="initial" status="disabled" initial="Mark"  :badge="true" size="2xl" />
  <mc-avatar variant="initial" status="information" initial="John"  :badge="true" size="2xl" />
  <mc-avatar variant="initial" status="brand" initial="Mary"  :badge="true" size="2xl" />
</div>

```vue
<template>
  <mc-avatar variant="initial" status="danger" initial="Matthew" :badge="true" size="2xl" />
  <mc-avatar variant="initial" status="disabled" initial="Mark" :badge="true" size="2xl" />
  <mc-avatar variant="initial" status="information" initial="John" :badge="true" size="2xl" />
  <mc-avatar variant="initial" status="brand" initial="Mary" :badge="true" size="2xl" />
</template>
```

## Loading

<div class="mc-space-x-3 mc-flex">
  <mc-avatar loading size="2xl" />
  <mc-avatar loading size="xl" />
  <mc-avatar loading size="lg"/>
  <mc-avatar loading size="md"/>
  <mc-avatar loading size="sm" />
  <mc-avatar loading size="xs" />
  <mc-avatar loading size="2xs" />
</div>

```vue
<template>
  <div>
    <mc-avatar loading size="2xl" />
    <mc-avatar loading size="xl" />
    <mc-avatar loading size="lg" />
    <mc-avatar loading size="md" />
    <mc-avatar loading size="sm" />
    <mc-avatar loading size="xs" />
    <mc-avatar loading size="2xs" />
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
      <td>variant</td>
      <td>
        Defines the type of avatar to display:
        <ul>
          <li><code>image</code>: Displays an image using the <code>src</code> prop</li>
          <li><code>initial</code>: Shows text initials based on the <code>initial</code> prop</li>
          <li><code>client</code>: Shows a client-specific icon (building icon)</li>
          <li><code>user</code>: Shows a user-specific icon (single person)</li>
          <li><code>user-group</code>: Shows an icon representing a group of users (multiple people)</li>
          <li><code>count</code>: Displays a numeric count from the <code>count</code> prop with a "+" prefix</li>
        </ul>
      </td>
      <td>'image' | 'initial' | 'client' | 'user' | 'user-group' | 'count'</td>
      <td>'initial'</td>
    </tr>
    <tr> 
      <td>src</td>
      <td>URL for the avatar image when using <code>variant="image"</code>. If not provided when using image variant, will fall back to the appropriate icon based on variant.</td>
      <td>string</td>
      <td>undefined</td>
    </tr>
    <tr>
      <td>alt</td>
      <td>Alternative text for the avatar image for accessibility. Important for screen readers to identify the avatar content.</td>
      <td>string</td>
      <td>'Avatar'</td>
    </tr>
    <tr>
      <td>size</td>
      <td>
        Controls the size of the avatar, affecting dimensions, font size, and position of indicators:
        <ul>
          <li><code>2xl</code>: 80px (5rem) - Extra extra large</li>
          <li><code>xl</code>: 56px (3.5rem) - Extra large</li>
          <li><code>lg</code>: 40px (2.5rem) - Large</li>
          <li><code>md</code>: 36px (2.25rem) - Medium</li>
          <li><code>sm</code>: 24px (1.5rem) - Small</li>
          <li><code>xs</code>: 20px (1.25rem) - Extra small</li>
          <li><code>2xs</code>: 16px (1rem) - Extra extra small</li>
        </ul>
        Each size automatically adjusts notification and badge positions and sizes.
      </td>
      <td>'2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs' | '2xs'</td>
      <td>'2xl'</td>
    </tr>
    <tr>
      <td>notification</td>
      <td>When <code>true</code>, displays a small notification indicator (badge) at the top-right corner of the avatar. The notification uses the danger variant color.</td>
      <td>boolean</td>
      <td>false</td>
    </tr>
    <tr>
      <td>notificationText</td>
      <td>Text to display in the notification indicator, typically a number. Only visible when <code>notification</code> is <code>true</code>.</td>
      <td>string</td>
      <td>'0'</td>
    </tr>
    <tr>
      <td>badge</td>
      <td>When <code>true</code>, displays a status badge at the bottom-right corner of the avatar. The badge color is determined by the <code>status</code> prop.</td>
      <td>boolean</td>
      <td>false</td>
    </tr>
    <tr>
      <td>initial</td>
      <td>
        Text to display when using <code>variant="initial"</code>. The component automatically extracts initials based on these rules:
        <ul>
          <li>For a single name: Uses the first letter (e.g., "John" → "J")</li>
          <li>For multiple names: Uses the first letter of the first and last name (e.g., "John Doe" → "JD")</li>
          <li>For small sizes (xs, 2xs): Limits to a single initial</li>
        </ul>
      </td>
      <td>string</td>
      <td>'Avatar'</td>
    </tr>
    <tr>
      <td>color</td>
      <td>
        Background color scheme for the avatar:
        <ul>
          <li><code>primary</code>: Uses the surface color for background</li>
          <li><code>secondary</code>: Uses the standard background color</li>
        </ul>
        A third option, 'tertiary', is also implemented in the code but not exposed in the prop validation.
      </td>
      <td>'primary' | 'secondary'</td>
      <td>'primary'</td>
    </tr>
    <tr>
      <td>status</td>
      <td>
        Status indicator type when <code>badge</code> is <code>true</code>:
        <ul>
          <li><code>brand</code>: Primary brand color (green), typically used for online or active status</li>
          <li><code>information</code>: Blue color, typically used for informational status</li>
          <li><code>danger</code>: Red color, typically used for error or blocked status</li>
          <li><code>disabled</code>: Gray color, typically used for offline or inactive status</li>
        </ul>
      </td>
      <td>'brand' | 'information' | 'danger' | 'disabled'</td>
      <td>'brand'</td>
    </tr>
    <tr>
      <td>count</td>
      <td>Numeric value to display when using <code>variant="count"</code>. Will be displayed with a "+" prefix (e.g., "+10").</td>
      <td>number</td>
      <td>0</td>
    </tr>
    <tr>
      <td>loading</td>
      <td>When <code>true</code>, displays a skeletal loading state animation instead of the actual avatar content. Useful for showing loading states while data is being fetched.</td>
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
      <td>imageError</td>
      <td>Emitted when the image source is not an image.</td>
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
        <p>Custom content to display inside the avatar. This can be used to create custom avatars with icons, images, or other content.</p>
        <p>When this slot is provided, it takes precedence over the standard icon or initial display. The slot content will be wrapped in the same container as images or icons, with appropriate sizing and styling.</p>
        <p>Note: You should adjust your custom content to fit the avatar size, especially for the smaller size variants.</p>
      </td>
    </tr>
  </tbody>
</table>

<script lang="ts" setup>
import McAvatar from "@/components/avatar/avatar.vue";

import { Icon } from '@iconify/vue';
</script>
