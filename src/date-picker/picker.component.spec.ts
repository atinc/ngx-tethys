import { Component, DebugElement, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { ThyPickerComponent } from './picker.component';
import { DisabledDateFn } from './standard-types';
import { CdkConnectedOverlay, CdkOverlayOrigin, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule, registerLocaleData } from '@angular/common';
import { ThyIconComponent } from 'ngx-tethys/icon';
import { By } from '@angular/platform-browser';
import zh from '@angular/common/locales/zh';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ENTER, TinyDate } from 'ngx-tethys/util';
import { dispatchKeyboardEvent } from 'ngx-tethys/testing';

class CdkOverlayOriginSpy {
    elementRef: ElementRef;
}

class CdkConnectedOverlaySpy {
    overlayRef: {
        updatePosition: () => {};
    };
}

registerLocaleData(zh);

describe('ThyPickerComponent', () => {
    let fixture: ComponentFixture<ThyTestPickerComponent>;
    let fixtureInstance: ThyTestPickerComponent;
    let debugElement: DebugElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, OverlayModule, ThyPickerComponent, HttpClientTestingModule, ThyIconComponent],
            declarations: [ThyTestPickerComponent],
            providers: [
                {
                    provide: CdkOverlayOrigin,
                    useValue: CdkOverlayOriginSpy
                },
                {
                    provide: CdkConnectedOverlay,
                    useValue: CdkConnectedOverlaySpy
                }
            ]
        });

        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyTestPickerComponent);
        fixtureInstance = fixture.componentInstance;
        debugElement = fixture.debugElement;
    });

    it('should allow input', fakeAsync(() => {
        const updateDate = spyOn(fixtureInstance, 'onUpdateDate');
        fixtureInstance.thyReadonly = false;
        fixture.detectChanges();
        expect(fixtureInstance.thyPicker.readonlyState).toBe(false);
        const setValue = '2023-11-02 12:00';
        getPickerInputElement().value = setValue;
        getPickerInputElement().dispatchEvent(new Event('input'));
        fixture.detectChanges();
        flush();
        expect(updateDate).toHaveBeenCalled();
        expect(updateDate).toHaveBeenCalledWith(new TinyDate(setValue));
    }));

    it('should allow format date', fakeAsync(() => {
        const updateDate = spyOn(fixtureInstance, 'onUpdateDate');
        fixtureInstance.thyFormat = 'HH:mm:ss';
        fixture.detectChanges();
        expect(fixtureInstance.thyPicker.readonlyState).toBe(true);

        fixtureInstance.thyFormat = 'yyyy年MM月dd日';
        fixture.detectChanges();
        expect(fixtureInstance.thyPicker.readonlyState).toBe(false);
        const setValue = '2023年11月2日';
        getPickerInputElement().value = setValue;
        getPickerInputElement().dispatchEvent(new Event('input'));
        flush();
        expect(updateDate).toHaveBeenCalled();

        const setValueError = 'any error string';
        getPickerInputElement().value = setValueError;
        getPickerInputElement().dispatchEvent(new Event('input'));
        flush();
        expect(updateDate).toHaveBeenCalled();
        expect(updateDate).toHaveBeenCalledWith(null);
    }));

    it('should limit date by thyMinDate、thyMaxDate and thyDisabledDate', fakeAsync(() => {
        const updateDate = spyOn(fixtureInstance, 'onUpdateDate');
        fixtureInstance.thyMinDate = new Date('2023-01-02 12:00');
        fixture.detectChanges();
        getPickerInputElement().value = '2022-01-02 12:00';
        getPickerInputElement().dispatchEvent(new Event('input'));
        flush();
        expect(updateDate).toHaveBeenCalledWith(null);

        fixtureInstance.thyMaxDate = new Date('2023-11-20 12:00');
        getPickerInputElement().value = '2024-01-02 12:00';
        getPickerInputElement().dispatchEvent(new Event('input'));
        flush();
        expect(updateDate).toHaveBeenCalledWith(null);

        const thyDisabledDate: DisabledDateFn = (date: Date) => {
            return date > new Date();
        };

        fixtureInstance.thyDisabledDate = thyDisabledDate;
        getPickerInputElement().value = '2024-01-02 12:00';
        getPickerInputElement().dispatchEvent(new Event('input'));
        flush();
        expect(updateDate).toHaveBeenCalledWith(null);
    }));

    it('should emit tinyDate when enter', fakeAsync(() => {
        const enterValue = spyOn(fixtureInstance, 'onEnterValue');
        const initValue = new TinyDate(new Date());
        fixtureInstance.thyValue = initValue;
        fixture.detectChanges();
        dispatchKeyboardEvent(getPickerInputElement(), 'keydown', ENTER);
        flush();
        expect(enterValue).toHaveBeenCalled();
        expect(enterValue).toHaveBeenCalledWith(initValue);
    }));

    function getPickerInputElement() {
        return fixture.debugElement.query(By.css('input')).nativeElement;
    }
});

@Component({
    template: `
        <thy-picker
            #thyPicker
            [value]="thyValue"
            (valueChange)="onValueChange($event)"
            [disabled]="thyDisabled"
            [format]="thyFormat"
            [readonly]="thyReadonly"
            [min]="thyMinDate"
            [max]="thyMaxDate"
            [disabledDate]="thyDisabledDate"
            (updateDate)="onUpdateDate($event)"
            (enterChange)="onEnterValue($event)">
        </thy-picker>
    `
})
class ThyTestPickerComponent {
    @ViewChild('thyPicker', { static: true }) thyPicker: ThyPickerComponent;

    thyValue = new TinyDate(new Date());
    thyDisabled = false;
    thyFormat = 'yyyy-MM-dd HH:mm:ss';
    thyReadonly = false;
    thyMinDate: Date | number;
    thyMaxDate: Date | number;
    thyDisabledDate: DisabledDateFn;

    onValueChange(): void {}
    onUpdateDate(): void {}
    onEnterValue(): void {}
}
