import { Directive, Input, ElementRef, HostListener } from '@angular/core';
import { ThyPopBoxService } from '../pop-box/pop-box.service';

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

    constructor(
        private popBoxService: ThyPopBoxService
    ) { }

    @HostListener('click', ['$event'])
    onClick(event: any): void {
        if (this._action === ActionEnum.click) {
            this._show.bind(this)();
        }
    }

    @HostListener('contextmenu', ['$event'])
    onRightClick(event: any): void {
        if (this._action === ActionEnum.contextmenu) {
            this._show.bind(this)();
        }
    }

    private _show() {
        event.stopPropagation();
        event.preventDefault();
        this.popBoxService.show(this._templateRef, {
            target: event.currentTarget,
            insideAutoClose: true,
            placement: this._placement || 'bottom left'
        });
    }
}
