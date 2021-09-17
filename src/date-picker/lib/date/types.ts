import { TinyDate } from 'ngx-tethys/util';

import { TemplateRef } from '@angular/core';

export interface WeekDayLabel {
    short: string;
    veryShort: string;
}

export interface DateCell {
    value: Date;
    label: string;
    title: string;
    dateCellRender: TemplateRef<Date> | string;
    fullCellRender?: TemplateRef<Date> | string;
    content: string;
    isSelected?: boolean;
    isToday?: boolean;
    isDisabled?: boolean;
    isSelectedStartDate?: boolean;
    isSelectedEndDate?: boolean;
    isInRange?: boolean;
    classMap?: object;
    onClick(date: TinyDate): void;
    onMouseEnter(): void;
}

export interface WeekRow {
    isCurrent?: boolean; // Is the week that today stays in
    isActive?: boolean; // Is the week that current setting date stays in
    weekNum?: number;
    year?: number;
    classMap?: object;
    dateCells: DateCell[];
}
