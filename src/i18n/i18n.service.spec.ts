import { Component, EnvironmentInjector, inject, runInInjectionContext, Signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
    enUsLocale,
    injectLocale,
    THY_I18N_EN_US,
    THY_I18N_LOCALE_ID,
    THY_I18N_ZH_HANS,
    ThyCalendarLocale,
    ThyGuiderLocale,
    ThyI18nLocale,
    ThyI18nService,
    zhHansLocale
} from 'ngx-tethys/i18n';

@Component({ template: 'thy-i18n-test' })
export class ThyI18nTestComponent {
    i18n = inject(ThyI18nService);

    locale: Signal<ThyI18nLocale> = injectLocale();

    calendarLocale: Signal<ThyCalendarLocale> = injectLocale('calendar');

    guiderLocale: Signal<ThyGuiderLocale> = injectLocale('guider');
}

describe('I18n', () => {
    let fixture: ComponentFixture<ThyI18nTestComponent>;
    let testComponent: ThyI18nTestComponent;

    describe('ThyI18nService', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({});
            TestBed.compileComponents();
        });

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyI18nTestComponent);
            testComponent = fixture.debugElement.componentInstance;
        });

        it('should has default value for locale', () => {
            expect(testComponent.locale().id).toContain('zh');
        });

        it('should support get locale', () => {
            const locale = testComponent.i18n.getLocale();
            expect(locale().id).toContain('zh');
        });

        it('should support set locale', () => {
            testComponent.i18n.setLocale('en-us');
            expect(testComponent.locale().id).toBe('en-us');
        });
    });

    describe('global configure', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [
                    {
                        provide: THY_I18N_LOCALE_ID,
                        useValue: 'en-us'
                    },
                    {
                        provide: THY_I18N_ZH_HANS,
                        useValue: {
                            ...zhHansLocale,
                            calendar: {
                                ...zhHansLocale.calendar,
                                today: '今日'
                            }
                        }
                    },
                    {
                        provide: THY_I18N_EN_US,
                        useValue: {
                            ...enUsLocale,
                            guider: {
                                ...enUsLocale.guider,
                                next: 'next'
                            }
                        }
                    }
                ]
            }).compileComponents();
        });

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyI18nTestComponent);
            testComponent = fixture.debugElement.componentInstance;
        });

        function run(fn: Function): void {
            runInInjectionContext(TestBed.inject(EnvironmentInjector), () => {
                fn();
            });
        }

        it('should support global configure default locale', () => {
            run(() => {
                const defaultLocaleId = inject(THY_I18N_LOCALE_ID);
                expect(defaultLocaleId).toBe('en-us');
                expect(testComponent.locale().id).toBe('en-us');
            });
        });

        it('should use zh-hans when set zh-cn', () => {
            run(() => {
                testComponent.i18n.setLocale('zh-ch');
                expect(testComponent.calendarLocale().today).toBe('今日');
            });
        });

        it('should support global rewrite zh-Hans locale', () => {
            run(() => {
                const zhHans = inject(THY_I18N_ZH_HANS);
                expect(zhHans.calendar.today).toBe('今日');

                testComponent.i18n.setLocale('zh-hans');
                expect(testComponent.calendarLocale().today).toBe('今日');
                expect(testComponent.calendarLocale().yearMonthFormat).toBe('yyyy年MM月');
            });
        });

        it('should support global rewrite en-US locale', () => {
            run(() => {
                const enUs = inject(THY_I18N_EN_US);
                expect(enUs.guider.next).toBe('next');

                testComponent.i18n.setLocale('en-us');
                expect(testComponent.guiderLocale().next).toBe('next');
            });
        });
    });
});
