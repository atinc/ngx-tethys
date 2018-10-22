import {
    Directive, Input, OnInit, ElementRef, Injectable,
    Inject, ChangeDetectorRef, Renderer2, NgZone, OnDestroy
} from '@angular/core';
import { ThyKeySelectService } from './key-select.service';
import { mixinDisabled, AnonymousClass } from '../core';
// import { ListKeyManager } from '@angular/cdk/a11y';

@Directive({
    selector: '[thyKeySelectItem]'
})
export class ThyKeySelectItemDirective extends mixinDisabled(AnonymousClass) implements OnInit, OnDestroy {

    @Input() thyData: any;

    constructor(
        public elementRef: ElementRef,
        private renderer: Renderer2,
        private keySelectService: ThyKeySelectService) {
        super();
        // this.keySelectService._getAllItems
    }

    ngOnInit(): void {
    }

    hover() {
        this.renderer.addClass(this.elementRef.nativeElement, this.keySelectService.options.hoverClass);
    }

    clearHover() {
        this.renderer.removeClass(this.elementRef.nativeElement, this.keySelectService.options.hoverClass);
    }

    select() {
        this.renderer.addClass(this.elementRef.nativeElement, this.keySelectService.options.selectedClass);
    }

    clearSelect() {
        this.renderer.removeClass(this.elementRef.nativeElement, this.keySelectService.options.selectedClass);
    }

    ngOnDestroy() {
        // super.ngOnDestroy();
    }
}
