import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, flush, inject, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { dispatchMouseEvent } from 'ngx-tethys/testing';
import { ThyDatePickerModule } from './date-picker.module';
import { TinyDate } from '../util';
import { ThyQuarterPickerComponent } from './quarter-picker.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ThyQuarterPickerComponent', () => {
    let fixture: ComponentFixture<TestQuarterPickerComponent>;
    let fixtureInstance: TestQuarterPickerComponent;
    let debugElement: DebugElement;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyDatePickerModule, FormsModule, NoopAnimationsModule],
            providers: [],
            declarations: [TestQuarterPickerComponent]
        });

        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestQuarterPickerComponent);
        fixtureInstance = fixture.componentInstance;
        debugElement = fixture.debugElement;
    });

    beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
        overlayContainer = oc;
        overlayContainerElement = oc.getContainerElement();
    }));

    afterEach(() => {
        overlayContainer.ngOnDestroy();
    });

    describe('general api testing', () => {
        it('should open by click and close by at outside', fakeAsync(() => {
            fixture.detectChanges();
            openPickerByClickTrigger();
            expect(getPickerContainer()).not.toBeNull();

            dispatchMouseEvent(queryFromOverlay('.cdk-overlay-backdrop'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(getPickerContainer()).toBeNull();
        }));

        it('should support thyAllowClear and work properly', fakeAsync(() => {
            const clearBtnSelector = By.css('thy-picker .thy-calendar-picker-clear .thy-icon');
            const date = new Date();
            fixtureInstance.thyValue = date;
            fixtureInstance.thyAllowClear = false;
            fixture.detectChanges();
            expect(debugElement.query(clearBtnSelector)).toBeFalsy();

            fixtureInstance.thyAllowClear = true;
            tick(500);
            fixture.detectChanges();
            expect(fixtureInstance.thyValue).toBe(date);
            expect(debugElement.query(clearBtnSelector)).toBeDefined();

            const thyOnChange = spyOn(fixtureInstance, 'modelValueChange');
            debugElement.query(clearBtnSelector).nativeElement.click();
            fixture.detectChanges();
            expect(fixtureInstance.thyValue).toBe(null);
            expect(thyOnChange).toHaveBeenCalledWith(null);
            expect(debugElement.query(clearBtnSelector)).toBeFalsy();
            flush();
        }));

        it('should support thyDisabled', fakeAsync(() => {
            // Make sure picker clear button shown up
            fixtureInstance.thyValue = new Date();

            fixtureInstance.thyDisabled = true;
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            expect(debugElement.query(By.css('thy-picker .thy-input-disabled'))).toBeDefined();

            fixtureInstance.thyDisabled = false;
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            expect(debugElement.query(By.css('.thy-picker .thy-input-disabled'))).toBeNull();
        }));

        it('should support thyDisabledDate', fakeAsync(() => {
            fixture.detectChanges();
            fixtureInstance.thyValue = new Date('2023-2-11'); // Q1
            fixture.detectChanges();
            fixtureInstance.thyDisabledDate = (date: Date) => {
                return date > new Date('2023-3-1');
            };
            fixture.detectChanges();
            dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            const allDisabledCells = queryFromOverlay('.thy-calendar-quarter-panel-cell-disabled');
            expect(allDisabledCells.textContent).toContain('Q2');
            flush();
        }));

        it('should support thyPlaceHolder', () => {
            const featureKey = (fixtureInstance.thyPlaceHolder = 'TEST_PLACEHOLDER');
            fixture.detectChanges();
            expect(getPickerTrigger().getAttribute('placeholder')).toBe(featureKey);
        });

        it('should support modelValueChange', fakeAsync(() => {
            fixture.detectChanges();
            fixtureInstance.thyValue = new Date('2018-11-1');
            fixture.detectChanges();
            const thyOnChange = spyOn(fixtureInstance, 'modelValueChange');
            fixture.detectChanges();
            openPickerByClickTrigger();

            const cell = getFirstQuarterCell(); // Use the first cell
            const cellText = 1;
            dispatchMouseEvent(cell, 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(thyOnChange).toHaveBeenCalled();
            const result = (thyOnChange.calls.allArgs()[0] as Date[])[0];
            expect(new TinyDate(result).getQuarter()).toBe(cellText);
        }));

        it('should support thyDateChange', fakeAsync(() => {
            const thyDateChange = spyOn(fixtureInstance, 'thyDateChange');
            fixture.detectChanges();
            openPickerByClickTrigger();
            const cell = getFirstQuarterCell();
            dispatchMouseEvent(cell, 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(thyDateChange).toHaveBeenCalled();
        }));
    });

    describe('panel switch and move forward/afterward', () => {
        it('should support year panel changes', fakeAsync(() => {
            fixtureInstance.thyValue = new Date('2023-11');
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            openPickerByClickTrigger();
            fixture.detectChanges();
            tick(500);
            // Click year select to show year panel
            dispatchMouseEvent(queryFromOverlay('.thy-calendar-month-btn'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(queryFromOverlay('.thy-calendar-year')).toBeDefined();
            expect(queryFromOverlay('.thy-calendar-year-btn').textContent).toContain('2020');
            expect(queryFromOverlay('.thy-calendar-year-btn').textContent).toContain('2029');
            // Goto previous year
            dispatchMouseEvent(queryFromOverlay('.thy-calendar-prev-year-btn'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(queryFromOverlay('.thy-calendar-year-btn').textContent).toContain('2010');
            expect(queryFromOverlay('.thy-calendar-year-btn').textContent).toContain('2019');
            // Goto next year * 2
            dispatchMouseEvent(queryFromOverlay('.thy-calendar-next-year-btn'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            dispatchMouseEvent(queryFromOverlay('.thy-calendar-next-year-btn'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(queryFromOverlay('.thy-calendar-year-btn').textContent).toContain('2030');
            expect(queryFromOverlay('.thy-calendar-year-btn').textContent).toContain('2039');
        }));

        it('should support decade panel changes', fakeAsync(() => {
            fixture.detectChanges();
            fixtureInstance.thyValue = new Date('2023-12-11');
            fixture.detectChanges();
            openPickerByClickTrigger();
            // Click to show decade panel
            dispatchMouseEvent(queryFromOverlay('.thy-calendar-month-btn'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            dispatchMouseEvent(queryFromOverlay('.thy-calendar-year-btn'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();

            expect(queryFromOverlay('.thy-calendar-decade')).toBeDefined();
            // Goto previous decade
            dispatchMouseEvent(queryFromOverlay('.thy-calendar-prev-year-btn'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(queryFromOverlay('.thy-calendar-decade-btn').textContent).toContain('1900');
            expect(queryFromOverlay('.thy-calendar-decade-btn').textContent).toContain('1999');
            // Goto next decade * 2
            dispatchMouseEvent(queryFromOverlay('.thy-calendar-next-year-btn'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            dispatchMouseEvent(queryFromOverlay('.thy-calendar-next-year-btn'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(queryFromOverlay('.thy-calendar-decade-btn').textContent).toContain('2100');
            expect(queryFromOverlay('.thy-calendar-decade-btn').textContent).toContain('2199');
        }));

        it('should set correct cell selected', fakeAsync(() => {
            fixtureInstance.thyValue = new Date('2023-12-12');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            openPickerByClickTrigger();
            expect(getSelectedQuarterCell().textContent.trim()).toBe('Q4');
            dispatchMouseEvent(queryFromOverlay('.thy-calendar-next-year-btn'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(getSelectedQuarterCell()).toBeNull();
            dispatchMouseEvent(queryFromOverlay('.thy-calendar-prev-year-btn'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(getSelectedQuarterCell().textContent.trim()).toBe('Q4');
        }));
    });

    ///////////////

    function getPickerContainer(): HTMLElement {
        return queryFromOverlay('.thy-calendar-picker-container') as HTMLElement;
    }

    function queryFromOverlay(selector: string): HTMLElement {
        return overlayContainerElement.querySelector(selector) as HTMLElement;
    }

    function getFirstQuarterCell(): HTMLElement {
        return queryFromOverlay('.thy-calendar-quarter td.thy-calendar-quarter-panel-cell') as HTMLElement;
    }

    function openPickerByClickTrigger(): void {
        dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();
    }

    function getPickerTriggerWrapper(): HTMLInputElement {
        return debugElement.query(By.css('thy-picker .thy-calendar-picker')).nativeElement as HTMLInputElement;
    }

    function getPickerTrigger(): HTMLInputElement {
        return debugElement.query(By.css('thy-picker input.thy-calendar-picker-input')).nativeElement as HTMLInputElement;
    }

    function getSelectedQuarterCell(): HTMLElement {
        return queryFromOverlay('tbody.thy-calendar-quarter-panel-tbody td.thy-calendar-quarter-panel-selected-cell') as HTMLElement;
    }
});

@Component({
    template: `
        <thy-quarter-picker
            #thyQuarterPicker
            class="d-block w-50 mb-3"
            [(ngModel)]="thyValue"
            (ngModelChange)="modelValueChange($event)"
            [thyAllowClear]="thyAllowClear"
            [thyDisabled]="thyDisabled"
            [thyDisabledDate]="thyDisabledDate"
            (thyDateChange)="thyDateChange($event)"
            [thyPlaceHolder]="thyPlaceHolder">
        </thy-quarter-picker>
    `
})
class TestQuarterPickerComponent {
    @ViewChild('thyQuarterPicker', { static: true }) thyQuarterPicker: ThyQuarterPickerComponent;
    thyAllowClear: boolean;
    thyDisabled: boolean;
    thyDisabledDate: (d: Date) => boolean;
    thyPlaceHolder: string = '请选择季度';
    thyPanelClassName: string;
    thyValue: Date;
    thyOpen: boolean;
    modelValueChange(): void {}
    thyDateChange(): void {}
}
