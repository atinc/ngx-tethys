import { Directive, Output, ElementRef, EventEmitter, OnInit, NgZone, Renderer2, OnDestroy } from '@angular/core';
import { keycodes } from 'ngx-tethys/util';

/**
 * @name thyCtrlEnter
 */
@Directive({
    selector: '[thyCtrlEnter]',
    standalone: true
})
export class ThyCtrlEnterDirective implements OnInit, OnDestroy {
    @Output() thyCtrlEnter = new EventEmitter();

    private removeKeydownListenerFn: VoidFunction;

    constructor(
        private ngZone: NgZone,
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) {}

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
