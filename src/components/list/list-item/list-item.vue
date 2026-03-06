<template>
  <div :class="props.classes" @click="$emit('select')">
    <template v-if="showLozengeMode">
      <div class="mc-flex mc-items-center mc-gap-2">
        <mc-checkbox
          v-if="props.multiSelect"
          :disabled="listItem.disabled || (props.disabledUnselectedItems && !isSelected)"
          :checked="isSelected"
        />
        <mc-lozenge
          :label="listItem.text || (listItem.lozengeProps?.label as string)"
          :tone="listItem.lozengeProps?.tone as string & (typeof LOZENGE_TONE)[number]"
          :fill="listItem.lozengeProps?.fill as boolean"
          :url="listItem.lozengeProps?.url as string"
          :icon="listItem.lozengeProps?.icon as string"
          :max-width="listItem.lozengeProps?.maxWidth as string"
          :postfix-icon="listItem.lozengeProps?.postfixIcon as string"
        />
      </div>
    </template>
    <template v-else>
      <div class="mc-flex mc-items-center mc-gap-2">
        <mc-checkbox
          v-if="props.multiSelect"
          :disabled="listItem.disabled || (props.disabledUnselectedItems && !isSelected)"
          :checked="isSelected"
        />
        <mc-radio
          v-if="props.radioList && !props.multiSelect"
          :id="`radio-${props.item?.value}`"
          class="mc-flex mc-items-center"
          name="radio-group"
          :value="props.item?.value"
          :model-value="isSelected ? props.item?.value : undefined"
          :disabled="props.item?.disabled || (props.disabledUnselectedItems && !isSelected)"
          @update:model-value="$emit('select')"
        />
        <div :class="[listItem.textColor, 'mc-flex mc-flex-row mc-items-center mc-gap-size-spacing-3xs']">
          <span
            v-if="hasIcon"
            :class="[
              'mc-flex mc-h-[30px] mc-w-[30px] mc-items-center mc-justify-center',
              iconClasses,
              { 'mc-text-color-disabled': listItem.disabled || (props.disabledUnselectedItems && !isSelected) },
            ]"
          >
            <Icon class="mc-text-xl" :icon="iconName" />
          </span>

          <span v-if="hasAvatar">
            <mc-avatar
              size="sm"
              :initial="props.avatarSource || listItem.text"
              :variant="props.avatarVariant"
              :src="props.avatarSource"
            />
          </span>

          <div
            :class="[
              'mc-flex mc-flex-auto mc-flex-col mc-justify-start',
              { 'mc-text-color-disabled': listItem.disabled || (props.disabledUnselectedItems && !isSelected) },
            ]"
          >
            <span class="mc-break-words mc-text-left mc-text-xs">
              {{ listItem.text }}
            </span>
            <span
              v-if="item.subtext"
              :class="[
                'mc-body-xs-regular mc-text-color-base mc-break-words mc-text-left',
                { 'mc-text-color-disabled': listItem.disabled || (props.disabledUnselectedItems && !isSelected) },
              ]"
            >
              {{ listItem.subtext }}
            </span>
          </div>
        </div>
      </div>

      <!-- Right Side Actions -->
      <div class="mc-flex mc-items-center mc-gap-2">
        <template v-if="props.ladderized">
          <Icon v-if="hasSublevels" class="mc-text-color-weak mc-size-4" icon="ph:caret-right" />
          <Icon
            v-else-if="isSelected && !props.noCheck && !props.multiSelect && !props.radioList"
            class="mc-text-color-brand-base mc-w-[1.39em]"
            icon="ph:check"
          />
        </template>
        <template v-else>
          <mc-lozenge
            v-if="listItem.lozenge"
            :label="listItem.lozenge?.label as string"
            :tone="listItem.lozenge?.tone as string & (typeof LOZENGE_TONE)[number]"
            :fill="listItem.lozenge?.fill as boolean"
            :url="listItem.lozenge?.url as string"
            :icon="listItem.lozenge?.icon as string"
            :max-width="listItem.lozenge?.maxWidth as string"
            :postfix-icon="listItem.lozenge?.postfixIcon as string"
          />
          <Icon
            v-if="isSelected && !props.noCheck && !props.multiSelect && !props.radioList"
            class="mc-text-color-brand-base mc-w-[1.39em]"
            icon="ph:check"
          />
        </template>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';

import McCheckbox from '@/components/checkbox/checkbox.vue';
import McRadio from '@/components/radio/radio.vue';
import McLozenge from '@/components/lozenge/lozenge.vue';
import McAvatar from '@/components/avatar/avatar.vue';

import { LOZENGE_TONE } from '@/components/lozenge/lozenge';

import { listItemPropTypes, listItemEmitTypes } from './list-item';
import { useListItem } from './use-list-item';

const props = defineProps(listItemPropTypes);
const emit = defineEmits(listItemEmitTypes);

const { listItem, hasIcon, iconName, iconClasses, hasSublevels, showLozengeMode, hasAvatar } = useListItem(props, emit);
</script>
