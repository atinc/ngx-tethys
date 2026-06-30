import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { provideTethys, withGlobalConfig } from 'ngx-tethys';
import { ThyI18nService } from 'ngx-tethys/i18n';
import { THY_DATE_PICKER_CONFIG, useDatePickerDefaultConfig, ThyDatePickerConfigService } from 'ngx-tethys/date-picker';

describe('thyDatePickerConfigService Angular testing', () => {
    let thyDatePickerConfigService!: ThyDatePickerConfigService;

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

describe('thyDatePickerConfigService flexiblePosition priority', () => {
    function configureTestingModule(options?: { globalFlexiblePosition?: boolean; configFlexiblePosition?: boolean }) {
        TestBed.configureTestingModule({
            providers: [
                ...(options && 'globalFlexiblePosition' in options
                    ? [
                          provideTethys(
                              withGlobalConfig({
                                  overlay: {
                                      flexiblePosition: options.globalFlexiblePosition
                                  }
                              })
                          )
                      ]
                    : []),
                {
                    provide: THY_DATE_PICKER_CONFIG,
                    useFactory: () => ({
                        ...useDatePickerDefaultConfig(),
                        ...(options && 'configFlexiblePosition' in options
                            ? {
                                  flexiblePosition: options.configFlexiblePosition
                              }
                            : {})
                    }),
                    deps: [ThyI18nService]
                },
                ThyDatePickerConfigService
            ]
        });
    }

    it('should use hardcoded flexiblePosition default when global and component config are unset', () => {
        configureTestingModule();

        expect(TestBed.inject(ThyDatePickerConfigService).flexiblePosition).toBe(true);
    });

    it('should use date picker config flexiblePosition before hardcoded default', () => {
        configureTestingModule({ configFlexiblePosition: false });

        expect(TestBed.inject(ThyDatePickerConfigService).flexiblePosition).toBe(false);
    });

    it('should use date picker config flexiblePosition before global flexiblePosition', () => {
        configureTestingModule({ globalFlexiblePosition: false, configFlexiblePosition: true });

        expect(TestBed.inject(ThyDatePickerConfigService).flexiblePosition).toBe(true);
    });
});