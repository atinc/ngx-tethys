import { Inject, Injectable } from '@angular/core';
import { DEFAULT_DATE_PICKER_CONFIG, ThyDatePickerConfig, THY_DATE_PICKER_CONFIG } from './date-picker.config';

/**
 * @private
 */
@Injectable()
export class ThyDatePickerConfigService {
    private config: ThyDatePickerConfig;

    constructor(@Inject(THY_DATE_PICKER_CONFIG) config: ThyDatePickerConfig) {
         this.config = {
            ...DEFAULT_DATE_PICKER_CONFIG,
            ...config
        };
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
}
