import { TemplateRef } from '@angular/core';
import { TinyDate } from 'ngx-tethys/util';

export type DisabledDateFn = (d: Date) => boolean;

export type DisabledTimePartial = 'start' | 'end';

export type ThyPanelMode = 'decade' | 'year' | 'month' | 'date' | 'week' | 'flexible';

/**
 * @deprecated please use ThyPanelMode
 */
export type PanelMode = ThyPanelMode;

export type CompatibleValue = TinyDate[] | TinyDate;

export type CompatibleDate = Date | Date[];

export type DisabledTimeFn = (current: Date | Date[], partial?: DisabledTimePartial) => DisabledTimeConfig;

export interface DateEntry {
    date: number | null | Date;
    with_time: 0 | 1;
}

export interface ThyDateRangeEntry {
    begin: number | null | Date;
    end: number | null | Date;
    granularity?: ThyDateGranularity;
}

/**
 * @deprecated please use ThyDateRangeEntry
 */
export type RangeEntry = ThyDateRangeEntry;

export type DateType = number | DateEntry;

export type RangePartType = 'left' | 'right';

export function instanceOfDateEntry(object: DateEntry): object is DateEntry {
    return isSupportDateType(object, 'date') && typeof object.with_time === 'number';
}

export function instanceOfRangeEntry(object: ThyDateRangeEntry): object is ThyDateRangeEntry {
    return isSupportDateType(object, 'begin') && isSupportDateType(object, 'end');
}

export function instanceOfCompatibleValue(object: CompatibleValue): object is CompatibleValue {
    return object instanceof TinyDate || object[0] instanceof TinyDate;
}

export function instanceOfRangeAdvancedValue(object: RangeAdvancedValue): object is RangeAdvancedValue {
    return object['begin'] instanceof TinyDate && object['end'] instanceof TinyDate;
}

function isSupportDateType(object: DateEntry | ThyDateRangeEntry, key: string) {
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

export interface ThyShortcutRange {
    title: string;
    begin: number | Date | (() => number | Date);
    end: number | Date | (() => number | Date);
}

export type ThyShortcutPosition = 'left' | 'bottom';

export interface ThyShortcutValueChange {
    value: CompatibleValue;
    triggerRange: ThyShortcutRange;
}

export type ThyDateGranularity = 'year' | 'quarter' | 'month' | 'day';

export type DatePickerFlexibleTab = 'custom' | 'advanced';

export interface AdvancedSelectableCell {
    type: ThyDateGranularity;
    content?: string;
    startValue?: TinyDate;
    endValue?: TinyDate;
    isInRange?: boolean;
    isOutRange?: boolean;
    classMap?: object;
}

export interface RangeAdvancedValue {
    dateGranularity?: ThyDateGranularity;
    begin?: TinyDate;
    end?: TinyDate;
}
