<template>
  <div id="audit_trail_wrapper" ref="auditTrailWrapperRef" class="mc-flex mc-flex-col mc-gap-size-spacing-2xs">
    <div v-for="(entry, index) in auditTrailLogs" id="audit_trail_entry" :key="index" class="mc-relative mc-h-fit">
      <div class="mc-absolute mc-h-full mc-py-[6px]">
        <div
          :class="['mc-h-[6px] mc-w-[6px] mc-rounded-full', index === 0 ? 'mc-bg-kangkong-600' : 'mc-bg-mushroom-200']"
        />
        <div
          :class="[
            'mc-relative mc-left-1/2 mc-mt-size-spacing-5xs mc-h-[calc(100%-18px)] mc-w-[1px] mc-translate-x-[-50%]',
            index === 0 ? 'mc-bg-kangkong-600' : 'mc-bg-mushroom-200',
            collapsedState[index] ? 'mc-h-[calc(100%-12px)]' : 'mc-h-[calc(100%-22px)]',
          ]"
        />
      </div>
      <div
        id="audit_trail_header"
        class="hover:mc-background-color-hover mc-ml-[10px] mc-flex mc-w-full mc-items-center mc-justify-between mc-gap-size-spacing-3xs mc-self-start mc-px-2 mc-py-[6px] hover:mc-cursor-pointer hover:mc-rounded-lg"
        @click="toggleCollapse(index)"
      >
        <div id="audit_trail_avatar" :class="[{ 'mc-self-start': isMultiLine[index] }]">
          <McAvatar v-if="!!entry.avatarUrl" variant="image" :src="entry.avatarUrl" size="sm" />
          <McAvatar v-else :initial="entry.userName" size="sm" />
        </div>
        <span
          id="audit_trail_title"
          :ref="(el) => setTitleRef(el, index)"
          class="mc-text-color-strong mc-text-200 mc-font-normal"
        >
          {{ entry.title }}
        </span>
        <div :class="['mc-h-4 mc-w-4', { 'mc-self-start': isMultiLine[index] }]">
          <Icon
            :icon="collapsedState[index] ? 'ph:caret-up' : 'ph:caret-down'"
            width="16px"
            height="16px"
            class="mc-text-color-strong"
          />
        </div>
      </div>
      <div id="audit_trail_logs_wrapper" class="mc-pl-[18px]">
        <McCollapsible v-model="collapsedState[index]">
          <div
            v-for="(log, logIndex) in entry.logs"
            id="audit_trail_log_entries"
            :key="logIndex"
            :class="[
              'mc-flex mc-flex-col mc-gap-size-spacing-3xs',
              { 'mc-pb-size-spacing-3xs': logIndex !== entry.logs.length - 1 },
            ]"
          >
            <div id="log_label">
              <McTooltip
                :text="log.label.join(' > ')"
                placement="bottom"
                :show-triggers="log.label.length > 2 ? 'hover' : []"
              >
                <div id="entry_label" class="mc-text-color-strong mc-text-200 mc-font-normal">
                  <template v-if="log.label.length === 1">
                    {{ log.label[0] }}
                  </template>
                  <template v-else-if="log.label.length === 2">
                    {{ log.label.join(' > ') }}
                  </template>
                  <template v-else> {{ log.label[0] }} > ... > {{ log.label[log.label.length - 1] }} </template>
                </div>
              </McTooltip>
            </div>
            <div id="log_values" class="mc-flex mc-items-center mc-gap-size-spacing-3xs">
              <div
                id="old_value"
                class="mc-border-color-weak mc-text-color-supporting mc-rounded-border-radius-xs mc-border mc-border-solid mc-px-size-spacing-5xs mc-py-size-spacing-6xs mc-text-200 mc-font-normal"
              >
                {{ log.oldValue }}
              </div>
              <span class="mc-text-200 mc-font-medium"> → </span>
              <div
                id="new_value"
                class="mc-border-color-weak mc-text-color-strong mc-rounded-border-radius-xs mc-border mc-border-solid mc-px-size-spacing-5xs mc-py-size-spacing-6xs mc-text-200 mc-font-normal"
              >
                {{ log.newValue }}
              </div>
            </div>
          </div>
        </McCollapsible>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import McAvatar from '../avatar/avatar.vue';
import { useAuditTrail } from './use-audit-trail';
import { auditTrailPropTypes } from './audit-trail';
import { Icon } from '@iconify/vue';
import McCollapsible from '../collapsible/collapsible.vue';
import McTooltip from '../tooltip/tooltip.vue';

const props = defineProps(auditTrailPropTypes);
const { auditTrailLogs, collapsedState, toggleCollapse, setTitleRef, isMultiLine, auditTrailWrapperRef } =
  useAuditTrail(props);
</script>
