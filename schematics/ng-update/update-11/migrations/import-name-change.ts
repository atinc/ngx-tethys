import { ImportNameChangeBase } from '../../../class';

export class ImportNameChangeMigrationByNg11 extends ImportNameChangeBase {
    readonly relation = {
        ThyGridModule: 'ThyTableModule',
        ThyGridColumn: 'ThyTableColumn',
        ThyGridEmptyOptions: 'ThyTableEmptyOptions',
        ThyGridEvent: 'ThyTableEvent',
        ThyGridDraggableEvent: 'ThyTableDraggableEvent',
        ThyGridRowEvent: 'ThyTableRowEvent',
        IThyGridColumnParentComponent: 'IThyTableColumnParentComponent',
        ThyGridTheme: 'ThyTableTheme',
        ThyGridMode: 'ThyTableMode',
        ThyGridSize: 'ThyTableSize',
        ThyGridComponent: 'ThyTableComponent',
        THY_GRID_COLUMN_PARENT_COMPONENT: 'THY_TABLE_COLUMN_PARENT_COMPONENT',
        ThyGridColumnComponent: 'ThyTableColumnComponent'
    };
}
