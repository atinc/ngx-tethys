import { TemplateRef } from '@angular/core';

export interface ThyGridColumn {
  key: string;
  model: string;
  title: string;
  type: string;
  width: string | number;
  className: string;
  headerClassName: string;
  disabled: boolean;
  templateRef: TemplateRef<any>;
}


export interface ThyPage {
  index?: number;
  size?: number;
  total?: number;
}

export interface ThyPageEvent {
  event: Event;
  page: any;
}

export interface ThyMultiSelectEvent {
  event: Event;
  row: any;
  rows: any[];
}

export interface ThyRadioSelectEvent {
  event: Event;
  row: any;
}





