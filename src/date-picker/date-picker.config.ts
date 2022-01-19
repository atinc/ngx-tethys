import { InjectionToken } from '@angular/core';
import { TinyDate } from 'ngx-tethys/util';
import { ShortcutPosition, ShortcutRange } from './standard-types';

export interface ThyDatePickerConfig {
    shortcutPosition: ShortcutPosition;
    shortcutRanges: ShortcutRange[];
    showShortcut: boolean;
}

export const DEFAULT_DATE_PICKER_CONFIG = {
    shortcutPosition: 'left',
    showShortcut: false,
    shortcutRanges: [
        {
            title: '最近 7 天',
            begin: () => new TinyDate().startOfDay().getTime() - 3600 * 1000 * 24 * 6,
            end: () => new TinyDate().endOfDay().getTime()
        },
        {
            title: '最近 30 天',

            begin: () => new TinyDate().startOfDay().getTime() - 3600 * 1000 * 24 * 29,
            end: () => new TinyDate().endOfDay().getTime()
        },
        {
            title: '本周',

            begin: () => new TinyDate().startOfWeek({ weekStartsOn: 1 }).getTime(),
            end: () => new TinyDate().endOfDay().getTime()
        },
        {
            title: '本月',
            begin: () => new TinyDate().startOfMonth().getTime(),
            end: () => new TinyDate().endOfDay().getTime()
        }
    ]
};

export const THY_DATE_PICKER_CONFIG_TOKEN = new InjectionToken<ThyDatePickerConfig>('thy-date-picker-config');
