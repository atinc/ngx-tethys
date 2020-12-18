import { TemplateRef } from '@angular/core';

export interface ThyGridColumn {
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
}

export interface ThyPage {
    index?: number;
    size?: number;
    total?: number;
}

export interface ThyGridEmptyOptions {
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
export interface PageChangedEvent {
    itemsPerPage: number;
    page: number;
}
export interface ThyGridEvent {
    event: Event;
    row: any;
}

export interface ThyMultiSelectEvent extends ThyGridEvent {
    rows: any[];
}

export interface ThyRadioSelectEvent {
    event: Event;
    row: any;
}

export interface ThySwitchEvent extends ThyGridEvent {
    refresh?: Function;
}

export interface ThyGridDraggableEvent {
    oldIndex?: number;
    newIndex?: number;
    model?: any;
    models?: Array<any>;
    [key: string]: any;
}

export interface ThyGridRowEvent {
    event: Event;
    row: any;
}
