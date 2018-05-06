import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[thyInput]'
})
export class ThyInputDirective {
    @HostBinding('class.form-control') _isFormControl = true;
}
