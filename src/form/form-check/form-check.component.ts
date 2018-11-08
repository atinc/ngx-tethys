// import { Component, forwardRef, HostBinding, Input, ElementRef } from '@angular/core';
// import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
// import { UpdateHostClassService } from '../../shared';
// import { ThyTranslate } from '../../shared';

// @Component({
//     selector: '[thyFormCheck]',
//     templateUrl: './form-check.component.html',
//     providers: [
//         UpdateHostClassService
//     ],
// })
// export class ThyFormCheckComponent {

//     _labelText: string;

//     @HostBinding('class.form-check') _isFormCheck = true;

//     @Input()
//     set thyLabelText(value: string) {
//         this._labelText = value;
//     }

//     @Input()
//     set thyLabelTranslateKey(value: string) {
//         if (value) {
//             this._labelText = this.thyTranslate.instant(value);
//         } else {
//             this._labelText = '';
//         }
//     }

//     constructor(
//         private updateHostClassService: UpdateHostClassService,
//         private elementRef: ElementRef,
//         private thyTranslate: ThyTranslate
//     ) {
//         this.updateHostClassService.initializeElement(elementRef.nativeElement);
//     }

// }
