import { Directive, Input, ElementRef, HostListener } from '@angular/core';
import { ThyPopBoxService } from '../pop-box/pop-box.service';

@Directive({
    selector: '[thyActionMenuToggle]'
})
export class ThyActionMenuToggleDirective {

    private _templateRef: ElementRef;

    private _placement: string;

    @Input()
    set thyActionMenuToggle(value: ElementRef) {
        this._templateRef = value;
    }

    @Input()
    set thyPlacement(value: string) {
        this._placement = value;
    }

    constructor(
        private popBoxService: ThyPopBoxService
    ) { }


    @HostListener('click', ['$event'])
    onClick(event: any): void {
        this.popBoxService.show(this._templateRef, {
            target: event.currentTarget,
            insideAutoClose: true,
            placement: this._placement || 'bottom left'
        });
    }

}
