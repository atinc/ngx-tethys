import { Directive, Input, ElementRef, HostListener } from '@angular/core';
import { ThyPopBoxService } from '../pop-box/pop-box.service';
import { inputValueToBoolean } from '../util/helpers';

export enum ActionEnum {
    click = 'click',
    contextmenu = 'contextmenu'
}

@Directive({
    selector: '[thyActionMenuToggle]'
})
export class ThyActionMenuToggleDirective {

    private _templateRef: ElementRef;

    private _placement: string;

    private _action = ActionEnum.click;

    private _stopPropagation = false;

    private _thyContainerClass = '';

    @Input()
    set thyActionMenuToggle(value: ElementRef) {
        this._templateRef = value;
    }

    @Input()
    set thyPlacement(value: string) {
        this._placement = value;
    }

    @Input()
    set thyAction(value: ActionEnum) {
        this._action = value;
    }

    @Input()
    set thyStopPropagation(value: boolean) {
        this._stopPropagation = inputValueToBoolean(value);
    }

    @Input()
    set thyContainerClass(value: string) {
        this._thyContainerClass = value;
    }

    constructor(
        private popBoxService: ThyPopBoxService
    ) { }

    @HostListener('click', ['$event'])
    onClick(event: any): void {
        if (this._action === ActionEnum.click) {
            this._show.bind(this)(event);
        }
    }

    @HostListener('contextmenu', ['$event'])
    onRightClick(event: any): boolean {
        if (this._action === ActionEnum.contextmenu) {
            this._show.bind(this)(event);
            return false;
        }
        return true;
    }

    private _show(event: any) {
        if (this._stopPropagation) {
            event.stopPropagation();
            // event.preventDefault();
        }
        this.popBoxService.show(this._templateRef, {
            target: event.currentTarget,
            insideAutoClose: true,
            stopPropagation: this._stopPropagation,
            placement: this._placement || 'bottom left',
            containerClass: this._thyContainerClass,
        });
    }
}
