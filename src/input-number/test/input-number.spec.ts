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
            class="thy-input-number-first"
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
            (thyBlur)="onBlur($event)"></thy-input-number>
        <thy-input-number
            #second
            class="thy-input-number-second"
            [(ngModel)]="modelValue"
            [thyPrecision]="thyPrecision"
            [thySuffix]="thySuffix"
            [thySize]="thySize"
            [thyPlaceholder]="placeholder"
            [thyMax]="thyMax"
            [thyMin]="thyMin"
            [thyStep]="thyStep"
            [thyDisabled]="thyDisabled"
            (ngModelChange)="change($event)"
            (thyFocus)="onSecondFocus($event)"
            (thyBlur)="onSecondBlur($event)"></thy-input-number>
    `
})
class TestInputNumberComponent {
    @ViewChild(ThyInputNumberComponent, { static: false }) inputNumberComponent: ThyInputNumberComponent;

    @ViewChild('second', { static: false }) secondInputNumberComponent: ThyInputNumberComponent;

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

    onSecondFocus = jasmine.createSpy('focus second callback');

    onSecondBlur = jasmine.createSpy('blur second callback');
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
        flush();
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
        flush();
        fixture.detectChanges();
        expect(inputNumberComponentInstance.modelValue).toBe(4);
    }));

    it('should thyDisabled work', fakeAsync(() => {
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
        flush();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(inputElement.value).toBe('2');
        });
        tick();
        dispatchMouseEvent(downElement, 'mousedown');
        dispatchMouseEvent(downElement, 'mouseup');
        dispatchMouseEvent(downElement, 'mousedown');
        dispatchMouseEvent(downElement, 'mouseup');
        flush();
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
        flush();
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
        flush();
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
        flush();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(inputElement.value).toBe('2.2222');
        });
    }));

    it('should thyPrecision work when keyup', fakeAsync(() => {
        fixture.detectChanges();
        inputNumberComponentInstance.modelValue = '0.991';
        fixture.detectChanges();
        tick();
        dispatchKeyboardEvent(inputElement, 'keyup');
        flush();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(inputElement.value).toBe('0.99');
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
        tick();
        dispatchKeyboardEvent(inputElement, 'keydown', keycodes.UP_ARROW);
        flush();
        fixture.detectChanges();
        expect(inputNumberComponentInstance.modelValue).toBe(1);
        dispatchKeyboardEvent(inputElement, 'keydown', keycodes.DOWN_ARROW);
        flush();
        fixture.detectChanges();
        expect(inputNumberComponentInstance.modelValue).toBe(0);
    }));

    it('should enter work', fakeAsync(() => {
        fixture.detectChanges();
        inputNumberComponentInstance.modelValue = '1a';
        fixture.detectChanges();
        tick();
        dispatchKeyboardEvent(inputElement, 'keydown', keycodes.ENTER);
        flush();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(inputElement.value).toBe('1');
        });
    }));

    it('should focus method work when focus input', fakeAsync(() => {
        fixture.detectChanges();
        const trigger = inputNumberComponentInstance.inputNumberComponent.inputElement.nativeElement;
        dispatchFakeEvent(trigger, 'focus');
        fixture.detectChanges();
        expect(inputNumberComponentInstance.onFocus).toHaveBeenCalledTimes(1);

        dispatchFakeEvent(trigger, 'blur');
        fixture.detectChanges();
        expect(inputNumberComponentInstance.onBlur).toHaveBeenCalledTimes(1);
    }));

    it('should focus method work when focus input-number', fakeAsync(() => {
        fixture.detectChanges();
        const onInputFocusSpy = spyOn(inputNumberComponentInstance.inputNumberComponent, 'onInputFocus').and.callThrough();
        const trigger = fixture.debugElement.query(By.css('.thy-input-number-first')).nativeElement;
        dispatchFakeEvent(trigger, 'focus');

        dispatchFakeEvent(inputNumberComponentInstance.inputNumberComponent.inputElement.nativeElement, 'focus');
        expect(onInputFocusSpy).toHaveBeenCalled();
        expect(inputNumberComponentInstance.onFocus).toHaveBeenCalledTimes(1);

        dispatchFakeEvent(trigger, 'blur');
        fixture.detectChanges();
        expect(inputNumberComponentInstance.onBlur).toHaveBeenCalledTimes(1);
    }));

    it('should call blur and call __onBlurValidation when input-number blur and validateOn is blur', fakeAsync(() => {
        fixture.detectChanges();
        const blurSpy = spyOn(
            fixture.componentInstance.inputNumberComponent as unknown as { __onBlurValidation: Function },
            '__onBlurValidation'
        );
        const trigger = fixture.debugElement.query(By.css('.thy-input-number-first')).nativeElement;
        dispatchFakeEvent(trigger, 'focus');
        dispatchFakeEvent(inputNumberComponentInstance.inputNumberComponent.inputElement.nativeElement, 'focus');
        fixture.detectChanges();

        dispatchFakeEvent(trigger, 'blur');
        flush();
        fixture.detectChanges();

        expect(blurSpy).toHaveBeenCalledTimes(1);
    }));

    it('should call blur and call __onBlurValidation when input blur', fakeAsync(() => {
        fixture.detectChanges();

        const onBlurValidationSpy = spyOn(
            fixture.componentInstance.inputNumberComponent as unknown as { __onBlurValidation: Function },
            '__onBlurValidation'
        );

        dispatchFakeEvent(inputNumberComponentInstance.inputNumberComponent.inputElement.nativeElement, 'focus');

        dispatchFakeEvent(inputNumberComponentInstance.inputNumberComponent.inputElement.nativeElement, 'blur');
        fixture.detectChanges();
        expect(onBlurValidationSpy).toHaveBeenCalledTimes(1);
    }));

    it('should call blur and not call __onBlurValidation when input-number blur and auto focus input', fakeAsync(() => {
        inputNumberComponentInstance.thyAutoFocus = false;
        fixture.detectChanges();

        const onBlurValidationSpy = spyOn(
            fixture.componentInstance.inputNumberComponent as unknown as { __onBlurValidation: Function },
            '__onBlurValidation'
        );

        const inputAutoFocusSpy = spyOn(
            inputNumberComponentInstance.inputNumberComponent.inputElement.nativeElement,
            'focus'
        ).and.callThrough();

        const inputNumberTrigger = fixture.debugElement.query(By.css('.thy-input-number-first')).nativeElement;
        dispatchFakeEvent(inputNumberTrigger, 'focus');
        fixture.detectChanges();
        // auto focus input
        expect(inputNumberComponentInstance.inputNumberComponent.inputElement.nativeElement === document.activeElement).toBeTruthy();
        expect(inputAutoFocusSpy).toHaveBeenCalled();

        const inputTrigger = inputNumberComponentInstance.inputNumberComponent.inputElement.nativeElement;
        dispatchFakeEvent(inputTrigger, 'focus');

        fixture.detectChanges();
        // call thyFocus
        expect(inputNumberComponentInstance.onFocus).toHaveBeenCalledTimes(1);
        // not call input-number blur
        expect(onBlurValidationSpy).not.toHaveBeenCalled();
        expect(inputNumberComponentInstance.onBlur).not.toHaveBeenCalled();
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

    it('should call focus and not blur when click other thy-input-number', fakeAsync(() => {
        fixture.detectChanges();
        const firstTrigger = inputNumberComponentInstance.inputNumberComponent.inputElement.nativeElement;
        dispatchFakeEvent(firstTrigger, 'focus');
        const secondTrigger = inputNumberComponentInstance.secondInputNumberComponent.inputElement.nativeElement;
        dispatchFakeEvent(secondTrigger, 'focus');
        dispatchFakeEvent(firstTrigger, 'blur');
        fixture.detectChanges();

        expect(inputNumberComponentInstance.onFocus).toHaveBeenCalledTimes(1);
        expect(inputNumberComponentInstance.onBlur).toHaveBeenCalledTimes(1);
        expect(inputNumberComponentInstance.onSecondFocus).toHaveBeenCalledTimes(1);
        expect(inputNumberComponentInstance.onSecondBlur).not.toHaveBeenCalled();
    }));

    it('should Only floating point numbers can be entered work', fakeAsync(() => {
        const testValueToken = [
            { from: '-', to: '' },
            { from: '-3', to: '-3' },
            { from: '-3abc', to: '-3' },
            { from: '-3.1', to: '-3.1' }
        ];
        fixture.detectChanges();
        testValueToken.forEach(item => {
            inputElement.value = item.from;
            inputNumberComponentInstance.inputNumberComponent.onInput(inputElement as any);
            tick();
            fixture.detectChanges();
            flush();
            expect(inputElement.value).toBe(item.to);
        });
    }));

    it('should isInputNumber function test', fakeAsync(() => {
        const trueTokens = ['1.', '1.e', '1.E', '1.e+', '1.E+', '-1.e', '-1.', '-1.e+', '.e', '.E', '1e1', '1E', '', 'E', 'e', '+', '-'];
        const falseToken = ['1..', '1ab.', '1e.', 'abc'];
        fixture.detectChanges();
        trueTokens.forEach(token => {
            expect(inputNumberComponentInstance.inputNumberComponent.isInputNumber(token)).toBe(true);
        });
        falseToken.forEach(token => {
            expect(inputNumberComponentInstance.inputNumberComponent.isInputNumber(token)).toBe(false);
        });
    }));
});
