import { Inject, Injectable, Optional } from '@angular/core';
import { DEFAULT_DATE_PICKER_CONFIG, ThyDatePickerConfig, THY_DATE_PICKER_CONFIG_TOKEN } from './date-picker.config';

/**
 * @private
 */
@Injectable()
export class ThyDatePickerConfigService {
    private config: ThyDatePickerConfig;

    constructor(@Optional() @Inject(THY_DATE_PICKER_CONFIG_TOKEN) config: ThyDatePickerConfig) {
        this.config = Object.assign({}, DEFAULT_DATE_PICKER_CONFIG, config);
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
