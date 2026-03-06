<template>
  <div v-for="(navLink, navLinkIndex) in positionedNavLinks" :key="navLinkIndex" class="mc-grid mc-gap-2">
    <!-- Desktop -->
    <template v-for="(parentLink, parentLinkIndex) in navLink.parentLinks" :key="parentLinkIndex">
      <!-- #region - Parent Links with Menus -->
      <template v-if="parentLink.menuLinks && parentLink.menuLinks.length > 0">
        <Menu
          aria-id="sidenav-menu-wrapper"
          distance="18"
          placement="right"
          :triggers="['click', 'hover']"
          instant-move
          :delay="0"
        >
          <!-- #region - Parent Links -->
          <div
            :id="`${generateId(parentLink.title)}`"
            :class="{
              'mc-m-auto mc-box-border mc-flex mc-max-h-9 mc-max-w-9 mc-cursor-pointer mc-items-center mc-justify-center mc-rounded-border-radius-md mc-p-2 mc-transition mc-duration-150 mc-ease-in-out': true,
              'mc-background-color-single-active mc-border-color-brand-base mc-border-[1.5px] mc-border-solid active:mc-scale-90':
                props.activeNav.parentNav === parentLink.title,
              'hover:mc-background-color-hover': props.activeNav.parentNav != parentLink.title,
              'active:mc-background-color-single-active active:mc-scale-90': true,
            }"
          >
            <template v-if="parentLink.icon && parentLink.icon.includes('https://')">
              <img
                v-if="parentLink.icon && props.activeNav.parentNav !== parentLink.title"
                :src="parentLink.icon"
                :alt="`${parentLink.title} icon`"
                class="mc-h-[1.25em] mc-w-[1.25em] mc-max-w-[1.25em]"
              />
              <img
                v-else-if="props.activeNav.parentNav === parentLink.title"
                :src="parentLink.icon.replace(/\.(svg|png|jpg)$/, '-fill.$1')"
                :alt="`${parentLink.title} icon`"
                class="mc-h-[1.25em] mc-w-[1.25em] mc-max-w-[1.25em]"
              />
            </template>
            <template v-else>
              <Icon
                v-if="parentLink.icon && props.activeNav.parentNav !== parentLink.title"
                :icon="parentLink.icon"
                class="mc-h-[1.25em] mc-w-[1.25em]"
              />
              <Icon
                v-else-if="props.activeNav.parentNav === parentLink.title"
                :icon="`${parentLink.icon}-fill`"
                class="mc-h-[1.25em] mc-w-[1.25em] mc-text-kangkong-700"
              />
              <Icon v-else icon="ph:globe" />
            </template>
          </div>
          <!-- #endregion - Parent Links -->

          <!-- #region - Menu Links Popper -->
          <template #popper>
            <div class="mc-border-color-weak mc-border-x-0 mc-border-b mc-border-t-0 mc-border-solid mc-p-2">
              <h3 class="mc-body-sm-regular-medium mc-m-0">
                {{ parentLink.title }}
              </h3>
            </div>

            <template v-for="(menuLink, menuLinkIndex) in parentLink.menuLinks" :key="menuLinkIndex">
              <h5
                v-if="menuLink.menuHeading"
                :class="{
                  'mc-label-xs-medium mc-text-color-supporting mc-m-0 mc-p-2': true,
                  'mc-pt-2': menuLinkIndex !== 0,
                }"
              >
                {{ menuLink.menuHeading }}
              </h5>

              <template v-for="(menuLinkItem, menuLinkItemIndex) in menuLink.items" :key="menuLinkItemIndex">
                <!-- #region - Menu link with Submenu links -->
                <template v-if="menuLinkItem.submenuLinks && menuLinkItem.submenuLinks.length > 0">
                  <Menu
                    aria-id="sidenav-submenu-l1-wrapper"
                    distance="4"
                    placement="right-start"
                    :triggers="['click', 'hover']"
                    instant-move
                    :delay="0"
                  >
                    <!-- #region - Menu links -->
                    <div
                      :id="`${generateId(parentLink.title, menuLinkItem.title)}`"
                      :class="{
                        'mc-body-sm-regular mc-relative mc-m-0 mc-flex mc-cursor-pointer mc-px-2 mc-py-1.5 mc-align-middle mc-duration-150 mc-ease-in-out': true,
                        'mc-background-color-single-active': props.activeNav.menu === menuLinkItem.title,
                        'hover:mc-background-color-hover': props.activeNav.menu !== menuLinkItem.title,
                        'active:mc-background-color-pressed': true,
                      }"
                    >
                      <div
                        v-if="props.activeNav.menu === menuLinkItem.title"
                        class="mc-background-color-brand-base mc-absolute mc-left-0 mc-top-0 mc-h-full mc-w-[2px]"
                      ></div>

                      <div class="mc-flex mc-w-full mc-items-center mc-justify-between mc-gap-1">
                        <span>{{ menuLinkItem.title }}</span>

                        <div class="mc-flex mc-items-center mc-gap-2">
                          <template
                            v-for="(attribute, i) in convertAttributesToArray(menuLinkItem?.attributes)"
                            :key="i"
                          >
                            <mc-lozenge
                              v-if="attribute?.name === 'lozenge' && attribute?.value"
                              :label="getLozengeLabel(attribute)"
                              :tone="getLozengeTone(attribute)"
                              fill
                            />
                          </template>
                          <Icon
                            icon="ph:caret-right"
                            class="mc-h-[16px] mc-w-[16px] mc-transform mc-font-normal mc-transition-transform mc-duration-300"
                          />
                        </div>
                      </div>
                    </div>
                    <!-- #endregion - Menu links -->

                    <!-- #region - Submenu Links Popper -->
                    <!-- 
                        Note: if you want the popper to stay open while hovering over submenuLink.subMenuHeading & submenuLinkItem.title, 
                              you need to keep it inside a <Menu> or ensure the content is part of the popper's interactive area.
                                
                              "sidenav-submenu-l2-wrapper" - Popper is currently hidden since sidenav only has 1 level of submenu links.
                      -->
                    <template #popper>
                      <Menu aria-id="sidenav-submenu-l2-wrapper" :triggers="['click', 'hover']" instant-move :delay="0">
                        <template
                          v-for="(submenuLink, submenuLinkIndex) in menuLinkItem.submenuLinks"
                          :key="submenuLinkIndex"
                        >
                          <h5
                            v-if="submenuLink.subMenuHeading"
                            :class="{
                              'mc-label-xs-medium mc-text-color-supporting mc-m-0 mc-p-2': true,
                              'mc-pt-2': submenuLinkIndex !== 0,
                            }"
                          >
                            {{ submenuLink.subMenuHeading }}
                          </h5>

                          <template
                            v-for="(submenuLinkItem, submenuLinkItemIndex) in submenuLink.items"
                            :key="submenuLinkItemIndex"
                          >
                            <!-- #region - Submenu Links -->
                            <div
                              v-if="!submenuLinkItem.hidden"
                              :id="`${generateId(parentLink.title, menuLinkItem.title, submenuLinkItem.title)}`"
                              :class="{
                                'mc-body-sm-regular mc-relative mc-m-0 mc-flex mc-cursor-pointer mc-px-2 mc-py-1.5 mc-align-middle mc-duration-150 mc-ease-in-out': true,
                                'mc-background-color-single-active': props.activeNav.submenu === submenuLinkItem.title,
                                'hover:mc-background-color-hover': props.activeNav.submenu !== submenuLinkItem.title,
                                'active:mc-background-color-pressed': true,
                              }"
                              @click="
                                handleRedirect(
                                  submenuLinkItem,
                                  parentLink.title,
                                  menuLinkItem.title,
                                  submenuLinkItem.title,
                                )
                              "
                            >
                              <div
                                v-show="props.activeNav.submenu === submenuLinkItem.title"
                                class="mc-background-color-brand-base mc-absolute mc-left-0 mc-top-0 mc-h-full mc-w-[2px]"
                              ></div>

                              <div class="mc-flex mc-w-full mc-items-center mc-justify-between mc-gap-1">
                                <span>{{ submenuLinkItem.title }}</span>

                                <div class="mc-flex mc-items-center mc-gap-2">
                                  <template
                                    v-for="(attribute, i) in convertAttributesToArray(submenuLinkItem?.attributes)"
                                    :key="i"
                                  >
                                    <mc-lozenge
                                      v-if="attribute?.name === 'lozenge' && attribute?.value"
                                      :label="getLozengeLabel(attribute)"
                                      :tone="getLozengeTone(attribute)"
                                      fill
                                    />
                                  </template>
                                </div>
                              </div>
                            </div>
                            <!-- #endregion - Submenu Links -->
                          </template>
                        </template>
                      </Menu>
                    </template>
                    <!-- #endregion - Submenu Links Popper -->
                  </Menu>
                </template>
                <!-- #endregion - Menu link with Submenu links -->

                <!-- #region - Menu link only -->
                <template v-else>
                  <div
                    v-if="!menuLinkItem.hidden"
                    :id="`${generateId(parentLink.title, menuLinkItem.title)}`"
                    :class="{
                      'mc-body-sm-regular mc-relative mc-m-0 mc-flex mc-cursor-pointer mc-px-2 mc-py-1.5 mc-align-middle mc-duration-150 mc-ease-in-out': true,
                      'mc-background-color-single-active': props.activeNav.menu === menuLinkItem.title,
                      'hover:mc-background-color-hover': props.activeNav.menu !== menuLinkItem.title,
                      'active:mc-background-color-pressed': true,
                    }"
                    @click="handleRedirect(menuLinkItem, parentLink.title, menuLinkItem.title, '')"
                  >
                    <div
                      v-if="props.activeNav.menu === menuLinkItem.title"
                      class="mc-background-color-brand-base mc-absolute mc-left-0 mc-top-0 mc-h-full mc-w-[2px]"
                    ></div>

                    <div class="mc-flex mc-w-full mc-items-center mc-justify-between mc-gap-1">
                      <span>{{ menuLinkItem.title }}</span>

                      <div class="mc-flex mc-items-center mc-gap-2">
                        <template v-for="(attribute, i) in convertAttributesToArray(menuLinkItem?.attributes)" :key="i">
                          <mc-lozenge
                            v-if="attribute?.name === 'lozenge' && attribute?.value"
                            :label="getLozengeLabel(attribute)"
                            :tone="getLozengeTone(attribute)"
                            fill
                          />
                        </template>
                      </div>
                    </div>
                  </div>
                </template>
                <!-- #endregion - Menu link only -->
              </template>
            </template>
          </template>
          <!-- #endregion - Menu Links -->
        </Menu>
      </template>
      <!-- #endregion - Parent Links with Menus -->

      <!-- #region - Parent link only -->
      <template v-else>
        <mc-tooltip
          v-if="!parentLink.hidden"
          :text="parentLink.title"
          placement="right"
          :distance="18"
          :fit-content="false"
        >
          <div
            :id="`${generateId(parentLink.title)}`"
            :class="{
              'mc-m-auto mc-box-border mc-flex mc-max-h-9 mc-max-w-9 mc-cursor-pointer mc-items-center mc-justify-center mc-rounded-border-radius-md mc-p-2 mc-transition mc-duration-150 mc-ease-in-out': true,
              'mc-background-color-single-active mc-border-color-brand-base mc-border-[1.5px] mc-border-solid active:mc-scale-90':
                props.activeNav.parentNav === parentLink.title,
              'hover:mc-background-color-hover': props.activeNav.parentNav != parentLink.title,
              'active:mc-background-color-single-active active:mc-scale-90': true,
            }"
            @click="handleRedirect(parentLink, parentLink.title, '', '')"
          >
            <template v-if="parentLink.icon && parentLink.icon.includes('https://')">
              <img
                v-if="parentLink.icon && props.activeNav.parentNav !== parentLink.title"
                :src="parentLink.icon"
                :alt="`${parentLink.title} icon`"
                class="mc-h-[1.25em] mc-w-[1.25em] mc-max-w-[1.25em]"
              />
              <img
                v-else-if="props.activeNav.parentNav === parentLink.title"
                :src="parentLink.icon.replace(/\.(svg|png|jpg)$/, '-fill.$1')"
                :alt="`${parentLink.title} icon`"
                class="mc-h-[1.25em] mc-w-[1.25em] mc-max-w-[1.25em]"
              />
            </template>
            <template v-else>
              <Icon
                v-if="parentLink.icon && props.activeNav.parentNav !== parentLink.title"
                :icon="parentLink.icon"
                class="mc-h-[1.25em] mc-w-[1.25em]"
              />
              <Icon
                v-else-if="props.activeNav.parentNav === parentLink.title"
                :icon="`${parentLink.icon}-fill`"
                class="mc-h-[1.25em] mc-w-[1.25em] mc-text-kangkong-700"
              />
              <Icon v-else icon="ph:globe" />
            </template>
          </div>
        </mc-tooltip>
      </template>
      <!-- #endregion - Parent link only  -->
    </template>

    <!-- Divider -->
    <div
      v-if="positionedNavLinks.length > 0 && navLinkIndex < positionedNavLinks.length - 1"
      class="mc-background-color-hover mc-h-[2px] mc-w-full"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { Menu } from 'floating-vue';
import { Icon } from '@iconify/vue';

import 'floating-vue/dist/style.css';

import { sidenavPropTypes, sidenavEmitTypes, type NavLinks } from './sidenav';
import { useSidenav } from './use-sidenav';

import McLozenge from '../lozenge/lozenge.vue';
import McTooltip from '../tooltip/tooltip.vue';
import { computed, type PropType } from 'vue';

const props = defineProps({
  ...sidenavPropTypes,
  navLinkPosition: {
    type: String as PropType<'top' | 'bottom'>,
    required: true,
  },
});

const positionedNavLinks = computed(() => {
  if (props.navLinkPosition === 'top') {
    return (props.navLinks as NavLinks).top;
  } else {
    return (props.navLinks as NavLinks).bottom;
  }
});

const emit = defineEmits(sidenavEmitTypes);

const { handleRedirect, generateId, getLozengeLabel, getLozengeTone, convertAttributesToArray } = useSidenav(
  props,
  emit,
);
</script>
