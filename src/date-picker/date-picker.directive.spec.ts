import { of } from 'rxjs';

import { OverlayContainer } from '@angular/cdk/overlay';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { dispatchMouseEvent } from '../core/testing';
import { ThyPopover } from '../popover/popover.service';
import { ThyPropertyOperationComponent, ThyPropertyOperationModule } from '../property-operation';
import { ThyDatePickerDirective } from './date-picker.directive';
import { ThyDatePickerModule } from './date-picker.module';
import { DatePopupComponent } from './lib/popups/date-popup.component';

registerLocaleData(zh);

describe('ThyPickerDirective', () => {
    let fixture: ComponentFixture<ThyTestPickerDirective>;
    let fixtureInstance: ThyTestPickerDirective;
    let debugElement: DebugElement;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;
    let popover: ThyPopover;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ThyDatePickerModule, ThyPropertyOperationModule, BrowserAnimationsModule],
            declarations: [ThyTestPickerDirective]
        });

        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyTestPickerDirective);
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
            expect(queryFromOverlay('.thy-calendar-year-select').textContent.includes('2021')).toBeTruthy();
            expect(queryFromOverlay('.thy-calendar-month-select').textContent.includes('10')).toBeTruthy();
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
            const previousCell = getSelectedDayCell().previousElementSibling;
            expect(previousCell.classList.contains('thy-calendar-disabled-cell')).toBeTruthy();
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
    });

    describe('popover config testing', () => {
        it('should get correct thyPlacement and offset and hasBackdrop', fakeAsync(() => {
            const thyPopover = TestBed.get(ThyPopover);
            const spy = spyOn(thyPopover, 'open');
            spy.and.returnValue({ componentInstance: { valueChange: of(), showTimePickerChange: of(), ngOnChanges: () => {} } });

            fixture.detectChanges();
            openPickerByClickTrigger();

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(DatePopupComponent, {
                origin: debugElement.nativeElement.childNodes[0],
                hasBackdrop: true,
                backdropClass: 'thy-overlay-transparent-backdrop',
                offset: 4,
                initialState: {
                    isRange: false,
                    showWeek: false,
                    value: null,
                    showTime: undefined,
                    mustShowTime: undefined,
                    format: undefined,
                    dateRender: undefined,
                    disabledDate: undefined,
                    placeholder: '请选择日期',
                    className: undefined,
                    defaultPickerValue: undefined,
                    minDate: undefined,
                    maxDate: undefined
                },
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
                initialState: {
                    isRange: false,
                    showWeek: false,
                    value: null,
                    showTime: undefined,
                    mustShowTime: undefined,
                    format: undefined,
                    dateRender: undefined,
                    disabledDate: undefined,
                    placeholder: '请选择日期',
                    className: undefined,
                    defaultPickerValue: undefined,
                    minDate: undefined,
                    maxDate: undefined
                },
                placement: fixtureInstance.thyPlacement
            });
        }));

        it('should use options when open popover', fakeAsync(() => {
            const thyPopover = TestBed.get(ThyPopover);
            const spy = spyOn(thyPopover, 'open');
            spy.and.returnValue({ componentInstance: { valueChange: of(), showTimePickerChange: of(), ngOnChanges: () => {} } });
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
                        initialState: {
                            isRange: false,
                            showWeek: false,
                            value: null,
                            showTime: undefined,
                            mustShowTime: undefined,
                            format: undefined,
                            dateRender: undefined,
                            disabledDate: undefined,
                            placeholder: '请选择日期',
                            className: undefined,
                            defaultPickerValue: undefined,
                            minDate: undefined,
                            maxDate: undefined
                        },
                        placement: fixtureInstance.thyPlacement
                    },
                    {
                        hasBackdrop: false,
                        outsideClosable: true,
                        originActiveClass: 'popover-origin-active'
                    }
                )
            );
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
});

describe('should get correct default thyPlacement and offset', () => {
    let fixture: ComponentFixture<ThyTestPickerPlacementDirective>;
    let fixtureInstance: ThyTestPickerPlacementDirective;
    let debugElement: DebugElement;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;
    let popover: ThyPopover;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ThyDatePickerModule, ThyPropertyOperationModule, BrowserAnimationsModule],
            declarations: [ThyTestPickerPlacementDirective]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyTestPickerPlacementDirective);
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
            const thyPopover = TestBed.get(ThyPopover);
            const spy = spyOn(thyPopover, 'open');
            spy.and.returnValue({ componentInstance: { valueChange: of(), showTimePickerChange: of(), ngOnChanges: () => {} } });

            fixture.detectChanges();
            openPickerByClickTrigger();

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(DatePopupComponent, {
                origin: debugElement.nativeElement.childNodes[0],
                hasBackdrop: true,
                backdropClass: 'thy-overlay-transparent-backdrop',
                offset: 4,
                initialState: {
                    isRange: false,
                    showWeek: false,
                    value: null,
                    showTime: undefined,
                    mustShowTime: false,
                    format: undefined,
                    dateRender: undefined,
                    disabledDate: undefined,
                    placeholder: '请选择日期',
                    className: undefined,
                    defaultPickerValue: null,
                    minDate: undefined,
                    maxDate: undefined
                },
                placement: 'bottomLeft'
            });
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
            [thyPlacement]="thyPlacement"
            [thyHasBackdrop]="thyHasBackdrop"
            [thyPopoverOptions]="popoverOptions"
        ></thy-property-operation>
    `
})
class ThyTestPickerDirective {
    @ViewChild(ThyDatePickerDirective, { static: true, read: false }) thyDatePickerDirective: ThyDatePickerDirective;

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
    popoverOptions;
    thyOnChange(): void {}
    thyOnCalendarChange(): void {}
    thyOpenChange(): void {}

    thyOnPanelChange(): void {}

    thyOnOk(): void {}
}

@Component({
    template: `
        <thy-property-operation thyLabelText="开始时间" thyDatePicker></thy-property-operation>
    `
})
class ThyTestPickerPlacementDirective {}
