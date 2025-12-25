import { CdkConnectedOverlay, CdkOverlayOrigin, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule, registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import zh from '@angular/common/locales/zh';
import { Component, DebugElement, ElementRef, viewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThyIcon } from 'ngx-tethys/icon';
import { dispatchKeyboardEvent } from 'ngx-tethys/testing';
import { ENTER, TinyDate } from 'ngx-tethys/util';
import { ThyPicker } from 'ngx-tethys/date-picker';

class CdkOverlayOriginSpy {
    elementRef!: ElementRef;
}

class CdkConnectedOverlaySpy {
    overlayRef!: {
        updatePosition: () => {};
    };
}

registerLocaleData(zh);

describe('ThyPickerComponent', () => {
    let fixture!: ComponentFixture<ThyTestPickerComponent>;
    let fixtureInstance!: ThyTestPickerComponent;
    let debugElement!: DebugElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: CdkOverlayOrigin,
                    useValue: CdkOverlayOriginSpy
                },
                {
                    provide: CdkConnectedOverlay,
                    useValue: CdkConnectedOverlaySpy
                },
                provideHttpClient(withInterceptorsFromDi()),
                provideHttpClientTesting()
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
        expect(fixtureInstance.thyPicker().readonlyState).toBe(false);
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

    it('should update display value when thyFormat change', fakeAsync(() => {
        fixture.detectChanges();
        dispatchKeyboardEvent(getPickerInputElement(), 'keydown', ENTER);
        flush();

        const setValue = '2023-11-02 12:00';
        getPickerInputElement().value = setValue;
        getPickerInputElement().dispatchEvent(new Event('input'));
        getPickerInputElement().dispatchEvent(new Event('blur'));
        expect(getPickerInputElement().value).toBe('2023-11-02 12:00');

        // [thyFormat]="dateValue | thyDatePickerFormat"
        fixtureInstance.thyFormat = '2023-11-02';
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
        expect(getPickerInputElement().value).toBe('2023-11-02');
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
    `,
    imports: [CommonModule, OverlayModule, ThyPicker, ThyIcon]
})
class ThyTestPickerComponent {
    readonly thyPicker = viewChild.required<ThyPicker>('thyPicker');

    thyValue = new TinyDate(new Date());
    thyDisabled = false;
    thyFormat = 'yyyy-MM-dd HH:mm:ss';
    thyReadonly = false;
    thyMode = 'date';

    onValueChange(): void {}
    onInputChange(): void {}
}
