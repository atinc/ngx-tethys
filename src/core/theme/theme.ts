import { inject } from '@angular/core';
import { ThyThemeStore } from './store';

export const enum ThyTheme {
    light = 'light',
    dark = 'dark',
    system = 'system'
}

export function injectPanelEmptyIcon() {
    const thyThemeStore = inject(ThyThemeStore);
    return thyThemeStore.isDark() ? 'preset-light' : '';
}
