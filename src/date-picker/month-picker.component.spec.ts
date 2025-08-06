import { OverlayContainer } from '@angular/cdk/overlay';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { dispatchMouseEvent } from 'ngx-tethys/testing';
import { ThyDatePickerModule } from 'ngx-tethys/date-picker';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
registerLocaleData(zh);

describe('ThyMonthPickerComponent', () => {
    let fixture: ComponentFixture<TestMonthPickerComponent>;
    let fixtureInstance: TestMonthPickerComponent;
    let debugElement: DebugElement;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideAnimations()]
        });

        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestMonthPickerComponent);
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
            tick(500);
            fixture.detectChanges();
            expect(fixtureInstance.thyValue).toBe(null);
            expect(thyOnChange).toHaveBeenCalledWith(null);
            expect(debugElement.query(clearBtnSelector)).toBeFalsy();
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
            fixtureInstance.thyValue = new Date('2009-2-11');
            fixture.detectChanges();
            fixtureInstance.thyDisabledDate = (date: Date) => {
                return date > new Date('2009-3-1');
            };
            fixture.detectChanges();
            dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            flush();
            const allDisabledCells = queryFromOverlay('.thy-calendar-month-panel-cell-disabled');
            expect(allDisabledCells.textContent).toContain('3月');
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

            const cell = getFirstMonthCell(); // Use the first cell
            const cellText = 1;
            dispatchMouseEvent(cell, 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(thyOnChange).toHaveBeenCalled();
            const result = (thyOnChange.calls.allArgs()[0] as Date[])[0];
            expect(new Date(result).getMonth() + 1).toBe(cellText);
        }));

        it('should support thyDateChange', fakeAsync(() => {
            const thyDateChange = spyOn(fixtureInstance, 'thyDateChange');
            fixture.detectChanges();
            openPickerByClickTrigger();
            const cell = getFirstMonthCell();
            dispatchMouseEvent(cell, 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(thyDateChange).toHaveBeenCalled();
        }));
    }); // /general api testing

    describe('panel switch and move forward/afterward', () => {
        it('should support year panel changes', fakeAsync(() => {
            fixtureInstance.thyValue = new Date('2018-11');
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
            expect(queryFromOverlay('.thy-calendar-year-btn').textContent).toContain('2010');
            expect(queryFromOverlay('.thy-calendar-year-btn').textContent).toContain('2019');
            // Goto previous year
            dispatchMouseEvent(queryFromOverlay('.thy-calendar-prev-year-btn'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(queryFromOverlay('.thy-calendar-year-btn').textContent).toContain('2000');
            expect(queryFromOverlay('.thy-calendar-year-btn').textContent).toContain('2009');
            // Goto next year * 2
            dispatchMouseEvent(queryFromOverlay('.thy-calendar-next-year-btn'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            dispatchMouseEvent(queryFromOverlay('.thy-calendar-next-year-btn'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(queryFromOverlay('.thy-calendar-year-btn').textContent).toContain('2020');
            expect(queryFromOverlay('.thy-calendar-year-btn').textContent).toContain('2029');
        }));

        it('should support decade panel changes', fakeAsync(() => {
            fixture.detectChanges();
            fixtureInstance.thyValue = new Date('2018-11');
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
    }); // /panel switch and move forward/afterward

    ////////////

    function getPickerContainer(): HTMLElement {
        return queryFromOverlay('.thy-calendar-picker-container') as HTMLElement;
    }

    function getFirstMonthCell(): HTMLElement {
        return queryFromOverlay('.thy-calendar-month td.thy-calendar-month-panel-cell') as HTMLElement;
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
        <thy-month-picker
            class="d-block w-50 mb-3"
            [(ngModel)]="thyValue"
            (ngModelChange)="modelValueChange($event)"
            (thyDateChange)="thyDateChange($event)"
            [thyAllowClear]="thyAllowClear"
            [thyDisabled]="thyDisabled"
            [thyDisabledDate]="thyDisabledDate"
            [thyPlaceHolder]="thyPlaceHolder">
        </thy-month-picker>
    `,
    imports: [ThyDatePickerModule, FormsModule]
})
class TestMonthPickerComponent {
    thyAllowClear: boolean;
    thyDisabled: boolean;
    thyDisabledDate: (d: Date) => boolean;
    thyPlaceHolder: string = '请选择月份';
    thyPanelClassName: string;
    thyValue: Date;
    thyOpen: boolean;
    modelValueChange(): void {}
    thyDateChange(): void {}
}
