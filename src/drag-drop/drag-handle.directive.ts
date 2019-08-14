import { Directive, ElementRef, Input, Optional } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ThyDragDirective } from './drag.directive';

@Directive({
    selector: 'thy-drag-handle,[thyDragHandle]'
})
export class ThyDragHandleDirective {
    private _disabled = false;

    @Input('thyDisabled')
    get disabled(): boolean {
        return this._disabled;
    }
    set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);
    }

    constructor(public element: ElementRef<HTMLElement>, @Optional() drag: ThyDragDirective) {
        if (drag) {
            drag.dragRef.withHandles(this);
        }
    }
}
