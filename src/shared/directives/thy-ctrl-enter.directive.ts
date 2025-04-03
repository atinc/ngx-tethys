import { Directive, Output, ElementRef, EventEmitter, OnInit, NgZone, Renderer2, OnDestroy, inject } from '@angular/core';
import { keycodes } from 'ngx-tethys/util';

/**
 * @name thyCtrlEnter
 */
@Directive({
    selector: '[thyCtrlEnter]'
})
export class ThyCtrlEnterDirective implements OnInit, OnDestroy {
    private ngZone = inject(NgZone);
    private elementRef = inject(ElementRef);
    private renderer = inject(Renderer2);

    @Output() thyCtrlEnter = new EventEmitter();

    private removeKeydownListenerFn: VoidFunction;

    onKeydown = (event: KeyboardEvent) => {
        const keyCode = event.which || event.keyCode;
        if ((event.ctrlKey || event.metaKey) && keyCode === keycodes.ENTER) {
            event.preventDefault();
            this.ngZone.run(() => {
                this.thyCtrlEnter.emit(event);
            });
        }
    };

    ngOnInit() {
        this.ngZone.runOutsideAngular(() => {
            this.removeKeydownListenerFn = this.renderer.listen(this.elementRef.nativeElement, 'keydown', this.onKeydown);
        });
    }

    ngOnDestroy(): void {
        this.removeKeydownListenerFn();
    }
}
