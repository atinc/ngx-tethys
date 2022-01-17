import { TemplateRef } from '@angular/core';
import { TinyDate } from 'ngx-tethys/util';

export type DisabledDateFn = (d: Date) => boolean;

export type DisabledTimePartial = 'start' | 'end';

export type PanelMode = 'decade' | 'year' | 'month' | 'date' | 'week';

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

export type RangePartType = 'left' | 'right';

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

export interface ShortcutOptionInfo {
    key?: string;
    title: string;
    value: number | Date | TinyDate | RangeEntry;
    isRange?: boolean;
}

export type ShortcutPosition = 'left' | 'bottom';

export enum ShortcutType {
    today = 'today',
    yesterday = 'yesterday',
    recentSevenDays = 'recentSevenDays',
    recentThirtyDays = 'recentThirtyDays',
    thisWeek = 'thisWeek',
    thisMonth = 'thisMonth',
    recentSixMonths = 'recentSixMonths'
}

export const ShortcutOptions: ShortcutOptionInfo[] = [
    {
        key: ShortcutType.today,
        title: '今天',
        value: new TinyDate().getTime()
    },
    {
        key: ShortcutType.yesterday,
        title: '昨天',
        value: new TinyDate().getTime() - 3600 * 1000 * 24
    },
    {
        key: ShortcutType.yesterday,
        title: '7 天前',
        value: new TinyDate().getTime() - 3600 * 1000 * 24 * 7
    },
    {
        key: ShortcutType.recentSevenDays,
        title: '最近 7 天',
        value: { begin: new TinyDate().getTime() - 3600 * 1000 * 24 * 6, end: new TinyDate().getTime() },
        isRange: true
    },
    {
        key: ShortcutType.recentThirtyDays,
        title: '最近 30 天',
        value: {
            begin: new TinyDate().getTime() - 3600 * 1000 * 24 * 29,
            end: new TinyDate().getTime()
        },
        isRange: true
    },
    {
        key: ShortcutType.thisWeek,
        title: '本周',
        value: {
            begin: new TinyDate().startOfWeek({ weekStartsOn: 1 }).getTime(),
            end: new TinyDate().getTime()
        },
        isRange: true
    },
    {
        key: ShortcutType.thisMonth,
        title: '本月',
        value: {
            begin: new TinyDate().startOfMonth().getTime(),
            end: new TinyDate().getTime()
        },
        isRange: true
    }
];
