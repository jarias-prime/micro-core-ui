---
title: Radio
descripttion: A Radio Button is a component that enables a user to select a single option from a set of choices.
outline: deep
---

# Radio

A Radio Button is a component that enables a user to select a single option from a set of choices.

## Basic Usage

<div class="mc-flex mc-flex-col mc-items-start mc-gap-2">
  <mc-radio id="radio1" v-model="radioModel.radio1" name="radio_name1" value="value1">
    Radio Label 1
  </mc-radio>
  <mc-radio id="radio2" v-model="radioModel.radio1" name="radio_name1" value="value2">
    Radio Label 2
  </mc-radio>
</div>

```vue
<template>
  <div class="mc-flex mc-flex-col mc-items-start mc-gap-2">
    <mc-radio id="radio1" v-model="radioModel" name="radio_name" value="value1">Radio Label 1</mc-radio>
    <mc-radio id="radio2" v-model="radioModel" name="radio_name" value="value2">Radio Label 2</mc-radio>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const radioModel = ref('');
</script>
```

## Active

<div class="mc-flex mc-flex-col mc-items-start mc-gap-2">
  <mc-radio id="radio3" v-model="radioModel.radio2" name="radio_name2" value="value1">
    Radio Label 1
  </mc-radio>
  <mc-radio id="radio4" v-model="radioModel.radio2" name="radio_name2" value="value2">
    Radio Label 2
  </mc-radio>
</div>

```vue
<template>
  <mc-radio id="radio1" v-model="radioModel" name="radio_name" value="value1">Radio Label 1</mc-radio>
  <mc-radio id="radio2" v-model="radioModel" name="radio_name" value="value2">Radio Label 2</mc-radio>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const radioModel = ref('value2');
</script>
```

## Disabled

Add the `disabled` attribute to the `<mc-radio>` component to disable the radio button.

<div class="mc-flex mc-flex-col mc-items-start mc-gap-2">
  <mc-radio id="radio5" v-model="radioModel.radio3" name="radio_name3" value="value1">
    Radio Label 1
  </mc-radio>
  <mc-radio id="radio6" v-model="radioModel.radio3" name="radio_name3" value="value2" disabled>
    Radio Label 2
  </mc-radio>
</div>

```vue
<template>
  <div class="mc-flex mc-flex-col mc-items-start mc-gap-2">
    <mc-radio id="disabledradio1" v-model="radioModel" name="radio_name" value="value1">Radio Label 1</mc-radio>
    <mc-radio id="disabledradio2" v-model="radioModel" name="radio_name" value="value2" disabled>
      Radio Label 2
    </mc-radio>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const radioModel = ref('');
</script>
```

## Choice Box

Use the `choiceBox` prop to display radio buttons in a choice box style with an expanded clickable area. This makes the entire component clickable, improving usability and user experience.

<div class="mc-flex mc-flex-col mc-items-start mc-gap-2">
  <mc-radio id="choicebox1" v-model="radioModel.radio4" name="radio_choicebox" value="option1" choice-box full-width>
    <div class="mc-body-sm-regular mc-text-color-strong">Option 1</div>
    <div class="mc-body-sm-regular mc-text-color-base">Select this option for feature A</div>
  </mc-radio>
  <mc-radio id="choicebox2" v-model="radioModel.radio4" name="radio_choicebox" value="option2" choice-box full-width>
    <div class="mc-body-sm-regular mc-text-color-strong">Option 2</div>
    <div class="mc-body-sm-regular mc-text-color-base">Select this option for feature B</div>
  </mc-radio>
  <mc-radio id="choicebox3" v-model="radioModel.radio4" name="radio_choicebox" value="option3" choice-box full-width>
    <div class="mc-body-sm-regular mc-text-color-strong">Option 3</div>
    <div class="mc-body-sm-regular mc-text-color-base">Select this option for feature C</div>
  </mc-radio>
</div>

```vue
<template>
  <div class="mc-flex mc-flex-col mc-items-start mc-gap-2">
    <mc-radio id="choicebox1" v-model="selectedOption" name="radio_choicebox" value="option1" choice-box full-width>
      <div class="mc-body-sm-regular mc-text-color-strong">Option 1</div>
      <div class="mc-body-sm-regular mc-text-color-base">Select this option for feature A</div>
    </mc-radio>
    <mc-radio id="choicebox2" v-model="selectedOption" name="radio_choicebox" value="option2" choice-box full-width>
      <div class="mc-body-sm-regular mc-text-color-strong">Option 2</div>
      <div class="mc-body-sm-regular mc-text-color-base">Select this option for feature B</div>
    </mc-radio>
    <mc-radio id="choicebox3" v-model="selectedOption" name="radio_choicebox" value="option3" choice-box full-width>
      <div class="mc-body-sm-regular mc-text-color-strong">Option 3</div>
      <div class="mc-body-sm-regular mc-text-color-base">Select this option for feature C</div>
    </mc-radio>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const selectedOption = ref('option1');
</script>
```

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
        <code>id</code>
      </td>
      <td>Unique identifier for the radio input element. Required for accessibility and label association.</td>
      <td>string</td>
      <td><code>Required</code></td>
    </tr>
    <tr>
      <td>
        <code>modelValue</code>
      </td>
      <td>Current selected value used with v-model for two-way binding. When this matches the radio's <code>value</code> prop, the radio is selected.</td>
      <td>string | number | boolean</td>
      <td><code>undefined</code></td>
    </tr>
    <tr>
      <td>
        <code>name</code>
      </td>
      <td>Name attribute for the radio input element. Radio buttons in the same group should share the same name to ensure only one can be selected at a time.</td>
      <td>string</td>
      <td><code>Required</code></td>
    </tr>
    <tr>
      <td>
        <code>value</code>
      </td>
      <td>The value associated with this radio button. When the radio is selected, this value is assigned to the <code>modelValue</code>.</td>
      <td>string | number | boolean</td>
      <td><code>Required</code></td>
    </tr>
    <tr>
      <td>
        <code>disabled</code>
      </td>
      <td>When set to <code>true</code>, the radio button becomes non-interactive and appears visually disabled. Users cannot select a disabled radio button.</td>
      <td>boolean</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>
        <code>description</code>
      </td>
      <td>Additional explanatory text displayed below the radio label to provide more context or details about this option.</td>
      <td>string</td>
      <td><code>undefined</code></td>
    </tr>
    <tr>
      <td>
        <code>bordered</code>
      </td>
      <td>When set to <code>true</code>, adds a border around the entire radio component (including the label), providing visual separation from surrounding elements.</td>
      <td>boolean</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>
        <code>fullWidth</code>
      </td>
      <td>When set to <code>true</code>, the radio component will stretch to fill the full width of its container. When <code>false</code>, it will only be as wide as its content.</td>
      <td>boolean</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>
        <code>choiceBox</code>
      </td>
      <td>When set to <code>true</code>, transforms the radio button into a choice box style with an expanded clickable area that encompasses the entire component, making it easier to select by clicking anywhere on the box.</td>
      <td>boolean</td>
      <td><code>false</code></td>
    </tr>
  </tbody>
</table>

### Events

<table>
  <thead>
    <tr>
      <th class="mc-min-w-[180px]">Name</th>
      <th>Description</th>
      <th>Parameters</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>update:modelValue</code>
      </td>
      <td>Emitted when the radio button is selected. This event is used for v-model binding to work correctly.</td>
      <td>
        <code>(value: string | number | boolean)</code> - The value of the selected radio button
      </td>
    </tr>
  </tbody>
</table>

### Slots

<table>
  <thead>
    <tr>
      <th class="mc-min-w-[180px]">Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>default</code>
      </td>
      <td>Content to be displayed as the radio button's label. This typically contains text but can include other elements for more complex labels.</td>
    </tr>
  </tbody>
</table>

### Animation

<table>
  <thead>
    <tr>
      <th class="mc-min-w-[180px]">Animation</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>animate-shadow-grow</code>
      </td>
      <td>Applied when the radio button is selected, creating a smooth transition from an empty circle to a filled circle with a white center.</td>
    </tr>
  </tbody>
</table>

<script lang="ts" setup>
import { ref } from "vue";

import McRadio from "@/components/radio/radio.vue";

const radioModel = ref({
  radio1: '',
  radio2: 'value2',
  radio3: '',
  radio4: '',
  radio5: '',
  radio6: '',
  radio7: '',
  radio8: '',
  radio9: '',
  radio10: '',
});
</script>
