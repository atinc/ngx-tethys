import {
    Directive,
    ElementRef,
    Injectable,
    NgZone,
    OnDestroy,
    Input,
    TemplateRef,
    OnInit,
    ViewContainerRef,
    HostBinding
} from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { OverlayRef } from '@angular/cdk/overlay';
import { FocusMonitor } from '@angular/cdk/a11y';
import { ThyOverlayDirectiveBase, ThyOverlayTrigger, ThyPlacement } from '../core/overlay';
import { ThyPopover } from './popover.service';
import { ComponentType } from '@angular/cdk/portal';
import { ThyPopoverRef } from './popover-ref';

@Directive({
    selector: '[thyPopover]'
})
export class ThyPopoverDirective extends ThyOverlayDirectiveBase implements OnInit, OnDestroy {
    @HostBinding(`class.thy-popover-opened`) popoverOpened = false;

    @Input('thyPopover') content: ComponentType<any> | TemplateRef<any>;

    @Input() set thyTrigger(trigger: ThyOverlayTrigger) {
        this.trigger = trigger;
    }

    @Input() thyPlacement: ThyPlacement;

    @Input() thyOffset: number;

    @Input() thyConfig: ThyPlacement;

    private popoverRef: ThyPopoverRef<any>;

    tooltipPin = true;

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
            origin: this.elementRef.nativeElement,
            hasBackdrop: this.trigger === 'click' || this.trigger === 'focus',
            viewContainerRef: this.viewContainerRef,
            placement: this.thyPlacement,
            offset: this.thyOffset
        });
        this.popoverRef.afterClosed().subscribe(() => {
            this.popoverOpened = false;
        });
        return this.popoverRef.getOverlayRef();
    }

    show(delay: number = 0) {
        if (this.disabled || (this.overlayRef && this.overlayRef.hasAttached())) {
            return;
        }
        const overlayRef = this.createOverlay();
        this.overlayRef = overlayRef;
        this.popoverOpened = true;
    }

    hide(delay: number = 0) {
        this.popoverRef.close();
    }

    ngOnDestroy() {
        this.dispose();
    }
}
