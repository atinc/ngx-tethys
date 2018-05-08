import {
    Directive, ElementRef,
    Input, OnInit, Renderer2, HostBinding,
    AfterViewInit, AfterViewChecked, HostListener
} from '@angular/core';
import { UpdateHostClassService } from '../shared';
import { NgForm, AbstractControl } from '@angular/forms';

export type ThyFormLayout = 'horizontal' | 'vertical' | 'inline';

@Directive({
    selector: '[thyForm]',
    providers: [UpdateHostClassService]
})
export class ThyFormDirective implements OnInit, AfterViewInit, AfterViewChecked {

    private _layout: ThyFormLayout = 'horizontal';

    private _formControlKeys = new Array<string>();

    @Input()
    set thyLayout(value: ThyFormLayout) {
        this._layout = value;
    }

    get thyLayout(): ThyFormLayout {
        return this._layout;
    }

    @HostBinding('class.thy-form') isThyForm = true;

    @HostBinding('class.was-validated') wasValidated = false;

    onSubmitSuccess: ($event: any) => void;

    constructor(
        private ngForm: NgForm,
        private elementRef: ElementRef,
        private updateHostClassService: UpdateHostClassService) {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit() {
    }

    ngAfterViewChecked() {
        // if (this._formControlKeys.length > 0) {
        //     return;
        // }
        // for (const key in this.ngForm.controls) {
        //     if (this.ngForm.controls.hasOwnProperty(key)) {
        //         this._formControlKeys.push(key);
        //         this.ngForm.controls[key].valueChanges.subscribe((value) => {
        //         });
        //     }
        // }
    }

    submit($event: any) {
        this.ngForm.onSubmit($event);
        if (this.ngForm.valid) {
            this.onSubmitSuccess($event);
        } else {
            this.wasValidated = true;
        }
    }

    @HostListener('keydown.enter', ['$event'])
    enter($event: any) {
        this.submit($event);
    }
}
