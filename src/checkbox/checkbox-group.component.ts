// import { Component, forwardRef, HostBinding, Input, ElementRef } from '@angular/core';
// import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
// import { ThyTranslate } from '../shared';
// import { inputValueToBoolean } from '../util/helpers';

// const noop = () => {
// };

// @Component({
//     selector: 'thy-checkbox-group',
//     templateUrl: './checkbox-group.component.html',
//     providers: [
//         {
//             provide: NG_VALUE_ACCESSOR,
//             useExisting: forwardRef(() => ThyCheckboxGroupComponent),
//             multi: true
//         }
//     ]
// })
// export class ThyCheckboxGroupComponent implements ControlValueAccessor {

//     // The internal data model
//     _innerValue: any = null;

//     _disabled = false;

//     _isFormCheckInline = false;

//     private onTouchedCallback: () => void = noop;

//     private onChangeCallback: (_: any) => void = noop;

//     _labelText: string;

//     @HostBinding('class.form-check-group') _isFormCheckGroup = true;


//     @Input()
//     set thyCheckboxInline(value: boolean) {
//         this._isFormCheckInline = inputValueToBoolean(value);
//     }

//     @Input()
//     set thyLabelText(value: string) {
//         this._labelText = value;
//     }

//     @Input()
//     set thyLabelTextTranslateKey(value: string) {
//         if (value) {
//             this._labelText = this.thyTranslate.instant(value);
//         } else {
//             this._labelText = '';
//         }
//     }

//     writeValue(obj: any): void {
//         if (obj !== this._innerValue) {
//             this._innerValue = obj;
//             this.onChangeCallback(obj);
//         }
//     }

//     registerOnChange(fn: any): void {
//         this.onChangeCallback = fn;
//     }

//     registerOnTouched(fn: any): void {
//         this.onTouchedCallback = fn;
//     }

//     setDisabledState?(isDisabled: boolean): void {
//         this._disabled = isDisabled;
//     }

//     constructor(
//         private elementRef: ElementRef,
//         private thyTranslate: ThyTranslate
//     ) {
//     }

//     ngModelChange() {
//         this.onChangeCallback(this._innerValue);
//     }
// }
