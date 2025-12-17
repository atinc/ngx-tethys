import { Injectable, inject } from '@angular/core';
import { THY_DATE_PICKER_CONFIG, ThyDatePickerConfig, useDatePickerDefaultConfig } from './date-picker.config';

@Injectable({ providedIn: 'root' })
export class ThyDatePickerConfigService {
    config!: ThyDatePickerConfig;

    constructor() {
        const datePickerConfig = inject(THY_DATE_PICKER_CONFIG, { optional: true })!;

        this.config = { ...useDatePickerDefaultConfig(), ...datePickerConfig };
    }

    get shortcutDatePresets() {
        return this.config.shortcutDatePresets;
    }

    get shortcutPosition() {
        return this.config.shortcutPosition;
    }

    get showShortcut() {
        return this.config.showShortcut;
    }
    get shortcutRangesPresets() {
        return this.config.shortcutRangesPresets;
    }

    get timestampPrecision() {
        return this.config.timestampPrecision;
    }

    get separator() {
        return this.config.separator.trim();
    }
}
