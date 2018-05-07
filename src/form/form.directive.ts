import { Directive, ElementRef, Input, OnInit, Renderer2, HostBinding, AfterContentInit } from '@angular/core';
import { UpdateHostClassService } from '../shared';
import { NgForm } from '@angular/forms';

export type ThyFormLayout = 'horizontal' | 'vertical' | 'inline';

@Directive({
    selector: '[thyForm]',
    providers: [UpdateHostClassService]
})
export class ThyFormDirective implements OnInit, AfterContentInit {

    private _layout: ThyFormLayout = 'horizontal';

    @Input()
    set thyLayout(value: ThyFormLayout) {
        this._layout = value;
    }

    get thyLayout(): ThyFormLayout {
        return this._layout;
    }

    @HostBinding('class.was-validated') wasValidated = false;

    setClasses(): void {
    }

    constructor(
        private ngForm: NgForm,
        private elementRef: ElementRef,
        private updateHostClassService: UpdateHostClassService) {
        // this.updateHostClassService.initializeElement(this.elementRef.nativeElement);
    }

    ngOnInit(): void {
        debugger;
        this.setClasses();
    }

    ngAfterContentInit(){
        debugger;
    }
}
