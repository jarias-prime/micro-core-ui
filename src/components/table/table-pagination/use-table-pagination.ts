import { computed, ref, toRefs } from 'vue';
import type { ComputedRef, SetupContext } from 'vue';
import classNames from 'classnames';
import type {
  TablePaginationPropTypes,
  TablePaginationEmitTypes,
} from '@/components/table/table-pagination/table-pagination';
import { useVModel } from '@vueuse/core';

interface TablePaginationClasses {
  baseClass: string;
  dropdownInputFieldClass: string;
  rightSideClass: string;
  computeRowRangeClass: string;
  navigationContainerClass: string;
  inputFieldIconClass: string;
  navigationButtonClass: string;
  dropdownClass: string;
}

export const useTablePagination = (
  props: TablePaginationPropTypes,
  emit: SetupContext<TablePaginationEmitTypes>['emit'],
) => {
  const { selectedRowCount, totalItems, bordered, editableCurrentPage, showNumberOfRowsDropdown } = toRefs(props);

  const currentPage = useVModel(props, 'currentPage', emit);

  const paginationClasses: ComputedRef<TablePaginationClasses> = computed(() => {
    const baseClass = classNames('mc-p-size-spacing-xs mc-flex mc-justify-between mc-bg-white-50 mc-h-max', {
      'mc-border mc-border-solid mc-border-color-weak': bordered.value,
      'mc-border-x-0 mc-border-t mc-border-b-0 mc-border-solid mc-border-color-weak': !bordered.value,
    });

    const dropdownClass = classNames(
      '!mc-w-max [&_.dropdown-slot_div_div]:mc-border-color-base [&_.dropdown-slot_div_div]:mc-p-0',
    );

    const dropdownInputFieldClass = classNames(
      'mc-max-w-[120px] mc-min-w-[48px] mc-h-full mc-font-medium [&_input]:mc-py-size-spacing-3xs [&_input]:mc-pr-size-spacing-5xs',
    );
    const inputFieldIconClass = classNames('mc-text-mushroom-950 mc-pr-size-spacing-3xs mc-box-content');
    const rightSideClass = classNames('mc-flex mc-justify-between mc-items-center', {
      'mc-space-x-4': !editableCurrentPage.value,
      'mc-gap-size-spacing-3xs': editableCurrentPage.value,
    });
    const computeRowRangeClass = classNames('mc-text-color-base mc-body-sm-regular');
    const navigationContainerClass = classNames('mc-flex', {
      'mc-space-x-2': !editableCurrentPage.value,
      'mc-gap-size-spacing-5xs': editableCurrentPage.value,
    });
    const navigationButtonClass = classNames('mc-rounded-border-radius-md');
    return {
      baseClass,
      dropdownInputFieldClass,
      rightSideClass,
      computeRowRangeClass,
      inputFieldIconClass,
      navigationContainerClass,
      navigationButtonClass,
      dropdownClass,
    };
  });

  const dropdownSelection = ref(props.dropdownSelection);
  const computeRowRange = computed(() => {
    const startRow = (currentPage.value - 1) * selectedRowCount.value + 1;
    const endRow = Math.min(currentPage.value * selectedRowCount.value, totalItems.value);
    return `${startRow} - ${endRow} of ${totalItems.value}`;
  });

  const computeSelectedRowCount = computed(() => {
    return `${selectedRowCount.value} Rows`;
  });

  const handleSelectedItem = (item: unknown) => {
    emit('update:selectedRowCount', Number(item));
  };

  const previous = () => {
    emit('previous');
  };

  const next = () => {
    emit('next');
  };

  const disabledNext = computed(() => {
    return props.currentPage === 1;
  });

  const disabledPrevious = computed(() => {
    return props.totalItems <= props.currentPage * props.selectedRowCount;
  });

  const generateUniqueId = () => {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000000);

    return `dropdown-${timestamp}-${randomNum}`;
  };

  const dropdownId = ref(`dropdown-${generateUniqueId()}`);

  // Get total number of pages
  const totalPages = computed(() => {
    return Math.ceil(props.totalItems / props.selectedRowCount);
  });

  return {
    paginationClasses,
    handleSelectedItem,
    computeRowRange,
    computeSelectedRowCount,
    next,
    previous,
    disabledNext,
    disabledPrevious,
    dropdownSelection,
    dropdownId,
    currentPage,
    totalPages,
    showNumberOfRowsDropdown,
  };
};
