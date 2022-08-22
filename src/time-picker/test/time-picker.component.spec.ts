import { ESCAPE } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, discardPeriodicTasks, fakeAsync, flush, inject, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { dispatchKeyboardEvent, dispatchMouseEvent } from 'ngx-tethys/testing';
import { ThyTimePickerComponent, TimePickerSize } from '../time-picker.component';
import { ThyTimePickerModule } from '../time-picker.module';

describe('ThyTimePickerComponent', () => {
    let fixture: ComponentFixture<ThyTestTimePickerBaseComponent>;
    let fixtureInstance: ThyTestTimePickerBaseComponent;
    let debugElement: DebugElement;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ThyTimePickerModule],
            declarations: [ThyTestTimePickerBaseComponent]
        });

        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyTestTimePickerBaseComponent);
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

    describe('general property testing', () => {
        it('should open by click overlay origin', fakeAsync(() => {
            openOverlay();

            expect(getTimePickerPanel()).not.toBeNull();
        }));

        it('should close by click overlay outside when ThyBackdrop is false', fakeAsync(() => {
            openOverlay();

            dispatchMouseEvent(document.body, 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(getTimePickerPanel()).toBeNull();
        }));

        it('should close by click overlay backdrop when ThyBackdrop is true', fakeAsync(() => {
            fixtureInstance.backdrop = true;
            fixture.detectChanges();

            openOverlay();

            dispatchMouseEvent(overlayQuery('.cdk-overlay-backdrop'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(getTimePickerPanel()).toBeNull();
            flush();
        }));

        it('should close by "Escape" key', fakeAsync(() => {
            openOverlay();

            getTimePickerInput().focus();
            fixture.detectChanges();
            dispatchKeyboardEvent(getTimePickerInput(), 'keydown', ESCAPE);
            expect(getTimePickerPanel()).toBeNull();
        }));

        it('should support thyPlaceholder', () => {
            const placeholder = 'customize placeholder';
            fixtureInstance.placeholder = placeholder;
            fixture.detectChanges();
            expect(getTimePickerInput().getAttribute('placeholder')).toBe(placeholder);
        });

        it('should support thyAllowClear and emit change', fakeAsync(() => {
            const clearBtnSelector = '.thy-time-picker-clear';
            const value = new Date();
            fixtureInstance.value = value;
            fixture.detectChanges();

            fixtureInstance.allowClear = false;
            fixture.detectChanges();
            expect(debugElementQuery(clearBtnSelector)).toBeNull();

            fixtureInstance.allowClear = true;
            tick(500);
            fixture.detectChanges();
            expect(debugElementQuery(clearBtnSelector)).not.toBeNull();

            const onValueChange = spyOn(fixtureInstance, 'onValueChange');
            debugElementQuery(`${clearBtnSelector} thy-icon`).nativeElement.click();
            fixture.detectChanges();
            expect(fixtureInstance.value).toBe(null);
            expect(onValueChange).toHaveBeenCalledWith(null);
            expect(debugElementQuery(clearBtnSelector)).toBeNull();
            flush();
        }));
    });

    function openOverlay() {
        fixture.detectChanges();
        dispatchMouseEvent(getTimePickerInput(), 'click');
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();
    }

    function getTimePickerInput() {
        return debugElement.query(By.css('thy-time-picker.thy-time-picker input')).nativeElement as HTMLElement;
    }

    function getTimePickerPanel() {
        return overlayQuery('.thy-time-picker-panel');
    }

    function overlayQuery(selector: string) {
        return overlayContainerElement.querySelector(selector) as HTMLElement;
    }

    function debugElementQuery(selector: string) {
        return debugElement.query(By.css(selector));
    }
});

@Component({
    template: `
        <thy-time-picker
            #timePicker
            [(ngModel)]="value"
            [thySize]="size"
            [thyFormat]="format"
            [thyBackdrop]="backdrop"
            [thyDisabled]="disabled"
            [thyReadonly]="readonly"
            [thyHourStep]="hourStep"
            [thyMinuteStep]="minuteStep"
            [thySecondStep]="secondStep"
            [thyAllowClear]="allowClear"
            [thyPopupClass]="popupClass"
            [thyPlaceholder]="placeholder"
            [thyShowSelectNow]="showSelectNow"
            (ngModelChange)="onValueChange($event)"
        ></thy-time-picker>
    `
})
class ThyTestTimePickerBaseComponent {
    @ViewChild('timePicker', { static: false }) timePickerRef: ThyTimePickerComponent;

    value: Date;

    format: string = 'HH:mm:ss';

    readonly = false;

    disabled = false;

    allowClear: boolean;

    size: TimePickerSize;

    placeholder: string;

    hourStep: number;

    minuteStep: number;

    secondStep: number;

    popupClass: string;

    showSelectNow: boolean;

    backdrop: boolean;

    onValueChange(value: Date) {}
}
