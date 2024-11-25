import { ThyDatePickerConfigService } from './date-picker.service';
import { THY_DATE_PICKER_CONFIG, useDatePickerDefaultConfig } from './date-picker.config';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { ThyI18nService } from 'ngx-tethys/i18n';
import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { ThyShortcutPreset } from './standard-types';

describe('thyDatePickerConfigService Angular testing', () => {
    let thyDatePickerConfigService: ThyDatePickerConfigService;

    function run(fn: Function): void {
        runInInjectionContext(TestBed.inject(EnvironmentInjector), () => {
            fn();
        });
    }

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: THY_DATE_PICKER_CONFIG,
                    useFactory: useDatePickerDefaultConfig,
                    deps: [ThyI18nService]
                },
                ThyDatePickerConfigService
            ]
        });

        thyDatePickerConfigService = TestBed.inject(ThyDatePickerConfigService);
    }));

    it('get default config', () => {
        run(() => {
            const defaultOptions = useDatePickerDefaultConfig();

            expect(thyDatePickerConfigService.showShortcut).toBe(defaultOptions.showShortcut);

            expect(thyDatePickerConfigService.shortcutPosition).toBe(defaultOptions.shortcutPosition);

            // expect((thyDatePickerConfigService.shortcutDatePresets as () => ThyShortcutPreset[])()).toEqual(
            //     (defaultOptions.shortcutDatePresets as () => ThyShortcutPreset[])()
            // );

            // expect((thyDatePickerConfigService.shortcutRangesPresets as () => ThyShortcutPreset[])()).toEqual(
            //     (defaultOptions.shortcutRangesPresets as () => ThyShortcutPreset[])()
            // );

            expect(thyDatePickerConfigService.config.weekStartsOn).toBe(defaultOptions.weekStartsOn);

            expect(thyDatePickerConfigService.timestampPrecision).toBe(defaultOptions.timestampPrecision);
        });
    });
});
