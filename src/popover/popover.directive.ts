import {
    Directive,
    ElementRef,
    Injectable,
    NgZone,
    OnDestroy,
    Input,
    TemplateRef,
    OnInit,
    ViewContainerRef
} from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { fromEvent, Subject } from 'rxjs';
import { OverlayRef } from '@angular/cdk/overlay';
import { FocusMonitor } from '@angular/cdk/a11y';
import { takeUntil } from 'rxjs/operators';
import { ThyOverlayDirectiveBase, ThyOverlayTrigger } from '../core/overlay';
import { ThyPopover } from './popover.service';
import { ComponentType } from '@angular/core/src/render3';
import { ThyPopoverRef } from './popover-ref';

@Directive({
    selector: '[thyPopover]'
})
export class ThyPopoverDirective extends ThyOverlayDirectiveBase implements OnInit, OnDestroy {
    @Input('thyPopover') content: ComponentType<any> | TemplateRef<any>;

    @Input() set thyTrigger(trigger: ThyOverlayTrigger) {
        this.trigger = trigger;
    }

    private popoverRef: ThyPopoverRef<any>;

    constructor(
        elementRef: ElementRef,
        platform: Platform,
        focusMonitor: FocusMonitor,
        ngZone: NgZone,
        private popover: ThyPopover,
        private viewContainerRef: ViewContainerRef
    ) {
        super(elementRef, platform, focusMonitor, ngZone);
    }

    ngOnInit(): void {
        this.initialize();
    }

    createOverlay(): OverlayRef {
        this.popoverRef = this.popover.open(this.content, {
            target: this.elementRef.nativeElement,
            hasBackdrop: this.trigger === 'click' || this.trigger === 'focus',
            viewContainerRef: this.viewContainerRef
        });
        return this.popoverRef.getOverlayRef();
    }

    show(delay: number = 0) {
        if (this.disabled || (this.overlayRef && this.overlayRef.hasAttached())) {
            return;
        }
        const overlayRef = this.createOverlay();
        this.overlayRef = overlayRef;
        // overlayRef.detach();
        // this.popover.attach(overlayRef, this.content, {
        //     target: this.elementRef.nativeElement,
        //     hasBackdrop: this.trigger === 'click' || this.trigger === 'focus',
        //     viewContainerRef: this.viewContainerRef
        // });
    }

    hide(delay: number = 0) {
        this.popoverRef.close();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }
}
