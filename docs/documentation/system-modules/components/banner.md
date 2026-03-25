---
title: Banner
descripttion: The Banner component is used to display important messages, statuses, or alerts to users. It supports different types (success, error, info, pending, caution), can be closed by the user, and allows for customizable content via slots.
outline: deep
---

# Banner

The Banner component is used to display important messages, statuses, or alerts to users. It supports different types (`success`, `error`, `info`, `pending`, `caution`), can be closed by the user, and allows for customizable content via slots.

## Basic Usage

Display banners of different types using the `type` prop.

<div class="mc-flex mc-flex-col mc-gap-2">
  <mc-banner v-model:show="showBannerSuccess" type="success" message="This is a success banner." />
  <mc-banner v-model:show="showBannerError" type="error" message="This is an error banner." />
  <mc-banner v-model:show="showBannerInfo" type="info" message="This is an info banner." />
  <mc-banner v-model:show="showBannerPending" type="pending" message="This is a pending banner." />
  <mc-banner v-model:show="showBannerCaution" type="caution" message="This is a caution banner." />
</div>

```vue
<template>
  <mc-banner v-model:show="showBannerSuccess" type="success" message="This is a success banner." />
  <mc-banner v-model:show="showBannerError" type="error" message="This is an error banner." />
  <mc-banner v-model:show="showBannerInfo" type="info" message="This is an info banner." />
  <mc-banner v-model:show="showBannerPending" type="pending" message="This is a pending banner." />
  <mc-banner v-model:show="showBannerCaution" type="caution" message="This is a caution banner." />
</template>

<script setup lang="ts">
import McBanner from '@/components/banner/banner.vue';
import { ref } from 'vue';

const showBannerSuccess = ref(true);
const showBannerError = ref(true);
const showBannerInfo = ref(true);
const showBannerPending = ref(true);
const showBannerCaution = ref(true);
</script>
```

## Close

Banners can be closed by the user if `showCloseButton` is `true. Use `v-model:show` to control visibility.

<table class="mc-w-full" style="border: none;">
  <tbody>
    <tr style="background: none;">
      <td style="width: 20%; vertical-align: top; background: none; border: none;">
      <mc-button @click="showBannerCloseSuccess = true" class="mc-w-full">Show Success</mc-button>
      </td>
      <td style="background: none; border: none;">
      <mc-banner v-model:show="showBannerCloseSuccess" type="success" show-close-button message="This is a closable success banner." />
      </td>
    </tr>
    <tr style="background: none;">
      <td style="width: 20%; vertical-align: top; background: none; border: none;">
      <mc-button @click="showBannerCloseError = true" class="mc-w-full">Show Error</mc-button>
      </td>
      <td style="background: none; border: none;">
      <mc-banner v-model:show="showBannerCloseError" type="error" show-close-button message="This is a closable error banner." />
      </td>
    </tr>
    <tr style="background: none;">
      <td style="width: 20%; vertical-align: top; background: none; border: none;">
      <mc-button @click="showBannerCloseInfo = true" class="mc-w-full">Show Info</mc-button>
      </td>
      <td style="background: none; border: none;">
      <mc-banner v-model:show="showBannerCloseInfo" type="info" show-close-button message="This is a closable info banner." />
      </td>
    </tr>
    <tr style="background: none;">
      <td style="width: 20%; vertical-align: top; background: none; border: none;">
      <mc-button @click="showBannerClosePending = true" class="mc-w-full">Show Pending</mc-button>
      </td>
      <td style="background: none; border: none;">
      <mc-banner v-model:show="showBannerClosePending" type="pending" show-close-button message="This is a closable pending banner." />
      </td>
    </tr>
    <tr style="background: none;">
      <td style="width: 20%; vertical-align: top; background: none; border: none;">
      <mc-button @click="showBannerCloseCaution = true" class="mc-w-full">Show Caution</mc-button>
      </td>
      <td style="background: none; border: none;">
      <mc-banner v-model:show="showBannerCloseCaution" type="caution" show-close-button message="This is a closable caution banner." />
      </td>
    </tr>
  </tbody>
</table>

```vue
<template>
  ...
  <mc-banner
    v-model:show="showBannerCloseSuccess"
    type="success"
    show-close-button
    message="This is a closable success banner."
  />
  <mc-banner
    v-model:show="showBannerCloseError"
    type="error"
    show-close-button
    message="This is a closable error banner."
  />
  <mc-banner
    v-model:show="showBannerCloseInfo"
    type="info"
    show-close-button
    message="This is a closable info banner."
  />
  <mc-banner
    v-model:show="showBannerClosePending"
    type="pending"
    show-close-button
    message="This is a closable pending banner."
  />
  <mc-banner
    v-model:show="showBannerCloseCaution"
    type="caution"
    show-close-button
    message="This is a closable caution banner."
  />
  ...
  <mc-button tone="success" @click="showBannerCloseSuccess = true">Show Success</mc-button>
  <mc-button tone="danger" @click="showBannerCloseError = true">Show Error</mc-button>
  <mc-button tone="info" @click="showBannerCloseInfo = true">Show Info</mc-button>
  <mc-button tone="pending" @click="showBannerClosePending = true">Show Pending</mc-button>
  <mc-button tone="caution" @click="showBannerCloseCaution = true">Show Caution</mc-button>
  ...
</template>

<script setup lang="ts">
import { ref } from 'vue';
import McBanner from '@/components/banner/banner.vue';
import McButton from '@/components/button/button.vue';

const showBannerCloseSuccess = ref(true);
const showBannerCloseError = ref(true);
const showBannerCloseInfo = ref(true);
const showBannerClosePending = ref(true);
const showBannerCloseCaution = ref(true);
</script>
```

## Customize

You can customize the content of the banner using the default slot.

<div>
  <mc-banner v-model:show="showBannerCustom" type="success" show-close-button>
    <div class="mc-flex mc-flex-col mc-gap-2">
      <strong>Custom Success!</strong> 
      <span>This is a custom banner message.</span>
    </div>
  </mc-banner>
  <mc-button tone="success" @click="showBannerCustom = true" class="mc-mt-2">Show Custom Banner</mc-button>
</div>

```vue
<template>
  <mc-banner v-model:show="showBannerCustom" type="success" show-close-button>
    <div class="mc-flex mc-flex-col mc-gap-2">
      <strong>Custom Success!</strong> <span>This is a custom banner message.</span>
    </div>
  </mc-banner>
  <mc-button tone="success" @click="showBannerCustom = true">Show Custom Banner</mc-button>
</template>

<script setup lang="ts">
import McBanner from '@/components/banner/banner.vue';
import McButton from '@/components/button/button.vue';
import { ref } from 'vue';

const showBannerCustom = ref(true);
</script>
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
      <td>type</td>
      <td>
        Determines the visual appearance and semantic meaning of the banner:
        <ul>
          <li><code>success</code>: Indicates a successful operation or positive message</li>
          <li><code>error</code>: Indicates an error or critical issue that needs attention</li>
          <li><code>info</code>: Provides general information to the user</li>
          <li><code>pending</code>: Indicates an operation in progress or awaiting action</li>
          <li><code>caution</code>: Indicates a warning or potential issue that may need attention</li>
        </ul>
        Each type uses specific colors and icons to reinforce its meaning.
      </td>
      <td>'success' | 'error' | 'info' | 'pending' | 'caution'</td>
      <td>'success'</td>
    </tr>
    <tr>
      <td>showCloseButton</td>
      <td>When <code>true</code>, displays a close button that allows users to dismiss the banner. When clicked, it sets the <code>show</code> model value to <code>false</code>.</td>
      <td>boolean</td>
      <td>false</td>
    </tr>
    <tr>
      <td>message</td>
      <td>Text content to display in the banner. This is only used when no content is provided via the default slot. If both the slot and message prop are provided, the slot content takes precedence.</td>
      <td>string</td>
      <td>undefined</td>
    </tr>
    <tr>
      <td>show (v-model)</td>
      <td>Controls the visibility of the banner. Using <code>v-model:show</code> enables two-way binding for programmatically showing or hiding the banner. The banner is completely removed from the DOM when not shown.</td>
      <td>boolean</td>
      <td>true</td>
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
      <td>update:show</td>
      <td>Emitted when the banner's visibility changes, either from user interaction with the close button or programmatic changes to the <code>show</code> prop. This event is used for the <code>v-model:show</code> binding.</td>
      <td><code>(value: boolean)</code> - The new visibility state</td>
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
        <p>Used to customize the content of the banner. When provided, this content replaces the standard message display.</p>
        <p>If not provided, the banner will display the icon appropriate for the selected type, followed by the text specified in the <code>message</code> prop.</p>
      </td>
    </tr>
  </tbody>
</table>

<script lang="ts" setup>
import McBanner from '@/components/banner/banner.vue';
import McButton from '@/components/button/button.vue';
import { ref } from 'vue';

const showBannerSuccess = ref(true);
const showBannerError = ref(true);
const showBannerInfo = ref(true);
const showBannerPending = ref(true);
const showBannerCaution = ref(true);
const showBannerClose = ref(true);
const showBannerCloseSuccess = ref(true);
const showBannerCloseError = ref(true);
const showBannerCloseInfo = ref(true);
const showBannerClosePending = ref(true);
const showBannerCloseCaution = ref(true);
const showBannerCustom = ref(true);
</script>
