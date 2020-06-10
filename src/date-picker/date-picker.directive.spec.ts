import { ESCAPE } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { ThyDatePickerModule } from './date-picker.module';
import { dispatchMouseEvent, dispatchKeyboardEvent } from '../core/testing';
import { ThyPopover } from '../popover/popover.service';
import { DatePopupComponent } from './lib/popups/date-popup.component';
import { ThyPropertyOperationModule, ThyPropertyOperationComponent } from '../property-operation';
import { ThyDatePickerDirective } from './date-picker.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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

@Component({
    template: `
        <thy-property-operation
            thyLabelText="开始时间"
            thyIcon="calendar-check"
            thyDatePicker
            [(ngModel)]="thyValue"
            [thyMinDate]="thyMinDate"
            [thyMaxDate]="thyMaxDate"
            [thyDefaultPickerValue]="thyDefaultPickerValue"
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
    thyOnChange(): void {}
    thyOnCalendarChange(): void {}
    thyOpenChange(): void {}

    thyOnPanelChange(): void {}

    thyOnOk(): void {}
}
