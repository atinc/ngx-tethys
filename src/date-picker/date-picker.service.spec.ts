import { ThyDatePickerConfigService } from './date-picker.service';
import { DEFAULT_DATE_PICKER_CONFIG } from './date-picker.config';

describe('thyDatePickerConfigService Angular testing', () => {
    let thyDatePickerConfigService: ThyDatePickerConfigService = new ThyDatePickerConfigService(DEFAULT_DATE_PICKER_CONFIG);
    const { showShortcut, shortcutPosition, shortcutDatePresets, shortcutRangesPresets, weekStartsOn } = DEFAULT_DATE_PICKER_CONFIG;

    it('get default shortcut', () => {
        expect(thyDatePickerConfigService.showShortcut).toBe(showShortcut);
    });

    it('get default shortcut position', () => {
        expect(thyDatePickerConfigService.shortcutPosition).toBe(shortcutPosition);
    });

    it('get default shortcut date presets', () => {
        expect(thyDatePickerConfigService.shortcutDatePresets).toBe(shortcutDatePresets);
    });

    it('get default shortcut ranges presets', () => {
        expect(thyDatePickerConfigService.shortcutRangesPresets).toBe(shortcutRangesPresets);
    });

    it('get default weekStartsOn', () => {
        expect(thyDatePickerConfigService.config.weekStartsOn).toBe(weekStartsOn);
    });
});
