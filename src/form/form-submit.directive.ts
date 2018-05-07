import { Directive, ElementRef, Output, OnInit, HostBinding, HostListener, Optional, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ThyFormDirective } from './form.directive';

@Directive({
    selector: '[thyFormSubmit]'
})
export class ThyFormSubmitDirective implements OnInit {

    @Output() thyFormSubmit = new EventEmitter();

    constructor(
        private ngForm: NgForm,
        private thyFormDirective: ThyFormDirective
    ) {
    }

    ngOnInit(): void {
    }

    @HostListener('click', ['$event'])
    onSubmit($event: any) {
        this.ngForm.onSubmit($event);
        if (this.ngForm.valid) {
            this.thyFormSubmit.emit();
        } else {
            // this.thyFormDirective.wasValidated = true;
        }
    }
}
