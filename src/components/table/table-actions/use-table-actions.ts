import type { SetupContext } from 'vue';

import type { TableActionEmitTypes } from '@/components/table/table-actions/table-actions';

export const useTableActions = (emit: SetupContext<TableActionEmitTypes>['emit']) => {
  const tableActionsBaseClasses = 'mc-h-max mc-p-size-spacing-2xs mc-flex mc-justify-between' as const;
  const inputSearchClasses = 'mc-w-full' as const;
  const searchFilterClasses = 'mc-size-[30%] mc-flex mc-gap-size-spacing-2xs' as const;

  const updateSearchField = (value: string) => {
    emit('update:searchModel', value);
  };

  return {
    tableActionsBaseClasses,
    inputSearchClasses,
    searchFilterClasses,
    updateSearchField,
  };
};
