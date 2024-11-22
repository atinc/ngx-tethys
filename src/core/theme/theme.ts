import { computed, inject, Signal } from '@angular/core';
import { ThyThemeStore } from './store';

export const enum ThyTheme {
    light = 'light',
    dark = 'dark',
    system = 'system'
}

export function injectPanelEmptyIcon(): Signal<string> {
    const thyThemeStore = inject(ThyThemeStore);
    return computed(() => {
        return thyThemeStore.isDark() ? 'preset-light' : '';
    });
}
