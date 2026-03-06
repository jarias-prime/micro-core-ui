import { App } from 'vue';

import '@/assets/styles/tailwind.css';
import pkg from '../package.json';

// Prefix constant (no need for dynamic setPrefix)
const PREFIX = 'mc-';

// Dynamically import all components from the components directory
// @ts-ignore
const components = import.meta.glob('../src/components/**/*.vue', { eager: true });

// List of component files to exclude from global registration
const excludedComponents: string[] = ['sidenav-menu-links.vue'];

const install = (app: App) => {
  Object.entries(components)
    .filter(([path]) => {
      const fileName = path.split('/').pop();
      return fileName && !excludedComponents.includes(fileName);
    })
    .forEach(([path, component]) => {
      // Extract component name from the file path and apply prefix
      const componentName = path.split('/').pop()?.replace('.vue', '');

      if (componentName) {
        app.component(`${PREFIX}${componentName}`, (component as any).default);
      }
    });

  console.info(
    `%c★ Micro Core UI Next Installed v${pkg.version} ★`,
    'font-weight: bold; font-size: 14px; color: green; padding: 16px 8px; border: 1px dashed green; border-radius: 4px; margin: 10px auto;',
  );
};

export default { install };

// Export individual components
export { default as McAccordion } from '../src/components/accordion/accordion.vue';
export { default as McAttributeFilter } from '../src/components/attribute-filter/attribute-filter.vue';
export { default as McAuditTrail } from '../src/components/audit-trail/audit-trail.vue';
export { default as McAvatar } from '../src/components/avatar/avatar.vue';
export { default as McBadge } from '../src/components/badge/badge.vue';
export { default as McBanner } from '../src/components/banner/banner.vue';
export { default as McButton } from '../src/components/button/button.vue';
export { default as McButtonDropdown } from '../src/components/button/button-dropdown/button-dropdown.vue';
export { default as McCalendar } from '../src/components/calendar/calendar.vue';
export { default as McCalendarCell } from '../src/components/calendar-cell/calendar-cell.vue';
export { default as McCard } from '../src/components/card/card.vue';
export { default as McCheckbox } from '../src/components/checkbox/checkbox.vue';
export { default as McChips } from '../src/components/chips/chips.vue';
export { default as McCollapsible } from '../src/components/collapsible/collapsible.vue';
export { default as McDatePicker } from '../src/components/date-picker/date-picker.vue';
export { default as McDateCalendarPicker } from '../src/components/date-picker/date-calendar-picker/date-calendar-picker.vue';
export { default as McDateRangePicker } from '../src/components/date-picker/date-range-picker/date-range-picker.vue';
export { default as McMonthYearPicker } from '../src/components/date-picker/month-year-picker/month-year-picker.vue';
export { default as McDatePickerCalendarTab } from '../src/components/date-picker/tabs/DatePickerCalendarTab.vue';
export { default as McDatePickerMonthTab } from '../src/components/date-picker/tabs/DatePickerMonthTab.vue';
export { default as McDatePickerYearTab } from '../src/components/date-picker/tabs/DatePickerYearTab.vue';
export { default as McDropdown } from '../src/components/dropdown/dropdown.vue';
export { default as McEmptyState } from '../src/components/empty-state/empty-state.vue';
export { default as McFileUpload } from '../src/components/file-upload/file-upload.vue';
export { default as McFilter } from '../src/components/filter/filter.vue';
export { default as McFloatingAction } from '../src/components/floating-action/floating-action.vue';
export { default as McIcon } from '../src/components/icon/icon.vue';
export { default as McInput } from '../src/components/input/input.vue';
export { default as McInputContactNumber } from '../src/components/input/input-contact-number/input-contact-number.vue';
export { default as McInputCurrency } from '../src/components/input/input-currency/input-currency.vue';
export { default as McInputDropdown } from '../src/components/input/input-dropdown/input-dropdown.vue';
export { default as McInputEmail } from '../src/components/input/input-email/input-email.vue';
export { default as McInputPassword } from '../src/components/input/input-password/input-password.vue';
export { default as McInputSearch } from '../src/components/input/input-search/input-search.vue';
export { default as McInputUrl } from '../src/components/input/input-url/input-url.vue';
export { default as McInputUsername } from '../src/components/input/input-username/input-username.vue';
export { default as McList } from '../src/components/list/list.vue';
export { default as McListItem } from '../src/components/list/list-item/list-item.vue';
export { default as McLadderizedList } from '../src/components/list/ladderized-list/ladderized-list.vue';
export { default as McLadderizedListBack } from '../src/components/list/ladderized-list/ladderized-list-back.vue';
export { default as McLozenge } from '../src/components/lozenge/lozenge.vue';
export { default as McModal } from '../src/components/modal/modal.vue';
export { default as McPopper } from '../src/components/popper/popper.vue';
export { default as McProgressBar } from '../src/components/progress-bar/progress-bar.vue';
export { default as McRadio } from '../src/components/radio/radio.vue';
export { default as McRadioGrouped } from '../src/components/radio/radio-grouped/radio-grouped.vue';
export { default as McSelect } from '../src/components/select/select.vue';
export { default as McSelectLadderized } from '../src/components/select/select-ladderized/select-ladderized.vue';
export { default as McSelectMultiple } from '../src/components/select/select-multiple/select-multiple.vue';
export { default as McSidenav } from '../src/components/sidenav/sidenav.vue';
export { default as McSidepanel } from '../src/components/sidepanel/sidepanel.vue';
export { default as McStackingSidepanel } from '../src/components/sidepanel/stacking-sidepanel/stacking-sidepanel.vue';
export { default as McSlider } from '../src/components/slider/slider.vue';
export { default as McSnackbar } from '../src/components/snackbar/snackbar.vue';
export { default as McSnack } from '../src/components/snackbar/snack/snack.vue';
export { default as McStatus } from '../src/components/status/status.vue';
export { default as McStepper } from '../src/components/stepper/stepper.vue';
export { default as McStep } from '../src/components/stepper/step/step.vue';
export { default as McSwitch } from '../src/components/switch/switch.vue';
export { default as McTable } from '../src/components/table/table.vue';
export { default as McTableActions } from '../src/components/table/table-actions/table-actions.vue';
export { default as McTableChipsTitle } from '../src/components/table/table-chips-title/table-chips-title.vue';
export { default as McTableLozengeTitle } from '../src/components/table/table-lozenge-title/table-lozenge-title.vue';
export { default as McTablePagination } from '../src/components/table/table-pagination/table-pagination.vue';
export { default as McTabs } from '../src/components/tabs/tabs.vue';
export { default as McTextarea } from '../src/components/textarea/textarea.vue';
export { default as McTimePicker } from '../src/components/time-picker/time-picker.vue';
export { default as McTooltip } from '../src/components/tooltip/tooltip.vue';
