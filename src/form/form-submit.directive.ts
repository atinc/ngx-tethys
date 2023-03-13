import { Directive, ElementRef, Output, OnInit, HostBinding, HostListener, Optional, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ThyFormDirective } from './form.directive';

@Directive({
    selector: '[thyFormSubmit],[thy-form-submit]',
    standalone: true
})
export class ThyFormSubmitDirective implements OnInit {
    @Output() thyFormSubmit = new EventEmitter();

    constructor(private ngForm: NgForm, private thyFormDirective: ThyFormDirective) {}

    ngOnInit(): void {
        this.thyFormDirective.onSubmitSuccess = ($event: Event) => {
            this.thyFormSubmit.emit($event);
        };
    }

    @HostListener('click', ['$event'])
    onSubmit($event: Event) {
        this.thyFormDirective.submit($event);
    }
}
