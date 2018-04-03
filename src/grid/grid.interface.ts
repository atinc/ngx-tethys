import { TemplateRef } from '@angular/core';

export interface ThyGridColumn {
  key: string;
  model: string;
  label: string;
  type: string;
  width: string | number;
  className: string;
  headerClassName: string;
  disabled: boolean;
  templateRef: TemplateRef<any>;
}


export interface ThyMultiSelectEvent {
  event: Event;
  rows: any[];
}

export interface ThyRadioSelectEvent {
  event: Event;
  row: any;
}




