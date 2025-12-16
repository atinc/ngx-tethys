import { TinyDate } from 'ngx-tethys/util';

import { TemplateRef } from '@angular/core';
import { SafeAny } from 'ngx-tethys/types';

export interface DateCell {
    trackByIndex?: SafeAny;
    value?: Date;
    label?: string;
    title: string;
    dateCellRender?: TemplateRef<Date> | string;
    fullCellRender?: TemplateRef<Date> | string;
    content: string;
    isSelected?: boolean;
    isToday?: boolean;
    isDisabled?: boolean;
    isStartSingle?: boolean;
    isEndSingle?: boolean;
    isSelectedStartDate?: boolean;
    isSelectedEndDate?: boolean;
    isLastMonthCell?: boolean;
    isNextMonthCell?: boolean;
    isInRange?: boolean;
    classMap?: object | null;
    onClick(date?: TinyDate): void;
    onMouseEnter(): void;
}

export interface YearCell extends DateCell {
    isSameDecade?: boolean;
}

export interface DecadeCell extends DateCell {
    isBiggerThanEnd?: boolean;
    isLowerThanStart?: boolean;
}

export interface DateBodyRow {
    trackByIndex?: SafeAny;
    isCurrent?: boolean; // Is the week that today stays in
    isActive?: boolean; // Is the week that current setting date stays in
    weekNum?: number;
    year?: number;
    classMap?: object;
    dateCells: DateCell[];
}
