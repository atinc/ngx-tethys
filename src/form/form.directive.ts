import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { UpdateHostClassService } from '../shared';

export type ThyFormLayout = 'horizontal' | 'vertical' | 'inline';

@Directive({
    selector: '[thyForm]',
    providers: [UpdateHostClassService]
})
export class ThyFormDirective implements OnInit {

    private _layout: ThyFormLayout = 'horizontal';

    @Input()
    set thyLayout(value: ThyFormLayout) {
        this._layout = value;
    }

    get thyLayout(): ThyFormLayout {
        return this._layout;
    }

    setClasses(): void {
    }

    constructor(
        private elementRef: ElementRef,
        private updateHostClassService: UpdateHostClassService) {
        // this.updateHostClassService.initializeElement(this.elementRef.nativeElement);
    }

    ngOnInit(): void {
        this.setClasses();
    }
}
