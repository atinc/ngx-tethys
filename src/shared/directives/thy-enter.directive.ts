import { Directive, OnInit, NgZone, ElementRef, Renderer2, OnDestroy, inject, output } from '@angular/core';
import { keycodes } from 'ngx-tethys/util';

/**
 * 与 (keydown.enter) 区别是支持组合键，当按 Ctrl + Enter 或者 Command + Enter 也会触发
 * @name thyEnter
 */
@Directive({
    selector: '[thyEnter]'
})
export class ThyEnterDirective implements OnInit, OnDestroy {
    private ngZone = inject(NgZone);
    private elementRef = inject(ElementRef);
    private renderer = inject(Renderer2);

    readonly thyEnter = output<KeyboardEvent>();

    onKeydown = (event: KeyboardEvent) => {
        const keyCode = event.which || event.keyCode;
        if (keyCode === keycodes.ENTER) {
            this.ngZone.run(() => {
                this.thyEnter.emit(event);
            });
        }
    };

    private removeKeydownListenerFn: VoidFunction;

    ngOnInit(): void {
        this.ngZone.runOutsideAngular(() => {
            this.removeKeydownListenerFn = this.renderer.listen(this.elementRef.nativeElement, 'keydown', this.onKeydown);
        });
    }

    ngOnDestroy(): void {
        this.removeKeydownListenerFn();
    }
}
