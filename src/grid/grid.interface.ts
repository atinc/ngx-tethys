import { TemplateRef } from "@angular/core";

export interface GridColumn {
  key: string,
  model: string,
  label: string,
  type: string,
  width: string | number,
  className: string,
  headerClassName: string,
  disabled: boolean,
  template: TemplateRef<any>
}




