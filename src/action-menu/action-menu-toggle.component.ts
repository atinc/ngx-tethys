import { Directive, Input, HostListener, TemplateRef } from '@angular/core';
import { inputValueToBoolean } from '../util/helpers';
import { ThyPopover } from '../popover';
import { ThyPlacement } from '../core';
import { helpers } from '../util';

export enum ActionEnum {
    click = 'click',
    contextmenu = 'contextmenu'
}

@Directive({
    selector: '[thyActionMenuToggle]'
})
export class ThyActionMenuToggleDirective {
    private _templateRef: TemplateRef<any>;

    private _placement: string;

    private _action = ActionEnum.click;

    private _stopPropagation = false;

    private _thyContainerClass = '';

    @Input()
    set thyActionMenuToggle(value: TemplateRef<any>) {
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

    @Input() thyOriginActiveClass: string | string[];

    constructor(private thyPopover: ThyPopover) {}

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
        this.thyPopover.open(this._templateRef, {
            origin: event.currentTarget,
            insideClosable: true,
            placement: this._placement ? (helpers.camelCase(this._placement.split(' ')) as ThyPlacement) : 'bottomLeft',
            panelClass: this._thyContainerClass,
            originActiveClass: this.thyOriginActiveClass
        });
    }
}
