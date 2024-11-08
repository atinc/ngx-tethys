import { ThyDatePickerConfigService } from './date-picker.service';
import { DEFAULT_DATE_PICKER_CONFIG, THY_DATE_PICKER_CONFIG } from './date-picker.config';
import { TestBed } from '@angular/core/testing';

describe('thyDatePickerConfigService Angular testing', () => {
    let thyDatePickerConfigService: ThyDatePickerConfigService;
    const { showShortcut, shortcutPosition, shortcutDatePresets, shortcutRangesPresets, weekStartsOn, timestampPrecision } =
        DEFAULT_DATE_PICKER_CONFIG;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: THY_DATE_PICKER_CONFIG,
                    useValue: DEFAULT_DATE_PICKER_CONFIG
                }
            ]
        });
        thyDatePickerConfigService = TestBed.inject(ThyDatePickerConfigService);
    });

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

    it('get default timestampPrecision', () => {
        expect(thyDatePickerConfigService.timestampPrecision).toBe(timestampPrecision);
    });
});
