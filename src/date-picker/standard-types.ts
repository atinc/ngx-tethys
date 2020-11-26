import { TemplateRef } from '@angular/core';
import { TinyDate } from 'ngx-tethys/util';

export type DisabledDateFn = (d: Date) => boolean;

export type DisabledTimePartial = 'start' | 'end';

export type PanelMode = 'decade' | 'year' | 'month' | 'date';

export type CompatibleValue = TinyDate[] | TinyDate;

export type CompatibleDate = Date | Date[];

export type DisabledTimeFn = (current: Date | Date[], partial?: DisabledTimePartial) => DisabledTimeConfig;

export interface DateEntry {
    date: number | null | Date;
    with_time: 0 | 1;
}

export interface RangeEntry {
    begin: number | null | Date;
    end: number | null | Date;
}

export type DateType = number | DateEntry;

export function instanceOfDateEntry(object: DateEntry): object is DateEntry {
    return isSupportDateType(object, 'date') && typeof object.with_time === 'number';
}

export function instanceOfRangeEntry(object: RangeEntry): object is RangeEntry {
    return isSupportDateType(object, 'begin') && isSupportDateType(object, 'end');
}

function isSupportDateType(object: DateEntry | RangeEntry, key: string) {
    return typeof object[key] === 'number' || object[key] === null || object[key] instanceof Date;
}

export interface DisabledTimeConfig {
    thyDisabledHours(): number[];
    thyDisabledMinutes(hour: number): number[];
    thyDisabledSeconds(hour: number, minute: number): number[];
}

export interface SupportTimeOptions {
    thyFormat?: string;
    thyHourStep?: number;
    thyMinuteStep?: number;
    thySecondStep?: number;
    thyUse12Hours?: boolean;
    thyHideDisabledOptions?: boolean;
    thyDefaultOpenValue?: Date;
    thyAddOn?: TemplateRef<void>;
    thyDisabledHours?(): number[];
    thyDisabledMinutes?(hour: number): number[];
    thyDisabledSeconds?(hour: number, minute: number): number[];
}
