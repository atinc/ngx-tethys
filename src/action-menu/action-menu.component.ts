import { Directive, Input, ElementRef, HostListener } from '@angular/core';
import { ThyPopBoxService } from '../pop-box/pop-box.service';

@Directive({
    selector: '[thyActionMenu]'
})
export class ThyActionMenuDirective {

    private _templateRef: ElementRef;

    @Input()
    set thyActionMenu(value: ElementRef) {
        this._templateRef = value;
    }

    constructor(
        private popBoxService: ThyPopBoxService
    ) { }


    @HostListener('click', ['$event'])
    onClick(event: any): void {
        this.popBoxService.show(this._templateRef, {
            target: event.currentTarget
        });
    }

}
