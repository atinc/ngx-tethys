import { dispatchMouseEvent } from 'ngx-tethys/testing';
import { of } from 'rxjs';

import { OverlayContainer } from '@angular/cdk/overlay';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject, TestBed, TestBedStatic, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { addDays, startOfDay } from 'date-fns';

import { ThyPopover } from '../popover/popover.service';
import { ThyPropertyOperationComponent, ThyPropertyOperationModule } from '../property-operation';
import { ThyDatePickerDirective } from './date-picker.directive';
import { ThyDatePickerModule } from './date-picker.module';
import { DatePopupComponent } from './lib/popups/date-popup.component';
import { ThyPopoverConfig, ThyPopoverModule } from '../popover';
import { CompatiblePresets, ThyShortcutPosition } from './standard-types';

registerLocaleData(zh);

describe('ThyPickerDirective', () => {
    describe('ThyPickerDirective', () => {
        let fixture: ComponentFixture<ThyTestPickerComponent>;
        let fixtureInstance: ThyTestPickerComponent;
        let debugElement: DebugElement;
        let overlayContainer: OverlayContainer;
        let overlayContainerElement: HTMLElement;
        let popover: ThyPopover;

        beforeEach(fakeAsync(() => {
            TestBed.configureTestingModule({
                imports: [FormsModule, ThyDatePickerModule, ThyPropertyOperationModule, BrowserAnimationsModule],
                declarations: [ThyTestPickerComponent]
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
        });

        describe('popover config testing', () => {
            it('should get correct thyPlacement and offset and hasBackdrop', fakeAsync(() => {
                const spy = getPopoverOpenSpy(TestBed);

                fixture.detectChanges();
                openPickerByClickTrigger();

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith(DatePopupComponent, {
                    origin: debugElement.nativeElement.childNodes[0],
                    hasBackdrop: true,
                    backdropClass: 'thy-overlay-transparent-backdrop',
                    offset: 4,
                    initialState: getInitState(),
                    placement: 'bottomLeft'
                });

                fixtureInstance.thyOffset = 0;
                fixtureInstance.thyPlacement = 'right';
                fixtureInstance.thyHasBackdrop = false;
                fixture.detectChanges();
                openPickerByClickTrigger();

                expect(spy).toHaveBeenCalledWith(DatePopupComponent, {
                    origin: debugElement.nativeElement.childNodes[0],
                    hasBackdrop: false,
                    backdropClass: 'thy-overlay-transparent-backdrop',
                    offset: fixtureInstance.thyOffset,
                    initialState: getInitState(),
                    placement: fixtureInstance.thyPlacement
                });
            }));

            it('should use correct options when open popover', fakeAsync(() => {
                const spy = getPopoverOpenSpy(TestBed);
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
                    DatePopupComponent,
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
            const element = debugElement.query(By.directive(ThyPropertyOperationComponent)).nativeElement;
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
    });

    describe('should get correct default thyPlacement and offset', () => {
        let fixture: ComponentFixture<ThyTestPickerPlacementComponent>;
        let fixtureInstance: ThyTestPickerPlacementComponent;
        let debugElement: DebugElement;
        let overlayContainer: OverlayContainer;
        let overlayContainerElement: HTMLElement;
        let popover: ThyPopover;

        beforeEach(fakeAsync(() => {
            TestBed.configureTestingModule({
                imports: [FormsModule, ThyDatePickerModule, ThyPropertyOperationModule, BrowserAnimationsModule, ThyPopoverModule],
                declarations: [ThyTestPickerPlacementComponent]
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
                const spy = getPopoverOpenSpy(TestBed);

                fixture.detectChanges();
                openPickerByClickTrigger();

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith(DatePopupComponent, {
                    origin: debugElement.nativeElement.childNodes[0],
                    hasBackdrop: true,
                    backdropClass: 'thy-overlay-transparent-backdrop',
                    offset: 4,
                    initialState: { ...getInitState(), defaultPickerValue: null, showShortcut: undefined },
                    placement: 'bottom'
                });
            }));
        });

        describe('should Date Popup Component enablePrevNext', () => {
            it('should Date Popup Component enablePrevNext', fakeAsync(() => {
                const popoverRef = popover.open(DatePopupComponent, {
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
                let componentInstance = popoverRef.componentInstance;
                componentInstance.clearFlexibleValue();
                componentInstance.onDayHover(componentInstance.tplInnerPopup);
                componentInstance.setProperty('key', 1);
                expect(componentInstance.hasTimePicker).toBe(false);
                expect(componentInstance.enablePrevNext('prev', 'right')).toBe(true);
                expect(componentInstance.enablePrevNext('prev', 'left')).toBe(true);
            }));
        });

        function getPickerTriggerWrapper() {
            const element = debugElement.query(By.directive(ThyPropertyOperationComponent)).nativeElement;
            return element;
        }

        function openPickerByClickTrigger(): void {
            dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
        }
    });

    function getPopoverOpenSpy(testBed: TestBedStatic) {
        const thyPopover = testBed.get(ThyPopover);
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
            flexibleDateGranularity: undefined
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
            [thyShowShortcut]="thyShowShortcut"
            (thyDateChange)="thyDateChange($event)"
            (ngModelChange)="thyOnChange($event)"
            [thyShortcutPosition]="thyShortcutPosition"
            [thyShortcutPresets]="thyShortcutPresets"></thy-property-operation>
    `
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
    `
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
    `
})
class ThyTestPickerStopPropagationComponent {
    thyStopPropagation = true;
    testStopPropagation = jasmine.createSpy('opened event spy callback');
}

describe('should get correct default thyStopPropagation', () => {
    let fixture: ComponentFixture<ThyTestPickerStopPropagationComponent>;
    let fixtureInstance: ThyTestPickerStopPropagationComponent;
    let debugElement: DebugElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyDatePickerModule, ThyPropertyOperationModule, BrowserAnimationsModule],
            declarations: [ThyTestPickerStopPropagationComponent]
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
