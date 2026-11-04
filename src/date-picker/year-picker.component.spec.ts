import { OverlayContainer } from '@angular/cdk/overlay';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Component, DebugElement, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { createFakeEvent, dispatchMouseEvent } from 'ngx-tethys/testing';
import { ThyDatePickerModule } from 'ngx-tethys/date-picker';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withXhr } from '@angular/common/http';

registerLocaleData(zh);

describe('ThyYearPickerComponent', () => {
    let fixture!: ComponentFixture<TestYearPickerComponent>;
    let fixtureInstance!: TestYearPickerComponent;
    let debugElement!: DebugElement;
    let overlayContainer!: OverlayContainer;
    let overlayContainerElement!: HTMLElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(withXhr()), provideNoopAnimations()]
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
            expect(fixtureInstance.thyValue).toBeNull();
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
            // 2009 年内存在可选日期（2009-02-01 及之前），因此 2009 可选，2010 不可选
            const allDisabledCells = queryFromOverlay('.thy-calendar-year-panel-cell-disabled');
            expect(allDisabledCells.textContent).toContain('2010');
            const enabled2009Cell = getYearCell(2009);
            expect(enabled2009Cell.classList.contains('thy-calendar-year-panel-cell-disabled')).toBe(false);
            flush();
        }));

        it('should clamp value into enabled days when choose a partially disabled year', fakeAsync(() => {
            fixtureInstance.thyValue = new Date('2006-2-11');
            fixtureInstance.thyDisabledDate = (date: Date) => {
                return date > new Date('2009-2-1');
            };
            fixture.detectChanges();
            const thyOnChange = spyOn(fixtureInstance, 'modelValueChange');
            openPickerByClickTrigger();
            dispatchMouseEvent(getYearCell(2009), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(thyOnChange).toHaveBeenCalled();
            // 期望收敛到 2009-02-01（默认时区 Asia/Shanghai），使用显式偏移断言避免受运行环境时区影响
            const emittedTime = (thyOnChange.calls.allArgs()[0][0] as number) * 1000;
            expect(emittedTime).toBeGreaterThanOrEqual(new Date('2009-02-01T00:00:00+08:00').getTime());
            expect(emittedTime).toBeLessThanOrEqual(new Date('2009-02-01T23:59:59+08:00').getTime());
            flush();
        }));

        it('should support thyPlaceholder', () => {
            const featureKey = (fixtureInstance.thyPlaceholder = 'TEST_PLACEHOLDER');
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

    function getYearCell(year: number): HTMLElement {
        const cells = Array.from(overlayContainerElement.querySelectorAll('.thy-calendar-year td.thy-calendar-year-panel-cell'));
        return cells.find(cell => cell.textContent!.trim() === String(year)) as HTMLElement;
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
            [thyPlaceholder]="thyPlaceholder">
        </thy-year-picker>
    `,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyDatePickerModule, FormsModule]
})
class TestYearPickerComponent {
    thyAllowClear!: boolean;
    thyDisabled!: boolean;
    thyDisabledDate!: (d: Date) => boolean;
    thyPlaceholder: string = '请选择年';
    thyPanelClassName!: string;
    thyValue!: Date;
    thyOpen!: boolean;
    modelValueChange(): void {}
    thyDateChange(): void {}
}
