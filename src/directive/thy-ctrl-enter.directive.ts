import {
    Directive,
    Output,
    ElementRef,
    EventEmitter,
    OnInit,
    NgZone,
    Renderer2
} from '@angular/core';
import { keycodes } from '../util';

@Directive({
    selector: '[thyCtrlEnter]'
})
export class ThyCtrlEnterDirective implements OnInit {

    @Output() thyCtrlEnter = new EventEmitter();

    constructor(
        private ngZone: NgZone,
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) {
    }

    onKeydown(event: KeyboardEvent) {
        const keyCode = event.which || event.keyCode;
        if ((event.ctrlKey || event.metaKey) && keyCode === keycodes.ENTER) {
            event.preventDefault();
            this.ngZone.run(() => {
                this.thyCtrlEnter.emit(event);
            });
        }
    }

    ngOnInit() {
        this.ngZone.runOutsideAngular(() => {
            this.renderer.listen(this.elementRef.nativeElement, 'keydown', this.onKeydown.bind(this));
        });
    }
}
