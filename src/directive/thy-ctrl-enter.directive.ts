import { Directive, Output, HostListener, ElementRef, EventEmitter, OnInit, NgZone, Renderer2, ChangeDetectorRef } from '@angular/core';
import { keycodes } from '../util';

@Directive({
    selector: '[thyCtrlEnter]'
})
export class ThyCtrlEnterDirective implements OnInit {

    @Output() thyCtrlEnter = new EventEmitter();

    constructor(
        private ngZone: NgZone,
        private elementRef: ElementRef,
        private renderer: Renderer2,
        private changeDetectorRef: ChangeDetectorRef
    ) {
    }

    onKeydown(event: KeyboardEvent) {
        const keyCode = event.which || event.keyCode;
        if ((event.ctrlKey || event.metaKey) && keyCode === keycodes.ENTER) {
            event.preventDefault();
            this.thyCtrlEnter.emit(event);
            this.changeDetectorRef.detectChanges();
        }
    }

    ngOnInit() {
        this.ngZone.runOutsideAngular(() => {
            this.renderer.listen(this.elementRef.nativeElement, 'keydown', this.onKeydown.bind(this));
        });
    }
}
