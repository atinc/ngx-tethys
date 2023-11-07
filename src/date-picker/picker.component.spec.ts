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
        const inputChange = spyOn(fixtureInstance, 'onInputChange');
        fixtureInstance.thyReadonly = false;
        fixture.detectChanges();
        expect(fixtureInstance.thyPicker.readonlyState).toBe(false);
        const setValue = '2023-11-02 12:00';
        getPickerInputElement().value = setValue;
        getPickerInputElement().dispatchEvent(new Event('input'));
        fixture.detectChanges();
        flush();
        expect(inputChange).toHaveBeenCalled();
        expect(inputChange).toHaveBeenCalledWith(setValue);
    }));

    it('should emit format date when enter and blur', fakeAsync(() => {
        const valueChange = spyOn(fixtureInstance, 'onValueChange');
        const initValue = new TinyDate(new Date());
        fixtureInstance.thyValue = initValue;
        fixture.detectChanges();
        dispatchKeyboardEvent(getPickerInputElement(), 'keydown', ENTER);
        flush();
        expect(valueChange).toHaveBeenCalled();

        const setValue = '2023-11-02 12:00';
        getPickerInputElement().value = setValue;
        getPickerInputElement().dispatchEvent(new Event('input'));
        getPickerInputElement().dispatchEvent(new Event('blur'));
        expect(valueChange).toHaveBeenCalled();
    }));

    it('should emit now when input null', fakeAsync(() => {
        const valueChange = spyOn(fixtureInstance, 'onValueChange');
        getPickerInputElement().value = '';
        getPickerInputElement().dispatchEvent(new Event('input'));
        fixture.detectChanges();
        flush();
        dispatchKeyboardEvent(getPickerInputElement(), 'keydown', ENTER);
        fixture.detectChanges();
        flush();
        expect(valueChange).toHaveBeenCalled();
        expect(valueChange).toHaveBeenCalledWith(new TinyDate(new Date()).format('yyyy-MM-dd HH:mm:ss'));
    }));

    function getPickerInputElement() {
        return fixture.debugElement.query(By.css('input')).nativeElement;
    }
});

@Component({
    template: `
        <thy-picker
            #thyPicker
            [mode]="thyMode"
            [value]="thyValue"
            (valueChange)="onValueChange($event)"
            [disabled]="thyDisabled"
            [format]="thyFormat"
            [readonly]="thyReadonly"
            (inputChange)="onInputChange($event)">
        </thy-picker>
    `
})
class ThyTestPickerComponent {
    @ViewChild('thyPicker', { static: true }) thyPicker: ThyPickerComponent;

    thyValue = new TinyDate(new Date());
    thyDisabled = false;
    thyFormat = 'yyyy-MM-dd HH:mm:ss';
    thyReadonly = false;
    thyMode = 'date';

    onValueChange(): void {}
    onInputChange(): void {}
}
