import { OverlayContainer } from '@angular/cdk/overlay';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { createFakeEvent, dispatchMouseEvent } from 'ngx-tethys/testing';
import { ThyDatePickerModule } from './date-picker.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

registerLocaleData(zh);

describe('ThyYearPickerComponent', () => {
    let fixture: ComponentFixture<TestYearPickerComponent>;
    let fixtureInstance: TestYearPickerComponent;
    let debugElement: DebugElement;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyDatePickerModule, FormsModule, NoopAnimationsModule],
            providers: [],
            declarations: [TestYearPickerComponent]
        });

        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestYearPickerComponent);
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
        it('should open by click and close by click at outside', fakeAsync(() => {
            fixture.detectChanges();
            dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
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
            fixtureInstance.thyValue = new Date('2006-2-11');
            fixture.detectChanges();
            fixtureInstance.thyDisabledDate = (date: Date) => {
                return date > new Date('2009-2-1');
            };
            fixture.detectChanges();
            dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            const allDisabledCells = queryFromOverlay('.thy-calendar-year-panel-cell-disabled');
            expect(allDisabledCells.textContent).toContain('2009');
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

            const cell = getFirstYearCell(); // Use the first cell 2009
            const cellText = cell.textContent;
            dispatchMouseEvent(cell, 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(thyOnChange).toHaveBeenCalled();
            const result = thyOnChange.calls.allArgs()[0][0];
            expect(new Date(result * 1000).getFullYear()).toBe(parseInt(cellText));
        }));

        it('should support thyDateChange', fakeAsync(() => {
            const thyDateChange = spyOn(fixtureInstance, 'thyDateChange');
            fixture.detectChanges();
            dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            const year = queryFromOverlay(`tbody.thy-calendar-year-panel-tbody td.thy-calendar-year-panel-cell`);
            dispatchMouseEvent(year, 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(thyDateChange).toHaveBeenCalled();
        }));
    }); // /general api testing

    describe('panel switch and move forward/afterward', () => {
        it('should support decade panel changes', fakeAsync(() => {
            fixtureInstance.thyValue = new Date('2018-1-1');
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            openPickerByClickTrigger();
            fixture.detectChanges();
            tick(500);
            // Click year select to show year panel
            dispatchMouseEvent(queryFromOverlay('.thy-calendar-year-btn'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(queryFromOverlay('.thy-calendar-decade')).toBeDefined();
            expect(queryFromOverlay('.thy-calendar-decade-btn').textContent).toContain('2000');
            expect(queryFromOverlay('.thy-calendar-decade-btn').textContent).toContain('2099');
            // Goto previous year
            dispatchMouseEvent(queryFromOverlay('.thy-calendar-prev-year-btn'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(queryFromOverlay('.thy-calendar-decade-btn').textContent).toContain('1900');
            expect(queryFromOverlay('.thy-calendar-decade-btn').textContent).toContain('1999');
            // Goto next year * 2
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

        it('should stop propagation when decade cell click', fakeAsync(() => {
            fixtureInstance.thyValue = new Date('2018-1-1');
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            openPickerByClickTrigger();
            fixture.detectChanges();
            tick(500);
            dispatchMouseEvent(queryFromOverlay('.thy-calendar-year-btn'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(queryFromOverlay('.thy-calendar-decade-panel-selected-cell').textContent).toContain('2010-2019');

            // Click year cell
            const event = createFakeEvent('click');
            spyOn(event, 'stopPropagation').and.callThrough();
            queryFromOverlay('.thy-calendar-decade-panel-decade').dispatchEvent(event);
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(event.stopPropagation).not.toHaveBeenCalled();
        }));
    }); // /panel switch and move forward/afterward

    ////////////

    function getPickerContainer(): HTMLElement {
        return queryFromOverlay('.thy-calendar-picker-container') as HTMLElement;
    }

    function getFirstYearCell(): HTMLElement {
        return queryFromOverlay('.thy-calendar-year td.thy-calendar-year-panel-cell') as HTMLElement;
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

    function getPickerTriggerWrapper(): HTMLInputElement {
        return debugElement.query(By.css('thy-picker .thy-calendar-picker')).nativeElement as HTMLInputElement;
    }

    function getPickerTrigger(): HTMLInputElement {
        return debugElement.query(By.css('thy-picker input.thy-calendar-picker-input')).nativeElement as HTMLInputElement;
    }
});

@Component({
    template: `
        <thy-year-picker
            class="d-block w-50 mb-3"
            [(ngModel)]="thyValue"
            (ngModelChange)="modelValueChange($event)"
            [thyAllowClear]="thyAllowClear"
            [thyDisabled]="thyDisabled"
            [thyDisabledDate]="thyDisabledDate"
            (thyDateChange)="thyDateChange($event)"
            [thyPlaceHolder]="thyPlaceHolder">
        </thy-year-picker>
    `
})
class TestYearPickerComponent {
    thyAllowClear: boolean;
    thyDisabled: boolean;
    thyDisabledDate: (d: Date) => boolean;
    thyPlaceHolder: string = '请选择年';
    thyPanelClassName: string;
    thyValue: Date;
    thyOpen: boolean;
    modelValueChange(): void {}
    thyDateChange(): void {}
}
