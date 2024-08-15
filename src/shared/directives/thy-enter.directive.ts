import { Directive, Output, EventEmitter, OnInit, NgZone, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { keycodes } from 'ngx-tethys/util';

/**
 * 与 (keydown.enter) 区别是支持组合键，当按 Ctrl + Enter 或者 Command + Enter 也会触发
 * @name thyEnter
 */
@Directive({
    selector: '[thyEnter]',
    standalone: true
})
export class ThyEnterDirective implements OnInit, OnDestroy {
    @Output() thyEnter = new EventEmitter();

    onKeydown = (event: KeyboardEvent) => {
        const keyCode = event.which || event.keyCode;
        if (keyCode === keycodes.ENTER) {
            this.ngZone.run(() => {
                this.thyEnter.emit(event);
            });
        }
    };

    private removeKeydownListenerFn: VoidFunction;

    constructor(
        private ngZone: NgZone,
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) {}

    ngOnInit(): void {
        this.ngZone.runOutsideAngular(() => {
            this.removeKeydownListenerFn = this.renderer.listen(this.elementRef.nativeElement, 'keydown', this.onKeydown);
        });
    }

    ngOnDestroy(): void {
        this.removeKeydownListenerFn();
    }
}
