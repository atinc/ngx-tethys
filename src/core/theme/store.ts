import { computed, Injectable, Signal, signal } from '@angular/core';
import { ThyTheme } from './enum';

@Injectable({
    providedIn: 'root'
})
export class ThyThemeStore {
    readonly theme = signal<ThyTheme>(ThyTheme.light);

    readonly isDark: Signal<boolean> = computed(() => {
        const theme = this.theme();
        return (
            theme === ThyTheme.dark ||
            (theme === ThyTheme.system && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
        );
    });

    constructor() {}

    setTheme(theme: ThyTheme) {
        this.theme.set(theme);
    }

    normalizeColor(color: string | string[]): string {
        if (typeof color === 'string') {
            return color;
        }
        if (Array.isArray(color)) {
            if (color.length === 1) {
                return color[0];
            }

            if (color.length > 1) {
                if (this.isDark()) {
                    return color[1];
                } else {
                    return color[0];
                }
            }
        }
    }
}
