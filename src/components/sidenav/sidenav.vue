<template>
  <Teleport to="body" :disabled="!teleportToBody">
    <div
      id="sidenav"
      v-bind="$attrs"
      :class="[
        'mc-hidden-scrolls mc-fixed mc-bottom-0 mc-left-0 mc-top-0 mc-z-50 mc-transition-all mc-duration-300 mc-ease-in-out',
        { 'mc-h-full': isMobileScreen && isMobileMenuExpanded },
        isMobileScreen
          ? ['mc-h-fit mc-w-full']
          : [
              'mc-h-full mc-w-auto',
              'mc-background-color mc-overflow-y-auto mc-overflow-x-hidden',
              'mc-border-color-weak mc-border-b-0 mc-border-l-0 mc-border-r mc-border-t-0 mc-border-solid',
            ],
      ]"
    >
      <!-- #region - Desktop Section -->
      <template v-if="!isMobileScreen">
        <div class="mc-flex mc-h-full mc-w-[68px] mc-flex-col">
          <div
            :class="{
              'mc-hidden-scrolls mc-flex mc-h-full mc-flex-col mc-justify-between mc-overflow-auto': true,
              'mc-max-h-[calc(100vh-60px)]': props.notificationCount === null && props.requestCount === null,
              'mc-max-h-[calc(100vh-194px)]':
                (props.notificationCount && props.requestCount) ||
                props.notificationCount === 0 ||
                props.requestCount === 0,
              '!mc-max-h-[calc(100vh-150px)]': props.requestCount === '' || props.notificationCount === '',
            }"
          >
            <!-- #region - Top Section -->
            <div class="mc-grid mc-justify-center mc-gap-2 mc-px-3 mc-pb-4 mc-pt-4">
              <!-- #region - Logo -->
              <div
                :class="[
                  'mc-grid mc-justify-center mc-p-2',
                  '[&>img]:mc-mx-auto [&>img]:mc-h-[24px] [&>img]:mc-w-[24px] [&>img]:mc-object-cover',
                ]"
              >
                <slot name="logo-image" />
              </div>
              <!-- #endregion - Logo -->

              <template v-if="!props.loading">
                <!-- #region - Quick Actions -->
                <Menu
                  v-if="props.quickActions && props.quickActions.length > 0"
                  v-model:shown="isQuckActionMenuVisible"
                  aria-id="quick-action-menu-wrapper"
                  distance="18"
                  placement="right-start"
                  :triggers="[]"
                  :popper-hide-triggers="[]"
                  instant-move
                  :delay="0"
                >
                  <div
                    :class="{
                      'mc-flex mc-w-full mc-cursor-pointer mc-items-center mc-text-center mc-text-[28px] mc-transition mc-duration-150 mc-ease-in-out': true,
                      'hover:mc-brightness-75': true,
                      'active:mc-text-color-success-pressed active:mc-scale-90': true,
                      'mc-text-color-inverted-disabled mc-rotate-180': isQuckActionMenuVisible,
                      'mc-text-color-brand-base': !isQuckActionMenuVisible,
                    }"
                    @click="isQuckActionMenuVisible = !isQuckActionMenuVisible"
                  >
                    <Icon icon="ph:plus-circle-fill" class="mc-w-full" />
                  </div>

                  <template #popper>
                    <div
                      :class="[
                        'mc-px-4 mc-py-3',
                        'mc-border-color-weak mc-flex mc-justify-between mc-border-x-0 mc-border-b mc-border-t-0 mc-border-solid',
                      ]"
                    >
                      <h3 class="mc-body-sm-regular-medium mc-m-0">Quick Actions</h3>
                      <Icon
                        icon="ph:x"
                        :class="[
                          'mc-text-color-weak mc-h-[20px] mc-w-[20px] mc-cursor-pointer',
                          'mc-transition mc-duration-150 mc-ease-in-out',
                          'active:mc-scale-90',
                        ]"
                        @click="isQuckActionMenuVisible = !isQuckActionMenuVisible"
                      />
                    </div>

                    <div class="mc-max-h-[268px] mc-overflow-auto">
                      <template v-for="(quickAction, quickActionIndex) in props.quickActions" :key="quickActionIndex">
                        <h5
                          v-if="quickAction.menuHeading"
                          :class="[
                            {
                              'mc-label-xs-medium mc-text-color-supporting mc-m-0 mc-p-2': true,
                              'mc-mt-3': quickActionIndex !== 0,
                            },
                          ]"
                        >
                          {{ quickAction.menuHeading }}
                        </h5>
                        <template
                          v-for="(menuLinkItem, menuLinkItemIndex) in quickAction.items"
                          :key="menuLinkItemIndex"
                        >
                          <div
                            v-if="!menuLinkItem.hidden"
                            :class="[
                              'mc-flex mc-cursor-pointer mc-gap-2 mc-px-4 mc-py-3 mc-align-middle mc-duration-150 mc-ease-in-out',
                              'hover:mc-background-color-hover',
                              'active:mc-background-color-pressed',
                            ]"
                            @click="handleRedirect(menuLinkItem, '', '', '')"
                          >
                            <div
                              :class="{
                                'mc-flex mc-items-center mc-rounded-border-radius-md mc-p-2': true,
                                'mc-border mc-border-solid mc-border-kangkong-400 mc-bg-kangkong-50 mc-text-kangkong-800':
                                  menuLinkItem.iconBgColor === 'green',
                                'mc-border mc-border-solid mc-border-ubas-400 mc-bg-ubas-50 mc-text-ubas-800':
                                  menuLinkItem.iconBgColor === 'purple',
                              }"
                            >
                              <Icon
                                v-if="menuLinkItem.icon"
                                :icon="menuLinkItem.icon"
                                class="mc-h-[1em] mc-w-[1em] mc-text-[20px]"
                              />
                            </div>
                            <div class="mc-grid mc-justify-between">
                              <h5 class="mc-body-sm-regular-medium mc-text-color-strong mc-m-0 mc-truncate">
                                {{ menuLinkItem.title }}
                              </h5>
                              <p class="mc-body-xs-regular mc-text-color-base mc-m-0 mc-truncate">
                                {{ menuLinkItem.description }}
                              </p>
                            </div>
                          </div>
                        </template>
                      </template>
                    </div>
                  </template>
                </Menu>
                <!-- #endregion - Quick Actions -->

                <!-- #region - Search -->
                <div
                  v-if="props.hasSearch"
                  id="sidenav_search"
                  :class="[
                    'mc-flex mc-cursor-pointer mc-items-center mc-justify-center mc-rounded-border-radius-md mc-p-2 mc-transition mc-duration-150 mc-ease-in-out',
                    'hover:mc-background-color-hover',
                    'active:mc-background-color-single-active active:mc-scale-90',
                    'mc-m-auto mc-box-border mc-max-h-9 mc-max-w-9',
                  ]"
                  @click="emit('search', 'search-triggered')"
                >
                  <Icon icon="ph:magnifying-glass" class="mc-h-[1.25em] mc-w-[1.25em]" />
                </div>
                <!-- #endregion - Search -->

                <!-- #region - Grouped Nav Links -->
                <sidenav-menu-links
                  :nav-links="navLinks"
                  :active-nav="props.activeNav"
                  nav-link-position="top"
                  @get-navlink-item="emit('get-navlink-item', $event)"
                />
                <!-- #endregion - Grouped Nav Links -->
              </template>
              <sidenav-loader v-else :count="5" />
            </div>
            <!-- #endregion - Top Section -->

            <!-- #region - Bottom Section -->
            <div
              v-if="navLinks.bottom && navLinks.bottom.length > 0"
              class="mc-grid mc-justify-center mc-gap-2 mc-px-3 mc-pb-4 mc-pt-0"
            >
              <!-- #region - Grouped Nav Links -->
              <sidenav-menu-links
                v-if="!props.loading"
                :nav-links="navLinks"
                nav-link-position="bottom"
                :active-nav="props.activeNav"
                @get-navlink-item="emit('get-navlink-item', $event)"
              />

              <sidenav-loader v-else :count="3" />
              <!-- #endregion - Grouped Nav Links -->
            </div>
            <!-- #endregion - Bottom Section -->
          </div>

          <div
            v-if="
              props.notificationCount || props.requestCount || props.notificationCount === 0 || props.requestCount === 0
            "
            class="mc-grid mc-gap-2 mc-py-6"
          >
            <template v-if="!props.loading">
              <!-- #region - Notification -->
              <mc-tooltip text="NOTIFICATIONS" placement="right" :distance="4" :fit-content="false">
                <div
                  v-if="props.notificationCount || props.notificationCount === 0"
                  id="sidenav_notification"
                  :class="[
                    'mc-2 mc-relative mc-flex mc-cursor-pointer mc-items-center mc-justify-center mc-rounded-border-radius-md',
                    'mc-m-auto mc-h-9 mc-w-9 mc-transition mc-duration-150 mc-ease-in-out',
                    'active:mc-background-color-single-active active:mc-scale-90',
                    {
                      'mc-background-color-single-active mc-border-color-brand-base mc-border-[1.5px] mc-border-solid active:mc-scale-90':
                        props.isNotifActive,
                    },
                    { 'hover:mc-background-color-hover': !props.isNotifActive },
                  ]"
                  @click="emit('notifications', 'notifications-triggered')"
                >
                  <Icon v-if="!props.isNotifActive" icon="ph:bell" class="mc-h-[1.25em] mc-w-[1.25em]" />
                  <Icon v-else icon="ph:bell-fill" class="mc-h-[1.25em] mc-w-[1.25em] mc-text-kangkong-700" />
                  <mc-badge
                    v-if="props.notificationCount !== 0"
                    class="mc-absolute -mc-top-0.5 mc-right-0.5"
                    :text="String(props.notificationCount)"
                    variant="danger"
                    size="small"
                  />
                </div>
              </mc-tooltip>
              <!-- #endregion - Notification -->

              <!-- #region - Requests -->
              <mc-tooltip text="REQUESTS" placement="right" :distance="4" :fit-content="false">
                <div
                  v-if="props.requestCount || props.requestCount === 0"
                  id="sidenav_request"
                  :class="[
                    'mc-2 mc-relative mc-flex mc-cursor-pointer mc-items-center mc-justify-center mc-rounded-border-radius-md',
                    'mc-m-auto mc-h-9 mc-w-9 mc-transition mc-duration-150 mc-ease-in-out',
                    'active:mc-background-color-single-active active:mc-scale-90',
                    {
                      'mc-background-color-single-active mc-border-color-brand-base mc-border-[1.5px] mc-border-solid active:mc-scale-90':
                        props.isRequestActive,
                    },
                    { 'hover:mc-background-color-hover': !props.isRequestActive },
                  ]"
                  @click="emit('requests', 'requests-triggered')"
                >
                  <Icon v-if="!props.isRequestActive" icon="ph:file-text" class="mc-h-[1.25em] mc-w-[1.25em]" />
                  <Icon v-else icon="ph:file-text-fill" class="mc-h-[1.25em] mc-w-[1.25em] mc-text-kangkong-700" />
                  <mc-badge
                    v-if="props.requestCount !== 0"
                    class="mc-absolute -mc-top-0.5 mc-right-0.5"
                    :text="String(props.requestCount)"
                    variant="danger"
                    size="small"
                  />
                </div>
              </mc-tooltip>
              <!-- #endregion - Requests -->
            </template>
            <sidenav-loader v-else />
          </div>
        </div>
        <!-- #region - Avatar -->
        <div
          v-if="props.userMenu"
          :class="[
            'mc-border-color-weak mc-absolute mc-bottom-0 mc-p-3.5',
            'mc-border-b-0 mc-border-l-0 mc-border-r-0 mc-border-t mc-border-solid',
            'mc-flex mc-justify-center',
          ]"
        >
          <Menu
            v-model:shown="isUserMenuVisible"
            aria-id="user-menu-wrapper"
            distance="16"
            placement="right"
            :triggers="['click', 'hover']"
            instant-move
            :delay="0"
          >
            <template v-if="props.userMenu.profileImage">
              <mc-avatar
                class="mc-cursor-pointer"
                variant="image"
                :src="props.userMenu.profileImage"
                :initial="props.userMenu.name"
                size="md"
              />
            </template>
            <template v-else>
              <mc-avatar class="mc-cursor-pointer" :initial="props.userMenu.name" size="md" />
            </template>

            <template #popper>
              <div
                :class="[
                  'mc-px-2 mc-py-2',
                  'mc-border-color-weak mc-flex mc-justify-between mc-border-x-0 mc-border-b mc-border-t-0 mc-border-solid',
                ]"
              >
                <div class="mc-flex mc-items-center mc-gap-2">
                  <template v-if="props.userMenu.profileImage">
                    <mc-avatar
                      variant="image"
                      :src="props.userMenu.profileImage"
                      :initial="props.userMenu.name"
                      size="md"
                    />
                  </template>
                  <template v-else>
                    <mc-avatar :initial="props.userMenu.name" size="md" />
                  </template>
                  <div class="mc-grid mc-justify-between mc-gap-1">
                    <h3 class="mc-body-sm-regular mc-m-0 mc-truncate">
                      {{ props.userMenu.name }}
                    </h3>
                    <p class="mc-body-xs-regular mc-text-color-supporting mc-m-0 mc-truncate">
                      {{ props.userMenu.email }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="mc-max-h-[268px] mc-overflow-auto">
                <template v-for="(userMenuItem, userMenuItemIndex) in props.userMenu.items" :key="userMenuItemIndex">
                  <div
                    v-if="!userMenuItem.hidden"
                    :id="`usermenu_${generateId(userMenuItem.title)}`"
                    :class="[
                      'mc-flex mc-cursor-pointer mc-gap-2 mc-p-2 mc-align-middle mc-duration-150 mc-ease-in-out',
                      'hover:mc-background-color-hover',
                      'active:mc-background-color-pressed mc-bg-red',
                      'last-of-type:mc-border-color-weak last-of-type:mc-border-0 last-of-type:mc-border-t last-of-type:mc-border-solid',
                    ]"
                    @click="handleRedirect(userMenuItem, '', '', '')"
                  >
                    <Icon
                      v-if="userMenuItem.icon"
                      :icon="userMenuItem.icon"
                      class="mc-h-[1em] mc-w-[1em] mc-text-[20px]"
                    />
                    <h5 class="mc-body-sm-regular mc-text-color-strong mc-m-0 mc-truncate">
                      {{ userMenuItem.title }}
                    </h5>
                  </div>
                </template>
              </div>
            </template>
          </Menu>
        </div>
        <!-- #endregion - Avatar -->
      </template>
      <!-- #endregion - Desktop Section -->

      <!-- #region - Mobile Section -->
      <div v-else class="mobile-section mc-flex mc-h-full mc-flex-col">
        <div
          ref="mobileSideNavHeaderRef"
          class="header mc-border-color-weak mc-background-color mc-box-border mc-flex mc-h-full mc-max-h-[54px] mc-items-center mc-justify-between mc-border-b mc-border-l-0 mc-border-r mc-border-t-0 mc-border-solid mc-px-3 mc-py-2"
        >
          <div
            id="mobile_sidenav_button"
            ref="mobileButtonRef"
            class="left-menus mc-flex mc-h-full mc-cursor-pointer mc-items-center"
            @click="isMobileMenuExpanded = !isMobileMenuExpanded"
          >
            <div
              :class="[
                'mc-flex mc-items-center mc-justify-center mc-rounded-border-radius-md mc-p-2 mc-transition mc-duration-150 mc-ease-in-out',
                'hover:mc-background-color-hover',
                'active:mc-background-color-single-active active:mc-scale-90',
                'mc-h-full mc-w-9',
              ]"
            >
              <Icon v-if="!isMobileMenuExpanded" icon="ph:list" class="mc-h-[1.25em] mc-w-[1.25em]" />
              <Icon v-else icon="ph:x" class="mc-h-[1.25em] mc-w-[1.25em]" />
            </div>
          </div>
          <div class="right-menus mc-flex mc-items-center mc-gap-3">
            <div
              v-if="
                props.notificationCount ||
                props.requestCount ||
                props.notificationCount === 0 ||
                props.requestCount === 0
              "
              class="mc-flex mc-gap-2"
            >
              <!-- #region - Notification -->
              <mc-tooltip text="NOTIFICATIONS" placement="top" :distance="4" :fit-content="false">
                <div
                  v-if="props.notificationCount || props.notificationCount === 0"
                  id="mobile_sidenav_notification"
                  :class="[
                    'mc-relative mc-flex mc-cursor-pointer mc-items-center mc-justify-center mc-rounded-border-radius-md',
                    'mc-h-9 mc-w-9 mc-transition mc-duration-150 mc-ease-in-out',
                    'active:mc-background-color-single-active active:mc-scale-90',
                    {
                      'mc-background-color-single-active mc-border-color-brand-base mc-border-[1.5px] mc-border-solid active:mc-scale-90':
                        props.isNotifActive,
                    },
                    { 'hover:mc-background-color-hover': !props.isNotifActive },
                  ]"
                  @click="emit('notifications', 'notifications-triggered')"
                >
                  <Icon v-if="!props.isNotifActive" icon="ph:bell" class="mc-h-[1.25em] mc-w-[1.25em]" />
                  <Icon v-else icon="ph:bell-fill" class="mc-h-[1.25em] mc-w-[1.25em] mc-text-kangkong-700" />
                  <mc-badge
                    v-if="props.notificationCount !== 0"
                    class="mc-absolute -mc-top-0.5 mc-right-0.5"
                    :text="String(props.notificationCount)"
                    variant="danger"
                    size="small"
                  />
                </div>
              </mc-tooltip>
              <!-- #endregion - Notification -->

              <!-- #region - Requests -->
              <mc-tooltip text="REQUESTS" placement="top" :distance="4" :fit-content="false">
                <div
                  v-if="props.requestCount || props.requestCount === 0"
                  id="mobile_sidenav_request"
                  :class="[
                    'mc-relative mc-flex mc-cursor-pointer mc-items-center mc-justify-center mc-rounded-border-radius-md',
                    'mc-h-9 mc-w-9 mc-transition mc-duration-150 mc-ease-in-out',
                    'active:mc-background-color-single-active active:mc-scale-90',
                    {
                      'mc-background-color-single-active mc-border-color-brand-base mc-border-[1.5px] mc-border-solid active:mc-scale-90':
                        props.isRequestActive,
                    },
                    { 'hover:mc-background-color-hover': !props.isRequestActive },
                  ]"
                  @click="emit('requests', 'requests-triggered')"
                >
                  <Icon v-if="!props.isRequestActive" icon="ph:file-text" class="mc-h-[1.25em] mc-w-[1.25em]" />
                  <Icon v-else icon="ph:file-text-fill" class="mc-h-[1.25em] mc-w-[1.25em] mc-text-kangkong-700" />
                  <mc-badge
                    v-if="props.requestCount !== 0"
                    class="mc-absolute -mc-top-0.5 mc-right-0.5"
                    :text="String(props.requestCount)"
                    variant="danger"
                    size="small"
                  />
                </div>
              </mc-tooltip>
              <!-- #endregion - Requests -->
            </div>

            <div v-if="props.userMenu">
              <Menu
                id="mobile-user-menu"
                v-model:shown="isMobileUserMenuVisible"
                aria-id="mobile-user-menu-wrapper"
                :distance="props.userMenu.profileImage ? '-2' : '2'"
                skidding="-65"
                placement="top"
                :triggers="['click']"
                instant-move
                :delay="0"
                popper-class="mobile-user-menu-popper"
              >
                <template v-if="props.userMenu.profileImage">
                  <mc-avatar
                    class="mc-cursor-pointer"
                    variant="image"
                    :src="props.userMenu.profileImage"
                    :initial="props.userMenu.name"
                    size="md"
                  />
                </template>
                <template v-else>
                  <mc-avatar class="mc-cursor-pointer" :initial="props.userMenu.name" size="md" />
                </template>

                <template #popper>
                  <div
                    :class="[
                      'mc-px-2 mc-py-2',
                      'mc-border-color-weak mc-flex mc-justify-between mc-border-x-0 mc-border-b mc-border-t-0 mc-border-solid',
                    ]"
                  >
                    <div class="mc-flex mc-items-center mc-gap-2">
                      <template v-if="props.userMenu.profileImage">
                        <mc-avatar
                          variant="image"
                          :src="props.userMenu.profileImage"
                          :initial="props.userMenu.name"
                          size="md"
                        />
                      </template>
                      <template v-else>
                        <mc-avatar :initial="props.userMenu.name" size="md" />
                      </template>
                      <div class="mc-grid mc-justify-between mc-gap-1">
                        <h3 class="mc-body-sm-regular mc-m-0 mc-truncate">
                          {{ props.userMenu.name }}
                        </h3>
                        <p class="mc-body-xs-regular mc-text-color-supporting mc-m-0 mc-truncate">
                          {{ props.userMenu.email }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="mc-max-h-[268px] mc-overflow-auto">
                    <template
                      v-for="(userMenuItem, userMenuItemIndex) in props.userMenu.items"
                      :key="userMenuItemIndex"
                    >
                      <div
                        v-if="!userMenuItem.hidden"
                        :id="`mobile_usermenu_${generateId(userMenuItem.title)}`"
                        :class="[
                          'mc-flex mc-cursor-pointer mc-gap-2 mc-p-2 mc-align-middle mc-duration-150 mc-ease-in-out',
                          'hover:mc-background-color-hover',
                          'active:mc-background-color-pressed',
                          'last-of-type:mc-border-color-weak last-of-type:mc-border-0 last-of-type:mc-border-t last-of-type:mc-border-solid',
                        ]"
                        @click="handleRedirect(userMenuItem, '', '', '')"
                      >
                        <Icon
                          v-if="userMenuItem.icon"
                          :icon="userMenuItem.icon"
                          class="mc-h-[1em] mc-w-[1em] mc-text-[20px]"
                        />
                        <h5 class="mc-body-sm-regular mc-text-color-strong mc-m-0 mc-truncate">
                          {{ userMenuItem.title }}
                        </h5>
                      </div>
                    </template>
                  </div>
                </template>
              </Menu>
            </div>
          </div>
        </div>
        <Transition name="mobile-sidenav">
          <div
            v-if="isMobileMenuExpanded"
            id="mobile_sidenav_content"
            ref="mobileSideNavContentRef"
            :class="[
              'mc-border-color-weak mc-border-b-0 mc-border-l-0 mc-border-t-0 mc-border-solid [@media(min-width:481px)]:mc-border-r',
              'mc-absolute mc-left-0 mc-top-[54px] mc-box-border mc-flex-1 mc-px-size-spacing-2xs mc-py-size-spacing-2xs',
              'mc-background-color mc-h-[calc(100%-54px)] mc-w-screen [@media(min-width:481px)]:mc-w-[380px]',
              'mc-z-[2] mc-transition-all mc-duration-300 mc-ease-in-out',
            ]"
          >
            <template v-if="props.loading">
              <div class="mc-flex mc-flex-col mc-gap-size-spacing-3xs">
                <sidenav-loader :count="5" />
              </div>
            </template>
            <template v-else>
              <div class="mc-hidden-scrolls mc-grid mc-h-full mc-w-full">
                <sidenav-menu-links-mobile
                  :nav-links="navLinks"
                  :active-nav="props.activeNav"
                  @get-navlink-item="emit('get-navlink-item', $event)"
                />
              </div>
            </template>
          </div>
        </Transition>
        <div
          v-if="isMobileMenuExpanded"
          id="mobile_sidenav_content_overlay"
          class="mc-z-[1] mc-h-full mc-w-full mc-bg-overlay"
        />
      </div>

      <!-- #endregion - Mobile Section -->
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { Menu, hideAllPoppers, recomputeAllPoppers } from 'floating-vue';
import { Icon } from '@iconify/vue';

import 'floating-vue/dist/style.css';

import { sidenavPropTypes, sidenavEmitTypes } from './sidenav';
import { useSidenav } from './use-sidenav';

import SidenavMenuLinks from './sidenav-menu-links.vue';
import SidenavLoader from './sidenav-loader.vue';

import McAvatar from '../avatar/avatar.vue';
import McBadge from '../badge/badge.vue';
import McTooltip from '../tooltip/tooltip.vue';
import { onClickOutside, useMediaQuery, useResizeObserver } from '@vueuse/core';
import sidenavMenuLinksMobile from './mobile/sidenav-menu-links-mobile.vue';
import { ref, watch, useTemplateRef } from 'vue';

const props = defineProps(sidenavPropTypes);
const emit = defineEmits(sidenavEmitTypes);

const mobileSideNavContentRef = ref<HTMLInputElement | null>(null);
const mobileButtonRef = ref<HTMLInputElement | null>(null);
const mobileSideNavHeaderRef = useTemplateRef('mobileSideNavHeaderRef');
const isMobileScreen = useMediaQuery('(max-width: 1023px)');

useResizeObserver(mobileSideNavHeaderRef, (entries) => {
  if (entries[0].contentRect.width !== 0) {
    recomputeAllPoppers();
  }
});

watch(isMobileScreen, (newVal) => {
  hideAllPoppers();

  if (!newVal) {
    isMobileMenuExpanded.value = false;
  }
});

onClickOutside(
  mobileSideNavContentRef,
  () => {
    isMobileMenuExpanded.value = false;
  },
  { ignore: [mobileButtonRef] },
);

const {
  navLinks,
  isQuckActionMenuVisible,
  isUserMenuVisible,
  isMobileUserMenuVisible,
  isMobileMenuExpanded,
  handleRedirect,
  generateId,
} = useSidenav(props, emit);
</script>

<style scoped>
.mobile-sidenav-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}

.mobile-sidenav-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.mobile-sidenav-enter-active,
.mobile-sidenav-leave-active {
  transition: all 0.25s linear;
}

.mobile-sidenav-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.mobile-sidenav-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
