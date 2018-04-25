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
  templateRef: TemplateRef<any>;
}


export interface ThyPage {
  index?: number;
  size?: number;
  total?: number;
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





