import { Directive, EventEmitter, HostListener, OnInit, Output } from '@angular/core';

import { ThyFormDirective } from './form.directive';

@Directive({
    selector: '[thyFormSubmit],[thy-form-submit]'
})
export class ThyFormSubmitDirective implements OnInit {
    @Output() thyFormSubmit = new EventEmitter();

    constructor(private thyFormDirective: ThyFormDirective) {}

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
