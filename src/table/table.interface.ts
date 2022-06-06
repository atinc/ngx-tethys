import { EventEmitter, TemplateRef } from '@angular/core';

export enum ThyTableSortDirection {
    default = '',
    asc = 'asc',
    desc = 'desc'
}
export interface ThyTableColumn {
    key: string;
    model: string;
    title: string;
    type: string;
    selections: any;
    width: string | number;
    className: string;
    headerClassName: string;
    disabled: boolean;
    defaultText: string;
    expand: boolean;
    templateRef: TemplateRef<any>;
    headerTemplateRef: TemplateRef<any>;
    fixed?: 'left' | 'right';
    left?: number;
    right?: number;
    sortable?: boolean;
    sortDirection?: ThyTableSortDirection;
    sortChange?: EventEmitter<ThyTableSortEvent>;
}

export interface ThyPage {
    index?: number;
    size?: number;
    total?: number;
}

export interface ThyTableEmptyOptions {
    message?: string;
    translationKey?: string;
    translationValues?: any;
    entityName?: string;
    entityNameTranslateKey?: string;
    iconName?: string;
    size?: string;
    marginTop?: string;
    topAuto?: string;
    container?: TemplateRef<any>;
}

export type PageChangedEvent = ThyPageChangedEvent;
export interface ThyPageChangedEvent {
    itemsPerPage: number;
    page: number;
}

export interface ThyTableEvent {
    event: Event;
    row: any;
}

export interface ThyMultiSelectEvent extends ThyTableEvent {
    rows: any[];
}

export interface ThyRadioSelectEvent {
    event: Event;
    row: any;
}

export interface ThySwitchEvent extends ThyTableEvent {
    refresh?: Function;
}

export interface ThyTableDraggableEvent {
    oldIndex?: number;
    newIndex?: number;
    model?: any;
    models?: Array<any>;
    [key: string]: any;
}

export interface ThyTableSortEvent {
    event: Event;
    key: string;
    direction: ThyTableSortDirection;
}

export interface ThyTableRowEvent {
    event: Event;
    row: any;
}
