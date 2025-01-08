import { InjectionToken, Signal } from '@angular/core';
import { injectLocale, ThyDatePickerLocale, ThyI18nService } from 'ngx-tethys/i18n';
import { addDays, addWeeks, startOfDay, startOfWeek, subDays, TinyDate, WeekDayIndex } from 'ngx-tethys/util';
import { CompatiblePresets, ThyShortcutPosition } from './standard-types';

export interface ThyDatePickerConfig {
    shortcutPosition: ThyShortcutPosition;
    shortcutDatePresets: CompatiblePresets;
    shortcutRangesPresets: CompatiblePresets;
    showShortcut: boolean;
    weekStartsOn: WeekDayIndex;
    timestampPrecision: 'seconds' | 'milliseconds';
}

/**
 * @deprecated
 */
export const DEFAULT_DATE_PICKER_CONFIG: ThyDatePickerConfig = {
    shortcutPosition: 'left',
    showShortcut: false,
    weekStartsOn: 1,
    timestampPrecision: 'seconds',
    shortcutDatePresets: () => {
        return [
            {
                title: '今天',
                value: startOfDay(new Date()).getTime()
            },
            {
                title: '明天',
                value: startOfDay(addDays(new Date(), 1)).getTime()
            },
            {
                title: '下周',
                value: startOfWeek(addWeeks(new Date(), 1), { weekStartsOn: 1 }).getTime()
            }
        ];
    },
    shortcutRangesPresets: () => {
        return [
            {
                title: '最近 7 天',
                value: [new TinyDate(subDays(new Date(), 6)).getTime(), new TinyDate().endOfDay().getTime()]
            },
            {
                title: '最近 30 天',
                value: [new TinyDate(subDays(new Date(), 29)).getTime(), new TinyDate().endOfDay().getTime()]
            },
            {
                title: '本周',
                value: [new TinyDate().startOfWeek({ weekStartsOn: 1 }).getTime(), new TinyDate().endOfWeek({ weekStartsOn: 1 }).getTime()]
            },
            {
                title: '本月',
                value: [new TinyDate().startOfMonth().getTime(), new TinyDate().endOfMonth().getTime()]
            }
        ];
    }
};

export const THY_DATE_PICKER_CONFIG = new InjectionToken<ThyDatePickerConfig>('thy-date-picker-config');

export function useDatePickerDefaultConfig(): ThyDatePickerConfig {
    const locale: Signal<ThyDatePickerLocale> = injectLocale('datePicker');

    return {
        shortcutPosition: 'left',
        showShortcut: false,
        weekStartsOn: 1,
        timestampPrecision: 'seconds',
        shortcutDatePresets: () => {
            return [
                {
                    title: locale().today,
                    value: startOfDay(new Date()).getTime()
                },
                {
                    title: locale().tomorrow,
                    value: startOfDay(addDays(new Date(), 1)).getTime()
                },
                {
                    title: locale().nextWeek,
                    value: startOfWeek(addWeeks(new Date(), 1), { weekStartsOn: 1 }).getTime()
                }
            ];
        },
        shortcutRangesPresets: () => {
            return [
                {
                    title: locale().lastSevenDays,
                    value: [new TinyDate(subDays(new Date(), 6)).getTime(), new TinyDate().endOfDay().getTime()]
                },
                {
                    title: locale().lastThirtyDays,
                    value: [new TinyDate(subDays(new Date(), 29)).getTime(), new TinyDate().endOfDay().getTime()]
                },
                {
                    title: locale().currentWeek,
                    value: [
                        new TinyDate().startOfWeek({ weekStartsOn: 1 }).getTime(),
                        new TinyDate().endOfWeek({ weekStartsOn: 1 }).getTime()
                    ]
                },
                {
                    title: locale().currentMonth,
                    value: [new TinyDate().startOfMonth().getTime(), new TinyDate().endOfMonth().getTime()]
                }
            ];
        }
    };
}

export const THY_DATE_PICKER_CONFIG_PROVIDER = {
    provide: THY_DATE_PICKER_CONFIG,
    useFactory: useDatePickerDefaultConfig,
    deps: [ThyI18nService]
};
