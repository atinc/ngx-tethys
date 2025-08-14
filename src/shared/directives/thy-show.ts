import { Directive, Renderer2, output, ElementRef, OnDestroy, NgZone, inject, effect, input } from '@angular/core';
import { useHostRenderer } from '@tethys/cdk/dom';
import { coerceBooleanProperty } from 'ngx-tethys/util';

/**
 * @name thyShow
 */
@Directive({
    selector: '[thyShow]'
})
export class ThyShowDirective implements OnDestroy {
    private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
    private renderer = inject(Renderer2);
    private ngZone = inject(NgZone);

    readonly thyShowChange = output<boolean>();

    private hostRenderer = useHostRenderer();

    private unListenEvent: () => void;

    private unListenDocument() {
        if (this.unListenEvent) {
            this.unListenEvent();
            this.unListenEvent = null;
        }
    }

    readonly thyShow = input(false, { transform: coerceBooleanProperty });

    constructor() {
        effect(() => {
            if (this.thyShow()) {
                this.hostRenderer.setStyle('display', 'block');
                this.ngZone.runOutsideAngular(() =>
                    setTimeout(() => {
                        this.unListenEvent = this.renderer.listen('document', 'click', event => {
                            if (!this.elementRef.nativeElement.contains(event.target)) {
                                this.ngZone.run(() => this.thyShowChange.emit(false));
                                this.unListenDocument();
                            }
                        });
                    })
                );
            } else {
                this.hostRenderer.setStyle('display', 'none');
                this.unListenDocument();
            }
        });
    }

    ngOnDestroy() {
        this.unListenDocument();
    }
}
