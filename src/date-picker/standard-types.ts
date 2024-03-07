import { TemplateRef } from '@angular/core';
import { CompatibleValue } from './inner-types';

export type DisabledDateFn = (d: Date) => boolean;

export type ThyPanelMode = 'decade' | 'year' | 'month' | 'date' | 'week' | 'flexible' | 'quarter';

export type CompatibleDate = Date | Date[];

export type CompatiblePresets = ThyShortcutPreset[] | (() => ThyShortcutPreset[]);

export type ThyShortcutPosition = 'left' | 'bottom';

export type ThyDateGranularity = 'year' | 'quarter' | 'month' | 'day';

export type ThyShortcutValue = number | Date | (() => number | Date);

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

export interface DateEntry {
    date: number | null | Date;
    with_time: 0 | 1;
}

export interface ThyDateRangeEntry {
    begin: number | null | Date;
    end: number | null | Date;
    granularity?: ThyDateGranularity;
}

export interface ThyShortcutPreset {
    title: string;
    value?: ThyShortcutValue | [ThyShortcutValue, ThyShortcutValue];
    disabled?: boolean;
}

export interface ThyDateChangeEvent {
    value: CompatibleValue;
    triggerPreset?: ThyShortcutPreset;
}
