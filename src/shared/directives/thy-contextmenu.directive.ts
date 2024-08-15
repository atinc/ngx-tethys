import { Directive, Output, ElementRef, EventEmitter, OnInit, NgZone, Renderer2, HostListener, OnDestroy } from '@angular/core';

/**
 * @name thyContextMenu
 */
@Directive({
    selector: '[thyContextMenu]',
    standalone: true
})
export class ThyContextMenuDirective implements OnInit, OnDestroy {
    @Output() thyContextMenu = new EventEmitter();

    private removeContextListenerFn: VoidFunction;

    constructor(
        private ngZone: NgZone,
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) {}

    rightClick = (event: Event) => {
        event.preventDefault();
        this.ngZone.run(() => {
            this.thyContextMenu.emit(event);
        });
    };

    ngOnInit() {
        this.ngZone.runOutsideAngular(() => {
            this.removeContextListenerFn = this.renderer.listen(this.elementRef.nativeElement, 'contextmenu', this.rightClick);
        });
    }

    ngOnDestroy(): void {
        this.removeContextListenerFn();
    }
}
