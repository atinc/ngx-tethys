import {
    Directive,
    Output,
    ElementRef,
    EventEmitter,
    OnInit,
    NgZone,
    Renderer2,
    HostListener
} from '@angular/core';

@Directive({
    selector: '[thyContextMenu]'
})
export class ThyContextMenuDirective implements OnInit {
    @Output() thyContextMenu = new EventEmitter();

    constructor(
        private ngZone: NgZone,
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) {}

    rightClick(event: Event) {
        event.preventDefault();
        this.ngZone.run(() => {
            this.thyContextMenu.emit(event);
        });
    }

    ngOnInit() {
        this.ngZone.runOutsideAngular(() => {
            this.renderer.listen(
                this.elementRef.nativeElement,
                'contextmenu',
                this.rightClick.bind(this)
            );
        });
    }
}
