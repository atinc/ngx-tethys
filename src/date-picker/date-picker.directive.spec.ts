import { dispatchMouseEvent } from 'ngx-tethys/testing';
import { of } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { addDays, addWeeks, startOfDay, startOfWeek } from 'date-fns';
import { provideHttpClient } from '@angular/common/http';
import { TinyDate } from 'ngx-tethys/util';
import { ThyPopover, ThyPopoverConfig, ThyPopoverModule } from 'ngx-tethys/popover';
import { ThyPropertyOperation } from 'ngx-tethys/property-operation';
import { ThyDatePickerDirective, DatePopup, CompatiblePresets, ThyShortcutPosition } from 'ngx-tethys/date-picker';

registerLocaleData(zh);

describe('ThyPickerDirective', () => {
    describe('ThyPickerDirective', () => {
        let fixture: ComponentFixture<ThyTestPickerComponent> | undefined = undefined;
        let fixtureInstance: ThyTestPickerComponent | undefined = undefined;
        let debugElement: DebugElement | undefined = undefined;
        let overlayContainer: OverlayContainer | undefined = undefined;
        let overlayContainerElement: HTMLElement | undefined = undefined;
        let popover: ThyPopover | undefined = undefined;

        beforeEach(fakeAsync(() => {
            TestBed.configureTestingModule({
                imports: [ThyPopoverModule],
                providers: [provideHttpClient(), provideAnimations()]
            });

            TestBed.compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyTestPickerComponent);
            fixtureInstance = fixture.componentInstance;
            debugElement = fixture.debugElement;
        });

        beforeEach(inject([OverlayContainer, ThyPopover], (oc: OverlayContainer, _popover: ThyPopover) => {
            overlayContainer = oc;
            popover = _popover;
            overlayContainerElement = oc.getContainerElement();
        }));

        afterEach(() => {
            overlayContainer.ngOnDestroy();
        });

        describe('general api testing', () => {
            it('should support thyDefaultPickerValue', fakeAsync(() => {
                fixtureInstance.thyDefaultPickerValue = new Date('2021-10-10');
                fixture.detectChanges();
                openPickerByClickTrigger();
                expect(getSelectedDayCell().textContent.trim()).toBe('10');
                expect(queryFromOverlay('.thy-calendar-year-btn').textContent.includes('2021')).toBeTruthy();
                expect(queryFromOverlay('.thy-calendar-month-btn').textContent.includes('10')).toBeTruthy();
            }));

            it('should support thyMaxDate', fakeAsync(() => {
                fixtureInstance.thyValue = new Date('2021-10-10 10:00');
                fixtureInstance.thyMaxDate = new Date('2021-10-10');
                fixture.detectChanges();
                openPickerByClickTrigger();
                const selectedCell = getSelectedDayCell();
                expect(selectedCell.classList.contains('thy-calendar-disabled-cell')).toBeFalsy();
                const disabledCell = queryFromOverlay('tbody.thy-calendar-tbody td.thy-calendar-disabled-cell');
                expect(disabledCell.textContent.trim()).toBe('11');
            }));

            it('should support thyMinDate', fakeAsync(() => {
                fixtureInstance.thyValue = new Date('2021-10-11 11:00');
                fixtureInstance.thyMinDate = new Date('2021-10-11');
                fixture.detectChanges();
                openPickerByClickTrigger();
                const selectedCell = getSelectedDayCell();
                expect(selectedCell.classList.contains('thy-calendar-disabled-cell')).toBeFalsy();
                const disabledCells = overlayContainerElement.querySelectorAll('tbody.thy-calendar-tbody td.thy-calendar-disabled-cell');
                const lastDisabledCell = disabledCells[disabledCells.length - 1];
                expect(lastDisabledCell.textContent.trim()).toBe('10');
            }));

            it('should support thyDisabled', fakeAsync(() => {
                // fixtureInstance.thyAllowClear = true;
                fixtureInstance.thyValue = new Date();

                fixtureInstance.thyDisabled = true;
                fixture.detectChanges();
                flush();
                fixture.detectChanges();
                expect(debugElement.query(By.css('thy-picker .thy-input-disabled'))).toBeDefined();
                expect(debugElement.query(By.css('thy-picker thy-icon.thy-calendar-picker-clear'))).toBeNull();

                fixtureInstance.thyDisabled = false;
                tick(500);
                fixture.detectChanges();
                expect(debugElement.query(By.css('thy-picker .thy-input-disabled'))).toBeNull();
                expect(debugElement.query(By.css('thy-picker thy-icon.thy-calendar-picker-clear'))).toBeDefined();
            }));

            it('should support thyShowTime', fakeAsync(() => {
                // fixtureInstance.thyAllowClear = true;
                fixtureInstance.thyValue = new Date();

                fixtureInstance.thyShowTime = true;
                fixture.detectChanges();
                flush();
                fixture.detectChanges();
                expect(debugElement.query(By.css('thy-picker .thy-input-disabled'))).toBeDefined();
                expect(debugElement.query(By.css('thy-picker thy-icon.thy-calendar-picker-clear'))).toBeNull();
            }));

            it('should support thyShowShortcut', fakeAsync(() => {
                fixtureInstance.thyShowShortcut = true;
                fixture.detectChanges();
                dispatchClickEvent(getPickerTriggerWrapper());
                fixture.detectChanges();
                expect(queryFromOverlay('.thy-calendar-picker-shortcut')).toBeTruthy();
            }));

            it('should support thyShortcutPosition', fakeAsync(() => {
                fixtureInstance.thyShowShortcut = true;
                fixtureInstance.thyShortcutPosition = 'bottom';
                fixture.detectChanges();
                dispatchClickEvent(getPickerTriggerWrapper());
                fixture.detectChanges();
                expect(queryFromOverlay('.thy-calendar-picker-shortcut-bottom')).toBeTruthy();
            }));

            it('should support more thyShortcutPresets', fakeAsync(() => {
                fixtureInstance.thyShowShortcut = true;
                fixtureInstance.thyShortcutPresets = [
                    {
                        title: '2022-01-29',
                        value: new Date('2022-01-29').getTime()
                    }
                ];
                fixture.detectChanges();
                dispatchClickEvent(getPickerTriggerWrapper());
                fixture.detectChanges();
                const shortcutItems = overlayContainerElement.querySelectorAll('.thy-calendar-picker-shortcut-item');
                expect((shortcutItems[shortcutItems.length - 1] as HTMLElement).innerText).toBe('2022-01-29');
            }));

            it('should disable shortcut item whose preset is out of thyMinDate ~ thyMaxDate', fakeAsync(() => {
                fixtureInstance.thyShowShortcut = true;
                fixtureInstance.thyMinDate = startOfDay(addDays(new Date(), 1));
                fixture.detectChanges();

                dispatchClickEvent(getPickerTriggerWrapper());
                fixture.detectChanges();

                const shortcutItems = overlayContainerElement.querySelectorAll('.thy-calendar-picker-shortcut-item');

                const todayItem = shortcutItems[0];
                const tomorrowItem = shortcutItems[1];
                expect(todayItem.classList.contains('disabled')).toBe(true);
                expect(tomorrowItem.classList.contains('disabled')).toBe(false);
            }));

            it('should support thyDateChange', fakeAsync(() => {
                fixtureInstance.thyShowShortcut = true;
                const thyDateChange = spyOn(fixtureInstance, 'thyDateChange');
                fixture.detectChanges();
                dispatchClickEvent(getPickerTriggerWrapper());
                const shortcutItems = overlayContainerElement.querySelectorAll('.thy-calendar-picker-shortcut-item');
                dispatchMouseEvent(shortcutItems[0], 'click');
                fixture.detectChanges();
                tick(500);
                fixture.detectChanges();
                expect(thyDateChange).toHaveBeenCalled();
            }));

            it('should timestampPrecision default to seconds', fakeAsync(() => {
                fixtureInstance.thyShowShortcut = true;
                const datePresets = shortcutDatePresets();
                const dateValue = new TinyDate(datePresets[0].value).getUnixTime();
                const triggerPreset = Object.assign(datePresets[0], { value: dateValue, disabled: false });
                const thyDateChange = spyOn(fixtureInstance, 'thyDateChange');
                const now = new TinyDate(new Date());
                fixture.detectChanges();
                dispatchClickEvent(getPickerTriggerWrapper());
                const shortcutItems = overlayContainerElement.querySelectorAll('.thy-calendar-picker-shortcut-item');
                dispatchMouseEvent(shortcutItems[0], 'click');
                fixture.detectChanges();
                tick(500);
                fixture.detectChanges();
                expect(thyDateChange).toHaveBeenCalledTimes(1);
                expect(thyDateChange).toHaveBeenCalledWith({
                    value: now.startOfDay(),
                    triggerPreset: triggerPreset
                });
            }));

            it('should support thyTimestampPrecision set milliseconds', fakeAsync(() => {
                fixtureInstance.thyShowShortcut = true;
                fixtureInstance.timestampPrecision = 'milliseconds';
                const datePresets = shortcutDatePresets();
                const dateValue = new TinyDate(datePresets[0].value).getTime();
                const triggerPreset = Object.assign(datePresets[0], { value: dateValue, disabled: false });
                const thyDateChange = spyOn(fixtureInstance, 'thyDateChange');
                const now = new TinyDate(new Date());
                fixture.detectChanges();
                dispatchClickEvent(getPickerTriggerWrapper());
                const shortcutItems = overlayContainerElement.querySelectorAll('.thy-calendar-picker-shortcut-item');
                dispatchMouseEvent(shortcutItems[0], 'click');
                fixture.detectChanges();
                tick(500);
                fixture.detectChanges();
                expect(thyDateChange).toHaveBeenCalledTimes(1);
                expect(thyDateChange).toHaveBeenCalledWith({
                    value: now.startOfDay(),
                    triggerPreset: triggerPreset
                });
            }));
        });

        describe('popover config testing', () => {
            it('should get correct thyPlacement and offset and hasBackdrop', fakeAsync(() => {
                const spy = getPopoverOpenSpy();

                fixture.detectChanges();
                openPickerByClickTrigger();

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith(DatePopup, {
                    origin: debugElement.nativeElement.childNodes[0],
                    hasBackdrop: true,
                    backdropClass: 'thy-overlay-transparent-backdrop',
                    outsideClosable: true,
                    offset: 4,
                    initialState: getInitState(),
                    placement: 'bottomLeft'
                });

                fixtureInstance.thyOffset = 0;
                fixtureInstance.thyPlacement = 'right';
                fixtureInstance.thyHasBackdrop = false;
                fixture.detectChanges();
                openPickerByClickTrigger();

                expect(spy).toHaveBeenCalledWith(DatePopup, {
                    origin: debugElement.nativeElement.childNodes[0],
                    hasBackdrop: false,
                    backdropClass: 'thy-overlay-transparent-backdrop',
                    outsideClosable: true,
                    offset: fixtureInstance.thyOffset,
                    initialState: getInitState(),
                    placement: fixtureInstance.thyPlacement
                });
            }));

            it('should use correct options when open popover', fakeAsync(() => {
                const spy = getPopoverOpenSpy();
                fixtureInstance.thyOffset = 0;
                fixtureInstance.thyPlacement = 'right';
                fixtureInstance.thyHasBackdrop = false;
                fixtureInstance.popoverOptions = {
                    hasBackdrop: false,
                    outsideClosable: true,
                    originActiveClass: 'popover-origin-active'
                };
                fixture.detectChanges();
                expect(spy).not.toHaveBeenCalled();
                openPickerByClickTrigger();

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith(
                    DatePopup,
                    Object.assign(
                        {
                            origin: debugElement.nativeElement.childNodes[0],
                            hasBackdrop: false,
                            backdropClass: 'thy-overlay-transparent-backdrop',
                            offset: fixtureInstance.thyOffset,
                            initialState: getInitState(),
                            placement: fixtureInstance.thyPlacement
                        },
                        {
                            hasBackdrop: false,
                            outsideClosable: true,
                            originActiveClass: 'popover-origin-active'
                        }
                    )
                );

                fixtureInstance.thyDatePickerDirective.isRange = true;
                fixtureInstance.thyDatePickerDirective.panelMode = ['decade', 'week'];

                fixture.detectChanges();
                openPickerByClickTrigger();
                expect(fixtureInstance.thyDatePickerDirective.panelMode).toEqual(['date', 'date']);
            }));
        });

        function getPickerTriggerWrapper() {
            const element = debugElement.query(By.directive(ThyPropertyOperation)).nativeElement;
            return element;
        }

        function getSelectedDayCell(): HTMLElement {
            return queryFromOverlay('tbody.thy-calendar-tbody td.thy-calendar-selected-day') as HTMLElement;
        }

        function queryFromOverlay(selector: string): HTMLElement {
            return overlayContainerElement.querySelector(selector) as HTMLElement;
        }

        function openPickerByClickTrigger(): void {
            dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
        }
        function dispatchClickEvent(selector: HTMLElement | HTMLInputElement): void {
            dispatchMouseEvent(selector, 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
        }

        const shortcutDatePresets = () => {
            return [
                {
                    title: '今天',
                    value: startOfDay(new Date()).getTime()
                },
                {
                    title: '下周',
                    value: startOfWeek(addWeeks(new Date(), 1), { weekStartsOn: 1 }).getTime()
                }
            ];
        };
    });

    describe('should get correct default thyPlacement and offset', () => {
        let fixture: ComponentFixture<ThyTestPickerPlacementComponent> | undefined = undefined;
        let fixtureInstance: ThyTestPickerPlacementComponent | undefined = undefined;
        let debugElement: DebugElement | undefined = undefined;
        let overlayContainer: OverlayContainer | undefined = undefined;
        let overlayContainerElement: HTMLElement | undefined = undefined;
        let popover: ThyPopover | undefined = undefined;

        beforeEach(fakeAsync(() => {
            TestBed.configureTestingModule({
                imports: [ThyPopoverModule],
                providers: [provideHttpClient(), provideAnimations()]
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyTestPickerPlacementComponent);
            fixtureInstance = fixture.componentInstance;
            debugElement = fixture.debugElement;
        });

        beforeEach(inject([OverlayContainer, ThyPopover], (oc: OverlayContainer, _popover: ThyPopover) => {
            overlayContainer = oc;
            popover = _popover;
            overlayContainerElement = oc.getContainerElement();
        }));

        afterEach(() => {
            overlayContainer.ngOnDestroy();
        });

        describe('should get correct default thyPlacement and offset and hasBackdrop', () => {
            it('should get correct default thyPlacement and offset and hasBackdrop', fakeAsync(() => {
                const spy = getPopoverOpenSpy();

                fixture.detectChanges();
                openPickerByClickTrigger();

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith(DatePopup, {
                    origin: debugElement.nativeElement.childNodes[0],
                    hasBackdrop: true,
                    backdropClass: 'thy-overlay-transparent-backdrop',
                    outsideClosable: true,
                    offset: 4,
                    initialState: {
                        ...getInitState(),
                        defaultPickerValue: null,
                        showShortcut: undefined,
                        timestampPrecision: 'seconds'
                    },
                    placement: 'bottom'
                });
            }));
        });

        describe('should Date Popup Component enablePrevNext', () => {
            it('should Date Popup Component enablePrevNext', fakeAsync(() => {
                const popoverRef = popover.open(DatePopup, {
                    origin: debugElement.nativeElement.childNodes[0],
                    hasBackdrop: true,
                    backdropClass: 'thy-overlay-transparent-backdrop',
                    offset: 4,
                    initialState: {
                        ...getInitState(),
                        defaultPickerValue: null,
                        isRange: true
                    },
                    placement: 'bottom'
                });
                const componentInstance = popoverRef.componentInstance;
                componentInstance.clearFlexibleValue();
                componentInstance.onDayHover(componentInstance.tplInnerPopup);
                componentInstance.setProperty('key', 1);
                expect(componentInstance.hasTimePicker).toBe(false);
                expect(componentInstance.enablePrevNext('prev', 'right')).toBe(true);
                expect(componentInstance.enablePrevNext('prev', 'left')).toBe(true);
            }));
        });

        function getPickerTriggerWrapper() {
            const element = debugElement.query(By.directive(ThyPropertyOperation)).nativeElement;
            return element;
        }

        function openPickerByClickTrigger(): void {
            dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
        }
    });

    function getPopoverOpenSpy() {
        const thyPopover = TestBed.inject(ThyPopover);
        const spy = spyOn(thyPopover, 'open');
        spy.and.returnValue({
            componentInstance: { valueChange: of(), calendarChange: of(), showTimePickerChange: of(), ngOnChanges: () => {} },
            afterOpened: () => of(),
            afterClosed: () => of()
        });

        return spy;
    }

    function getInitState(): {} {
        return {
            isRange: false,
            showWeek: false,
            value: null,
            panelMode: 'date',
            showTime: false,
            mustShowTime: undefined,
            format: undefined,
            dateRender: undefined,
            disabledDate: undefined,
            placeholder: undefined,
            className: undefined,
            defaultPickerValue: undefined,
            minDate: undefined,
            maxDate: undefined,
            showShortcut: false,
            shortcutPresets: undefined,
            shortcutPosition: 'left',
            flexible: false,
            flexibleDateGranularity: undefined,
            timestampPrecision: undefined
        };
    }
});

@Component({
    template: `
        <thy-property-operation
            thyLabelText="开始时间"
            thyIcon="calendar-check"
            thyDatePicker
            [thyDisabled]="thyDisabled"
            [(ngModel)]="thyValue"
            [thyMinDate]="thyMinDate"
            [thyMaxDate]="thyMaxDate"
            [thyDefaultPickerValue]="thyDefaultPickerValue"
            [thyOffset]="thyOffset"
            [thyPlaceHolder]="thyPlaceHolder"
            [thyPlacement]="thyPlacement"
            [thyHasBackdrop]="thyHasBackdrop"
            [thyPopoverOptions]="popoverOptions"
            [thyShowTime]="thyShowTime"
            [thyTimestampPrecision]="timestampPrecision"
            [thyShowShortcut]="thyShowShortcut"
            (thyDateChange)="thyDateChange($event)"
            (ngModelChange)="thyOnChange($event)"
            [thyShortcutPosition]="thyShortcutPosition"
            [thyShortcutPresets]="thyShortcutPresets"></thy-property-operation>
    `,
    imports: [ThyPropertyOperation, ThyDatePickerDirective, FormsModule]
})
class ThyTestPickerComponent {
    @ViewChild(ThyDatePickerDirective, { read: false }) thyDatePickerDirective: ThyDatePickerDirective;
    thyPlaceHolder: string;
    thyPanelClassName: string;
    thyValue: Date | null;
    thyDefaultPickerValue: Date | number;
    thyMinDate: Date | number;
    thyMaxDate: Date | number;
    thyDateRender: any;
    thyShowTime: boolean | object = false;
    thyMode: string;
    thyDisabled: boolean;
    thyOffset = 4;
    thyPlacement = 'bottomLeft';
    thyHasBackdrop = true;
    popoverOptions: Partial<ThyPopoverConfig>;
    thyShowShortcut: boolean;
    thyShortcutPosition: ThyShortcutPosition = 'left';
    thyShortcutPresets: CompatiblePresets;
    timestampPrecision: 'seconds' | 'milliseconds';
    thyOnChange(): void {}
    thyOnCalendarChange(): void {}
    thyOpenChange(): void {}
    thyDateChange(): void {}
    thyOnPanelChange(): void {}

    thyOnOk(): void {}
}

@Component({
    template: `
        <thy-property-operation
            thyLabelText="开始时间"
            [thyShowTime]="thyShowTime"
            thyDatePicker
            [(ngModel)]="thyValue"></thy-property-operation>
    `,
    imports: [ThyPropertyOperation, ThyDatePickerDirective, FormsModule]
})
class ThyTestPickerPlacementComponent {
    thyValue: Date | null;
    thyShowTime: boolean | object = false;
}

@Component({
    template: `
        <div (click)="testStopPropagation()">
            <thy-property-operation thyLabelText="开始时间" thyDatePicker [thyStopPropagation]="thyStopPropagation">
            </thy-property-operation>
        </div>
    `,
    imports: [ThyPropertyOperation, ThyDatePickerDirective]
})
class ThyTestPickerStopPropagationComponent {
    thyStopPropagation = true;
    testStopPropagation = jasmine.createSpy('opened event spy callback');
}

describe('should get correct default thyStopPropagation', () => {
    let fixture: ComponentFixture<ThyTestPickerStopPropagationComponent> | undefined = undefined;
    let fixtureInstance: ThyTestPickerStopPropagationComponent | undefined = undefined;
    let debugElement: DebugElement | undefined = undefined;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyPopoverModule],
            providers: [provideHttpClient(), provideAnimations()]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyTestPickerStopPropagationComponent);
        fixtureInstance = fixture.componentInstance;
        debugElement = fixture.debugElement.query(By.css('thy-property-operation'));
        fixture.detectChanges();
    });

    it('should get correct default thyStopPropagation value', () => {
        debugElement.nativeElement.click();
        expect(fixtureInstance.testStopPropagation).toHaveBeenCalledTimes(0);
    });

    it('should propagation when thyStopPropagation is false', () => {
        fixtureInstance.thyStopPropagation = false;
        fixture.detectChanges();
        debugElement.nativeElement.click();
        expect(fixtureInstance.testStopPropagation).toHaveBeenCalledTimes(1);
    });
});
