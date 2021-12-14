import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';

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
    set thyStopPropagation(value: string | boolean) {
        if (value === false || value === 'false') {
            this._eventName = '';
        } else {
            this._eventName = value && typeof value === 'string' ? value : 'click';
        }
    }

    constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {}

    ngOnInit() {
        if (this._eventName) {
            this._listener = this._renderer.listen(this._elementRef.nativeElement, this._eventName, ($event: Event) => {
                $event.stopPropagation();
            });
        }
    }

    ngOnDestroy() {
        if (this._listener) {
            this._listener();
        }
    }
}
