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
import { ThyPopoverConfig } from './popover.config';

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

    @Input() thyConfig: ThyPopoverConfig;

    @Input('thyShowDelay') showDelay = 0;

    @Input('thyHideDelay') hideDelay = 0;

    private popoverRef: ThyPopoverRef<any>;

    tooltipPin = true;

    showTimeoutId: number | null | any;

    hideTimeoutId: number | null | any;

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
        const config = Object.assign(
            {
                origin: this.elementRef.nativeElement,
                hasBackdrop: this.trigger === 'click' || this.trigger === 'focus',
                viewContainerRef: this.viewContainerRef,
                placement: this.thyPlacement,
                offset: this.thyOffset
            },
            this.thyConfig
        );
        this.popoverRef = this.popover.open(this.content, config);
        this.popoverRef.afterClosed().subscribe(() => {
            this.popoverOpened = false;
        });
        return this.popoverRef.getOverlayRef();
    }

    show(delay: number = this.showDelay) {
        if (this.hideTimeoutId) {
            clearTimeout(this.hideTimeoutId);
            this.hideTimeoutId = null;
        }

        if (this.disabled || (this.overlayRef && this.overlayRef.hasAttached())) {
            return;
        }

        this.showTimeoutId = setTimeout(() => {
            const overlayRef = this.createOverlay();
            this.overlayRef = overlayRef;
            this.popoverOpened = true;
            this.showTimeoutId = null;
        }, delay);
    }

    hide(delay: number = this.hideDelay) {
        if (this.showTimeoutId) {
            clearTimeout(this.showTimeoutId);
            this.showTimeoutId = null;
        }

        this.hideTimeoutId = setTimeout(() => {
            this.popoverRef.close();
            this.hideTimeoutId = null;
        }, delay);
    }

    ngOnDestroy() {
        this.dispose();
    }
}
