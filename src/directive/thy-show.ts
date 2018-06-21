import {
    Directive, Renderer2, Input, ElementRef,
    Output, EventEmitter, OnDestroy
} from '@angular/core';

@Directive({ selector: '[thyShow]' })
export class ThyShowDirective implements OnDestroy {

    @Output() thyShowChange = new EventEmitter();

    private unListenEvent: () => void;

    private unListenDocument() {
        if (this.unListenEvent) {
            this.unListenEvent();
            this.unListenEvent = null;
        }
    }

    @Input() set thyShow(condition: boolean) {
        if (condition) {
            this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'block');
            setTimeout(() => {
                this.unListenDocument = this.renderer.listen('document', 'click', (event) => {
                    if (!this.elementRef.nativeElement.contains(event.target)) {
                        this.thyShowChange.emit(false);
                        this.unListenDocument();
                    }
                });
            });
        } else {
            this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'none');
            this.unListenDocument();
        }
    }

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) { }

    ngOnDestroy() {
        this.unListenDocument();
    }
}
