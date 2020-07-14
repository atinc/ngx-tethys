import { Directive, Renderer2, Input, HostListener, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { coerceBooleanProperty } from '../util/helpers';

/**
 * 将来会移动到 thy 组件库中
 */
@Directive({
    selector: '[thyStopPropagation]'
})
export class ThyStopPropagationDirective implements OnInit, OnDestroy {
    private _listener: () => void;

    private _eventName = 'click';

    @Input()
    set thyStopPropagation(value: string) {
        this._eventName = value || 'click';
    }

    constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {}

    ngOnInit() {
        this._listener = this._renderer.listen(this._elementRef.nativeElement, this._eventName, ($event: Event) => {
            $event.stopPropagation();
        });
    }

    ngOnDestroy() {
        if (this._listener) {
            this._listener();
        }
    }
}
