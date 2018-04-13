import { Directive, Input, ElementRef, HostListener } from '@angular/core';
import { ThyPopBoxService } from '../pop-box/pop-box.service';

@Directive({
    selector: '[thyActionMenuToggle]'
})
export class ThyActionMenuToggleDirective {

    private _templateRef: ElementRef;

    @Input()
    set thyActionMenuToggle(value: ElementRef) {
        this._templateRef = value;
    }

    constructor(
        private popBoxService: ThyPopBoxService
    ) { }


    @HostListener('click', ['$event'])
    onClick(event: any): void {
        this.popBoxService.show(this._templateRef, {
            target: event.currentTarget,
            insideAutoClose: true
        });
    }

}
