import { ref, computed, toRefs, Slots, watch, onMounted, toRef } from 'vue';

import type {
  TablePropTypes,
  TableEmitTypes,
  TABLE_SORT,
  TableData,
  TableDataProps,
  Header,
  SortableDragEvent,
} from './table';
import type { SetupContext } from 'vue';

import classNames from 'classnames';
import type { DragOptions } from './use-draggable-table-rows';
import type { SortableEvent } from 'sortablejs';

export const useTable = (props: TablePropTypes, emit: SetupContext<TableEmitTypes>['emit'], slots: Slots) => {
  const {
    dataTable,
    action,
    headers,
    sortOrder,
    fullHeight,
    selectedKeyId,
    returnCompleteSelectedProperties,
    allowSelfDrag,
    isDraggable,
  } = toRefs(props);
  const sortField = ref('');
  const searchField = ref(props.searchModel);
  const tableSortOrder = ref<TABLE_SORT>(sortOrder.value);
  const selectAll = ref(false);
  const selectedData = ref<TableData[]>([]);
  const tableData = ref<TableData[]>([]);
  const tableKey = ref(0);
  const isDragging = ref(false);

  const isAllSelected = computed(() => {
    if (selectedData.value.length === 0) return false;
    return selectedData.value.length === sortedData.value.length;
  });

  const isIndeterminate = computed(() => {
    if (selectedData.value.length === 0) return false;
    return selectedData.value.length > 0 && selectedData.value.length < sortedData.value.length;
  });

  const sortedData = computed(() => {
    if (!sortField.value || sortOrder?.value) return dataTable.value;
    const sorted = [...dataTable.value].sort((a, b) => {
      const fieldA = extractLowerCasedTitle(a[sortField.value]);
      const fieldB = extractLowerCasedTitle(b[sortField.value]);

      if (fieldA < fieldB) return tableSortOrder.value === 'asc' ? -1 : 1;
      if (fieldA > fieldB) return tableSortOrder.value === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  });

  const isTouchDevice = computed(() => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  });

  const dragOptions = computed(() => {
    let options: DragOptions = {
      animation: isTouchDevice.value ? 70 : 250,
      disabled: !isDraggable.value,
      handle: '.table-row-drag-icon',
      sort: allowSelfDrag.value,
      forceFallback: isTouchDevice.value,
      onStart: (evt: SortableEvent) => {
        isDragging.value = true;
        if (isTouchDevice.value) {
          setDraggedItemDataInLocalStorage(evt.item.dataset.id!);
        }
      },
      onEnd: () => {
        isDragging.value = false;
        if (isTouchDevice.value) {
          clearDraggedItemDataInLocalStorage();
        }

        if (tableData.value.length === 0) {
          tableKey.value = tableKey.value + 1;
        }
      },
      onAdd: (evt: SortableEvent) => {
        const typedEvt = evt as SortableDragEvent;
        const draggedItem = isTouchDevice.value
          ? JSON.parse(localStorage.getItem('draggedItem') || '{}')
          : JSON.parse(typedEvt.originalEvent.dataTransfer?.getData('draggedItem') || '{}');

        if (!draggedItem || Object.keys(draggedItem).length === 0) return;

        const newData = [...tableData.value];
        newData.splice(evt.newIndex!, 0, draggedItem);
        tableData.value = newData;
        if (tableData.value.length > 0) {
          tableKey.value = tableKey.value + 1;
        }

        emit('onDragAdd', { element: draggedItem, newIndex: evt.newIndex!, updatedList: newData });
      },
      onRemove: (evt: SortableEvent) => {
        const removedData = tableData.value.find((item) => item.id === evt.item.dataset.id);
        const newData = [...tableData.value];
        if (!removedData) return;

        newData.splice(evt.oldIndex!, 1);
        tableData.value = newData;

        emit('onDragRemove', { element: removedData, oldIndex: evt.oldIndex!, updatedList: newData });
      },
      setData: (dataTransfer: DataTransfer, dragEl: HTMLElement) => {
        const draggedItemData = tableData.value.find((item) => dragEl.dataset.id === item.id);
        if (!draggedItemData) return;
        dataTransfer.setData('draggedItem', JSON.stringify(draggedItemData));
      },
    };

    if (tableData.value.length > 0) {
      options = {
        ...options,
        group: {
          name: 'table',
          pull: true,
          put: true,
        },
      };
    } else {
      options = {
        ...options,
        ghostClass: 'empty-table-dropzone-dragged-class',
        group: {
          name: 'table',
          pull: false,
          put: true,
        },
      };
    }

    return options;
  });

  const setDraggedItemDataInLocalStorage = (itemId: string) => {
    const draggedItemData = tableData.value.find((item) => item.id === itemId) ?? null;
    if (!draggedItemData) return;
    localStorage.setItem('draggedItem', JSON.stringify(draggedItemData));
  };

  const clearDraggedItemDataInLocalStorage = () => {
    if (localStorage.getItem('draggedItem')) {
      localStorage.removeItem('draggedItem');
    }
  };

  const sortData = (field: string) => {
    if (sortField.value === field) {
      tableSortOrder.value = tableSortOrder.value === 'asc' ? 'desc' : 'asc';
    } else {
      sortField.value = field;
      tableSortOrder.value = 'asc';
    }

    emit('onSort', { field: field, sortOrder: tableSortOrder.value });
  };

  const getSortIcon = (field: string) => {
    if (sortField.value !== field) {
      return 'ph:caret-up-down-light';
    }

    return tableSortOrder.value === 'asc' ? 'ph:arrow-up' : 'ph:arrow-down';
  };

  const getHeaderCount = computed(() => (action.value ? headers.value.length + 1 : headers.value.length));

  const updateSearchField = (value: string) => {
    emit('update:searchModel', value);
  };

  const hasTableActions = computed(
    () => props.tableActions.search || props.tableActions.filter || props.tableActions.option,
  );

  const handleRowClick = (rowData: TableData, rowKey: number) => {
    if (props.isRowClickable) {
      emit('onRowClick', rowData, rowKey);
    }
  };

  const getEmptyStateSize = computed(() => {
    return fullHeight.value ? 'large' : 'small';
  });

  // Value is currently either a string, an object with a title property, or an array of objects with a title property
  const extractLowerCasedTitle = (value: string | { title: string } | Array<{ title: string }>) => {
    if (typeof value === 'string') return value.toLowerCase();
    else if (typeof value === 'object' && !Array.isArray(value) && value !== null) return value.title.toLowerCase();
    else if (Array.isArray(value) && value.length > 0) return value[0].title.toLowerCase();
    return '';
  };

  const getTableClasses = computed(() => {
    const tableWrapperClasses = classNames(
      'mc-flex mc-flex-col mc-h-full mc-border-color-weak mc-w-full mc-overflow-auto mc-rounded-border-radius-lg mc-border mc-border-solid mc-table-wrapper mc-relative mc-font-main',
      {
        'mc-overflow-hidden': isDraggable.value,
        'mc-overflow-auto': !isDraggable.value,
      },
    );
    const tableFooterClasses = classNames('mc-w-full mc-bottom-0 mc-left-0', {
      'mc-background-color-surface': props.variant === 'surface',
      'mc-background-color': props.variant === 'white',
    });
    const headerBackground = classNames({
      'mc-background-color': props.variant === 'white',
      'mc-background-color-surface': props.variant === 'surface',
    });
    const headerClasses = (header: Header | null) => {
      if (header?.customTailwindClasses) {
        return classNames(header.customTailwindClasses);
      }

      return classNames(
        'mc-min-h-12 mc-px-size-spacing-2xs mc-py-size-spacing-3xs mc-relative',
        'mc-text-color-strong mc-font-size-100 mc-font-line-height-100 mc-font-letter-spacing-normal mc-text-start mc-font-medium mc-uppercase',
        'mc-border-color-weak mc-border-x-0 mc-border-y mc-border-solid',
        {
          'mc-border-t-0': !slots.default,
        },
        headerBackground,
      );
    };

    const headerNameClass = 'mc-flex mc-flex-row mc-items-center mc-gap-size-spacing-5xs';

    const defaultSlotClasses = classNames({
      'mc-px-size-spacing-sm mc-py-size-spacing-xs': !!slots.default,
    });

    const tableHeaderActionsClasses = 'mc-border-color-weak mc-w-full mc-border mc-border-solid';
    const tableCellSlotClasses =
      'mc-background-color-surface mc-text-color-strong mc-font-size-100 mc-font-line-height-100 mc-font-letter-spacing-normal mc-uppercase';
    const tableRowClasses = classNames('mc-min-h-[60px]', {
      'mc-cursor-pointer': props.isRowClickable,
    });
    const tableDataClasses =
      'mc-border-color-weak mc-overflow-hidden mc-border-x-0 mc-border-b mc-border-t-0 mc-border-solid mc-p-3';
    const tableRowActionClasses =
      'mc-border-color-weak mc-overflow-hidden mc-border-x-0 mc-border-b mc-border-t-0 mc-border-solid mc-p-3';
    const tableRowDragIconClasses =
      'mc-border-color-weak mc-overflow-hidden mc-border-x-0 mc-border-b mc-border-t-0 mc-border-solid mc-w-[5%] mc-cursor-pointer mc-px-[6px]';

    const tableBackgroundClasses = classNames('mc-h-full');

    const tableBodyClasses = classNames({
      'mc-overflow-y-auto mc-h-full': fullHeight.value,
      'mc-h-[250px]': !fullHeight.value && slots.footer,
      'mc-h-[360px]': !fullHeight.value && !slots.footer,
    });

    const emptyStateBaseClasses = classNames({
      'mc-overflow-y-hidden mc-h-[calc(90vh-150px)] md:mc-h-[calc(80vh-150px)] sm:mc-h-[calc(70vh-150px)]':
        fullHeight.value && slots.footer, // Adjust tbody height for header/footer
      'mc-overflow-y-auto mc-h-[75vh]': fullHeight.value && !slots.footer, // Adjust tbody height for header/footer
      'mc-h-[250px]': !fullHeight.value && slots.footer,
      'mc-h-[360px]': !fullHeight.value && !slots.footer,
    });

    const multiselectRowClass = classNames(
      'mc-border-color-weak mc-border-x-0 mc-border-b mc-border-t-0 mc-border-solid',
    );

    const multiselectClass = classNames('mc-px-size-spacing-2xs mc-py-size-spacing-3xs mc-w-[44px]');

    const emptyStateClasses = classNames(`${emptyStateBaseClasses} ${props.emptyStateCustomClasses}`);
    const tableActionSlotClasses = classNames(`${defaultSlotClasses} ${props.tableActionSlotCustomClasses}`);

    return {
      headerClasses,
      tableWrapperClasses,
      defaultSlotClasses,
      tableHeaderActionsClasses,
      headerNameClass,
      tableCellSlotClasses,
      multiselectRowClass,
      multiselectClass,

      tableRowClasses,
      tableDataClasses,
      tableRowActionClasses,
      tableBackgroundClasses,
      tableBodyClasses,
      tableFooterClasses,
      emptyStateClasses,
      tableActionSlotClasses,
      tableRowDragIconClasses,
    };
  });

  //assert type TableDataProps
  const sortedDataItem = (rowIndex: number, headerField: string) => {
    return tableData.value[rowIndex][headerField] as TableDataProps;
  };

  const isTableDataObject = (data: TableDataProps) => {
    return typeof data === 'object' && 'title' in data;
  };

  const handleSelect = (item: TableData) => {
    if (!selectedKeyId.value || !(selectedKeyId.value in item)) return;

    const selectedIndex = selectedData.value.findIndex((data) => {
      const typedData = data[selectedKeyId.value] as TableDataProps;
      const typedItemData = item[selectedKeyId.value] as TableDataProps;

      if (isTableDataObject(typedData) && isTableDataObject(typedItemData)) {
        return typedData.title === typedItemData.title;
      } else {
        return data[selectedKeyId.value] === item[selectedKeyId.value];
      }
    });

    if (selectedIndex !== -1) {
      selectedData.value.splice(selectedIndex, 1);
    } else {
      selectedData.value.push(item);
    }

    emitSelectedData();
  };

  const handleSelectAll = () => {
    if (isAllSelected.value || isIndeterminate.value) {
      selectedData.value = [];
    } else {
      selectedData.value = [...sortedData.value];
    }

    emitSelectedData();
  };

  const isRowSelected = (item: TableData) => {
    if (!selectedKeyId.value || !(selectedKeyId.value in item)) return false;

    return selectedData.value.some((data) => {
      const typedData = data[selectedKeyId.value] as TableDataProps;
      const typedItemData = item[selectedKeyId.value] as TableDataProps;
      if (isTableDataObject(typedData) && isTableDataObject(typedItemData)) {
        return typedData.title === typedItemData.title;
      } else {
        return data[selectedKeyId.value] === item[selectedKeyId.value];
      }
    });
  };

  const emitSelectedData = () => {
    if (returnCompleteSelectedProperties.value) {
      emit('update:selectedData', selectedData.value);
    } else {
      const mappedData = selectedData.value.map((item) => {
        const typedItem = item[selectedKeyId.value] as TableDataProps | string | number;
        if (typeof typedItem === 'object') {
          return { ...typedItem };
        } else {
          return typedItem;
        }
      });
      emit('update:selectedData', mappedData);
    }
  };

  const getRowKey = (element: TableData, index: number) => {
    return (element.id as string | number) || index;
  };

  watch(sortedData, (newVal) => {
    tableData.value = [...newVal];

    if (props.isMultiSelect && selectedData.value.length > 0 && !props.retainSelectionOnDataChange) {
      // Remove items from selectedData that are not in the new sortedData
      // This is to ensure that the selectedData is always in sync with the sortedData

      newVal.forEach((item) => {
        const selectedIndex = selectedData.value.findIndex((data) => {
          const typedSelectedData = data[selectedKeyId.value] as TableDataProps;
          const typedSortedData = item[selectedKeyId.value] as TableDataProps;

          if (isTableDataObject(typedSelectedData) && isTableDataObject(typedSortedData)) {
            return typedSelectedData.title === typedSortedData.title;
          } else {
            return data[selectedKeyId.value] === item[selectedKeyId.value];
          }
        });

        if (selectedIndex === -1) {
          selectedData.value.splice(selectedIndex, 1);
        }
      });
    }
  });

  const clearSelectedData = () => {
    selectedData.value = [];
  };

  onMounted(() => {
    if (sortedData.value.length > 0) {
      tableData.value = [...sortedData.value];
    }
  });

  return {
    sortData,
    updateSearchField,
    handleRowClick,
    handleSelect,
    handleSelectAll,
    sortedData,
    getHeaderCount,
    hasTableActions,
    searchField,
    getTableClasses,
    getEmptyStateSize,
    selectAll,
    selectedData,
    isAllSelected,
    isRowSelected,
    isIndeterminate,
    sortedDataItem,
    getSortIcon,
    sortField,
    allowSelfDrag,
    tableData,
    isDraggable,
    dragOptions,
    getRowKey,
    isDragging: toRef(() => isDragging.value),
    tableKey,
    clearSelectedData,
  };
};
