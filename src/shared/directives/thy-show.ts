import { Directive, Renderer2, Input, ElementRef, Output, EventEmitter, OnDestroy, NgZone } from '@angular/core';
import { useHostRenderer } from '@tethys/cdk/dom';
import { coerceBooleanProperty } from 'ngx-tethys/util';

/**
 * @name thyShow
 */
@Directive({
    selector: '[thyShow]',
    standalone: true
})
export class ThyShowDirective implements OnDestroy {
    @Output() thyShowChange = new EventEmitter();

    private hostRenderer = useHostRenderer();

    private unListenEvent: () => void;

    private unListenDocument() {
        if (this.unListenEvent) {
            this.unListenEvent();
            this.unListenEvent = null;
        }
    }

    @Input({ transform: coerceBooleanProperty })
    set thyShow(condition: boolean) {
        if (condition) {
            this.hostRenderer.setStyle('display', 'block');
            this.ngZone.runOutsideAngular(() =>
                setTimeout(() => {
                    this.unListenEvent = this.renderer.listen('document', 'click', event => {
                        if (!this.elementRef.nativeElement.contains(event.target)) {
                            if (this.thyShowChange.observers.length) {
                                this.ngZone.run(() => this.thyShowChange.emit(false));
                            }
                            this.unListenDocument();
                        }
                    });
                })
            );
        } else {
            this.hostRenderer.setStyle('display', 'none');
            this.unListenDocument();
        }
    }

    constructor(
        private elementRef: ElementRef<HTMLElement>,
        private renderer: Renderer2,
        private ngZone: NgZone
    ) {}

    ngOnDestroy() {
        this.unListenDocument();
    }
}
