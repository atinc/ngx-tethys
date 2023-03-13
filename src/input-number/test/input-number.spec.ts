import { dispatchFakeEvent, dispatchKeyboardEvent, dispatchMouseEvent } from 'ngx-tethys/testing';
import { keycodes } from 'ngx-tethys/util';

import { CommonModule } from '@angular/common';
import { Component, DebugElement, NgModule, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { ThyInputNumberComponent } from '../input-number.component';
import { ThyInputNumberModule } from '../module';

@Component({
    selector: 'thy-input-number-test',
    template: `
        <thy-input-number
            [(ngModel)]="modelValue"
            [thyPrecision]="thyPrecision"
            [thySuffix]="thySuffix"
            [thySize]="thySize"
            [thyAutoFocus]="thyAutoFocus"
            [thyPlaceholder]="placeholder"
            [thyMax]="thyMax"
            [thyMin]="thyMin"
            [thyStep]="thyStep"
            [thyDisabled]="thyDisabled"
            (ngModelChange)="change($event)"
            (thyFocus)="onFocus($event)"
            (thyBlur)="onBlur($event)"
        ></thy-input-number>
    `
})
class TestInputNumberComponent {
    @ViewChild(ThyInputNumberComponent, { static: false }) inputNumberComponent: ThyInputNumberComponent;

    thySize = ``;

    modelValue: string | number;

    sizes = ['sm', 'md', 'lg'];

    thyStep = 1;

    thyMax = 10;

    thyMin = 0;

    thySuffix = '';

    placeholder = '请输入';

    thyPrecision = 2;

    thyAutoFocus = true;

    thyDisabled = false;

    change = jasmine.createSpy('change callback');

    onFocus = jasmine.createSpy('focus callback');

    onBlur = jasmine.createSpy('blur callback');
}

@NgModule({
    imports: [CommonModule, FormsModule, ThyInputNumberModule],
    declarations: [TestInputNumberComponent],
    exports: []
})
export class InputComponentTestModule {}

describe('input-number component', () => {
    let fixture: ComponentFixture<TestInputNumberComponent>;
    let inputNumberComponentInstance: TestInputNumberComponent;
    let inputNumberDebugElement: DebugElement;
    let inputElement: HTMLInputElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [InputComponentTestModule],
            providers: []
        });

        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestInputNumberComponent);
        inputNumberComponentInstance = fixture.debugElement.componentInstance;
        inputNumberDebugElement = fixture.debugElement.query(By.directive(ThyInputNumberComponent));
        inputElement = inputNumberDebugElement.nativeElement.querySelector('input');
    });

    it('should className correct', () => {
        fixture.detectChanges();
        expect(inputNumberDebugElement.nativeElement.classList.contains('thy-input-number')).toBe(true);
    });
    it('should ngModel work', fakeAsync(() => {
        inputNumberComponentInstance.modelValue = 5;
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(inputElement.value).toBe('5');
        });
    }));

    it('should empty value work', () => {
        fixture.detectChanges();
        inputNumberComponentInstance.inputNumberComponent.onModelChange('3');
        fixture.detectChanges();
        expect(inputNumberComponentInstance.modelValue).toBe(3);
        fixture.detectChanges();
        inputNumberComponentInstance.inputNumberComponent.onModelChange('');
        fixture.detectChanges();
        expect(inputNumberComponentInstance.modelValue).toBe('');
    });
    it('should NaN value work', fakeAsync(() => {
        fixture.detectChanges();
        inputNumberComponentInstance.inputNumberComponent.onModelChange('aa');
        fixture.detectChanges();
        expect(inputNumberComponentInstance.modelValue).toBe(undefined);
        const upElement = inputNumberDebugElement.nativeElement.querySelector('.input-number-handler-up');
        expect(upElement).toBeTruthy();
        tick();
        dispatchMouseEvent(upElement, 'mousedown');
        dispatchMouseEvent(upElement, 'mouseup');
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(inputElement.value).toBe('1');
        });
    }));

    it('should user input work', () => {
        fixture.detectChanges();
        inputNumberComponentInstance.inputNumberComponent.onModelChange('1');
        fixture.detectChanges();
        expect(inputNumberComponentInstance.modelValue).toBe(1);
        expect(inputNumberComponentInstance.change).toHaveBeenCalledTimes(1);
        fixture.detectChanges();
        inputNumberComponentInstance.inputNumberComponent.onModelChange('123');
        fixture.detectChanges();
        expect(inputNumberComponentInstance.modelValue).toBe(10);
        expect(inputNumberComponentInstance.change).toHaveBeenCalledTimes(2);
        fixture.detectChanges();
        inputNumberComponentInstance.inputNumberComponent.onModelChange('-1');
        fixture.detectChanges();
        expect(inputNumberComponentInstance.modelValue).toBe(0);
        expect(inputNumberComponentInstance.change).toHaveBeenCalledTimes(3);
    });

    it('should thySize work', () => {
        fixture.detectChanges();
        expect(inputElement.classList.contains('form-control')).toBe(true);
        fixture.detectChanges();
        inputNumberComponentInstance.thySize = 'xs';
        fixture.detectChanges();
        expect(inputElement.classList.contains('form-control-xs')).toBe(true);
        inputNumberComponentInstance.thySize = 'sm';
        fixture.detectChanges();
        expect(inputElement.classList.contains('form-control-sm')).toBe(true);
        inputNumberComponentInstance.thySize = 'md';
        fixture.detectChanges();
        expect(inputElement.classList.contains('form-control-md')).toBe(true);
        inputNumberComponentInstance.thySize = 'lg';
        fixture.detectChanges();
        expect(inputElement.classList.contains('form-control-lg')).toBe(true);
    });

    it('should autofocus work', fakeAsync(() => {
        fixture.detectChanges();
        inputNumberComponentInstance.thyAutoFocus = true;
        fixture.detectChanges();
        tick(16);
        expect(inputElement === document.activeElement).toBe(true);
        inputNumberComponentInstance.thyAutoFocus = false;
        fixture.detectChanges();
        expect(inputElement.attributes.getNamedItem('autofocus')).toBe(null);
    }));

    it('should placeholder work', () => {
        fixture.detectChanges();
        expect(inputElement.getAttribute('placeholder')).toBe('请输入');
    });

    it('should thyStep work', fakeAsync(() => {
        const upElement = inputNumberDebugElement.nativeElement.querySelector('.input-number-handler-up');
        inputNumberComponentInstance.thyStep = 2;
        fixture.detectChanges();
        tick();
        dispatchMouseEvent(upElement, 'mousedown');
        dispatchMouseEvent(upElement, 'mouseup');
        fixture.detectChanges();
        expect(inputNumberComponentInstance.modelValue).toBe(2);
        fixture.detectChanges();
        tick();
        dispatchMouseEvent(upElement, 'mousedown');
        dispatchMouseEvent(upElement, 'mouseup');
        fixture.detectChanges();
        expect(inputNumberComponentInstance.modelValue).toBe(4);
        inputNumberComponentInstance.thyDisabled = true;
        fixture.detectChanges();
        tick();
        expect(inputElement.hasAttribute('disabled')).toBe(true);
        dispatchMouseEvent(upElement, 'mousedown');
        dispatchMouseEvent(upElement, 'mouseup');
        fixture.detectChanges();
        expect(inputNumberComponentInstance.modelValue).toBe(4);
    }));

    it('should thydisabled work', fakeAsync(() => {
        fixture.detectChanges();
        inputNumberComponentInstance.thyDisabled = true;
        fixture.detectChanges();
        tick();
        expect(inputElement.hasAttribute('disabled')).toBe(true);

        inputNumberComponentInstance.thyDisabled = false;
        fixture.detectChanges();
        tick();
        expect(inputElement.hasAttribute('disabled')).toBe(false);
    }));

    it('should up and down work', fakeAsync(() => {
        inputNumberComponentInstance.modelValue = 1;
        fixture.detectChanges();
        const upElement = inputNumberDebugElement.nativeElement.querySelector('.input-number-handler-up');
        const downElement = inputNumberDebugElement.nativeElement.querySelector('.input-number-handler-down');
        expect(upElement).toBeTruthy();
        expect(downElement).toBeTruthy();
        tick();
        dispatchMouseEvent(upElement, 'mousedown');
        dispatchMouseEvent(upElement, 'mouseup');
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(inputElement.value).toBe('2');
        });
        tick();
        dispatchMouseEvent(downElement, 'mousedown');
        dispatchMouseEvent(downElement, 'mouseup');
        dispatchMouseEvent(downElement, 'mousedown');
        dispatchMouseEvent(downElement, 'mouseup');
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(inputElement.value).toBe('0');
        });
        tick();
        inputNumberComponentInstance.modelValue = '1.';
        fixture.detectChanges();
        tick();
        dispatchMouseEvent(upElement, 'mousedown');
        dispatchMouseEvent(upElement, 'mouseup');
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(inputElement.value).toBe('2');
        });
    }));

    it('should blur input work', fakeAsync(() => {
        inputNumberComponentInstance.modelValue = '3aa';
        fixture.detectChanges();
        tick();
        inputElement.blur();
        fixture.detectChanges();
        tick();
        expect(inputElement.value).toBe('3');
    }));

    it('should thyPrecision work', fakeAsync(() => {
        fixture.detectChanges();
        inputNumberComponentInstance.inputNumberComponent.onModelChange('0.99');
        fixture.detectChanges();
        expect(inputNumberComponentInstance.modelValue).toBe(0.99);
        inputNumberComponentInstance.inputNumberComponent.onModelChange('0.992');
        fixture.detectChanges();
        expect(inputNumberComponentInstance.modelValue).toBe(0.99);
        inputNumberComponentInstance.inputNumberComponent.onModelChange('0.999');
        fixture.detectChanges();
        expect(inputNumberComponentInstance.modelValue).toBe(1);

        fixture.detectChanges();
        inputNumberComponentInstance.thyPrecision = undefined;
        inputNumberComponentInstance.modelValue = 0.0000000004;
        fixture.detectChanges();
        const upElement = inputNumberDebugElement.nativeElement.querySelector('.input-number-handler-up');
        expect(upElement).toBeTruthy();
        tick();
        dispatchMouseEvent(upElement, 'mousedown');
        dispatchMouseEvent(upElement, 'mouseup');
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(inputElement.value).toBe('1.0000000004');
        });

        fixture.detectChanges();
        inputNumberComponentInstance.thyPrecision = undefined;
        inputNumberComponentInstance.modelValue = 1.2222;
        fixture.detectChanges();
        expect(upElement).toBeTruthy();
        tick();
        dispatchMouseEvent(upElement, 'mousedown');
        dispatchMouseEvent(upElement, 'mouseup');
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(inputElement.value).toBe('2.2222');
        });
    }));

    it('should thyMax and thyMin work', () => {
        fixture.detectChanges();
        inputNumberComponentInstance.inputNumberComponent.onModelChange('11');
        fixture.detectChanges();
        expect(inputNumberComponentInstance.modelValue).toBe(10);
        inputNumberComponentInstance.inputNumberComponent.onModelChange('-2');
        fixture.detectChanges();
        expect(inputNumberComponentInstance.modelValue).toBe(0);
    });

    it('should thySuffix work', fakeAsync(() => {
        fixture.detectChanges();
        inputNumberComponentInstance.thySuffix = '%';
        inputNumberComponentInstance.inputNumberComponent.onModelChange('5');
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(inputElement.value).toBe('5 %');
        });
    }));

    it('should key up and down work', fakeAsync(() => {
        fixture.detectChanges();
        expect(inputNumberComponentInstance.modelValue).toBe(undefined);
        flush();
        dispatchKeyboardEvent(inputElement, 'keydown', keycodes.UP_ARROW);
        fixture.detectChanges();
        expect(inputNumberComponentInstance.modelValue).toBe(1);
        dispatchKeyboardEvent(inputElement, 'keydown', keycodes.DOWN_ARROW);
        fixture.detectChanges();
        expect(inputNumberComponentInstance.modelValue).toBe(0);
    }));

    it('should enter work', fakeAsync(() => {
        fixture.detectChanges();
        inputNumberComponentInstance.modelValue = '1a';
        fixture.detectChanges();
        tick();
        dispatchKeyboardEvent(inputElement, 'keydown', keycodes.ENTER);
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(inputElement.value).toBe('1');
        });
    }));

    it('should focus method work', fakeAsync(() => {
        fixture.detectChanges();
        const focusSpy = spyOn(inputNumberComponentInstance.inputNumberComponent, 'onFocus').and.callThrough();
        const trigger = inputNumberDebugElement.nativeElement;
        dispatchFakeEvent(trigger, 'focus');

        fixture.detectChanges();
        expect(focusSpy).toHaveBeenCalledTimes(1);

        inputNumberComponentInstance.inputNumberComponent.onInputFocus();
        fixture.detectChanges();
        expect(inputNumberComponentInstance.onFocus).toHaveBeenCalledTimes(1);
        fixture.detectChanges();
        inputNumberComponentInstance.inputNumberComponent.onBlur();
        fixture.detectChanges();
        expect(inputNumberComponentInstance.onBlur).toHaveBeenCalledTimes(1);
    }));

    it('should call blur when blur and validateOn is blur', fakeAsync(() => {
        fixture.detectChanges();

        const blurSpy = spyOn(
            (fixture.componentInstance.inputNumberComponent as unknown) as { __onBlurValidation: Function },
            '__onBlurValidation'
        );
        const trigger = fixture.debugElement.query(By.css('.input-number-input')).nativeElement;
        dispatchFakeEvent(trigger, 'blur');

        fixture.detectChanges();

        expect(blurSpy).toHaveBeenCalled();
    }));

    it('should call blur and not call __onBlurValidation when blur', fakeAsync(() => {
        fixture.detectChanges();

        const blurSpy = spyOn(
            (fixture.componentInstance.inputNumberComponent as unknown) as { __onBlurValidation: Function },
            '__onBlurValidation'
        );
        const trigger = fixture.debugElement.query(By.css('.input-number-input')).nativeElement;
        fixture.componentInstance.inputNumberComponent.onBlur({ relatedTarget: trigger } as FocusEvent);

        fixture.detectChanges();

        expect(blurSpy).not.toHaveBeenCalled();
    }));

    it('should remove disabled in down handler after switch thyMin', fakeAsync(() => {
        inputNumberComponentInstance.modelValue = 10;
        inputNumberComponentInstance.thyMin = 10;
        fixture.detectChanges();
        flush();
        const downHandlerElement: HTMLElement = inputNumberDebugElement.nativeElement.querySelector('.input-number-handler-down');
        fixture.detectChanges();

        expect(downHandlerElement.classList.contains('disabled')).toBe(true);

        inputNumberComponentInstance.thyMin = 0;
        fixture.detectChanges();
        flush();
        fixture.detectChanges();

        expect(downHandlerElement.classList.contains('disabled')).toBe(false);

        inputNumberComponentInstance.thyMin = null;
        fixture.detectChanges();
        flush();
        fixture.detectChanges();

        expect(downHandlerElement.classList.contains('disabled')).toBe(false);
    }));

    it('should remove disabled in up handler after switch thyMax', fakeAsync(() => {
        inputNumberComponentInstance.modelValue = 10;
        inputNumberComponentInstance.thyMax = 10;
        fixture.detectChanges();
        flush();
        const upHandlerElement: HTMLElement = inputNumberDebugElement.nativeElement.querySelector('.input-number-handler-up');
        fixture.detectChanges();

        expect(upHandlerElement.classList.contains('disabled')).toBe(true);

        inputNumberComponentInstance.thyMax = 100;
        fixture.detectChanges();
        flush();
        fixture.detectChanges();

        expect(upHandlerElement.classList.contains('disabled')).toBe(false);

        inputNumberComponentInstance.thyMax = null;
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
        expect(upHandlerElement.classList.contains('disabled')).toBe(false);
    }));
});
