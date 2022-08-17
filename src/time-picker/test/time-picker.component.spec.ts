import { ESCAPE } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { dispatchMouseEvent } from 'ngx-tethys/testing';
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

            dispatchMouseEvent(queryFromOverlay('.cdk-overlay-backdrop'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(getTimePickerPanel()).toBeNull();
        }));

        it('should support thyPlaceholder', () => {
            const placeholder = 'customize placeholder';
            fixtureInstance.placeholder = placeholder;
            fixture.detectChanges();
            expect(getTimePickerInput().getAttribute('placeholder')).toBe(placeholder);
        });
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
        return queryFromOverlay('.thy-time-picker-panel');
    }

    function queryFromOverlay(selector: string) {
        return overlayContainerElement.querySelector(selector) as HTMLElement;
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

    format: string;

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
