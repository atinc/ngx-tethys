import {
    Directive, HostListener,
    Input, ElementRef, TemplateRef
} from '@angular/core';
import { ThyPopBoxService } from './pop-box.service';
import { PopBoxOptions } from './pop-box-options.class';
import { inputValueToBoolean } from '../util/helpers';

@Directive({
    selector: `[thyPopBoxTrigger]`
})
export class ThyPopBoxTriggerDirective {

    private _templateRef: TemplateRef<any>;

    @Input()
    set thyPopBoxTrigger(value: TemplateRef<any>) {
        this._templateRef = value;
    }

    @Input() thyPopBoxOptions: PopBoxOptions;

    @HostListener('click', ['$event'])
    openPopBox($event: Event) {
        this.thyPopBoxService.show(this._templateRef,
            Object.assign(this.thyPopBoxOptions || {}, {
                target: this.elementRef.nativeElement
            })
        );
    }

    constructor(
        private elementRef: ElementRef,
        private thyPopBoxService: ThyPopBoxService
    ) { }
}
