import { Directive, ElementRef, OnInit, NgZone, Renderer2, OnDestroy, inject, output } from '@angular/core';

/**
 * @name thyContextMenu
 */
@Directive({
    selector: '[thyContextMenu]'
})
export class ThyContextMenuDirective implements OnInit, OnDestroy {
    private ngZone = inject(NgZone);
    private elementRef = inject(ElementRef);
    private renderer = inject(Renderer2);

    readonly thyContextMenu = output<Event>();

    private removeContextListenerFn!: VoidFunction;

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
