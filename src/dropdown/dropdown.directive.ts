import {
    Directive,
    HostBinding,
    ElementRef,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    Renderer2,
    NgZone,
    ViewContainerRef
} from '@angular/core';
import { ThyDropdownMenuComponent } from './dropdown-menu.component';
import { ThyPopover, ThyPopoverConfig, ThyPopoverRef } from 'ngx-tethys/popover';
import { ThyOverlayDirectiveBase, ThyOverlayTrigger } from 'ngx-tethys/core';
import { OverlayRef } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { FocusMonitor } from '@angular/cdk/a11y';

export type ThyDropdownTrigger = 'click' | 'hover';

/**
 * thyDropdown 触发下拉菜单指令
 */
@Directive({
    selector: `[thyDropdown]`,
    host: {
        class: 'thy-dropdown'
    }
})
export class ThyDropdownDirective extends ThyOverlayDirectiveBase implements OnInit {
    menu!: ThyDropdownMenuComponent;

    /**
     * Dropdown 下拉菜单组件
     */
    @Input() set thyDropdownMenu(menu: ThyDropdownMenuComponent) {
        this.menu = menu;
    }

    /**
     * Dropdown 下拉菜单组件，和 thyDropdownMenu 参与相同，快捷传下拉菜单组件参数
     */
    @Input() set thyDropdown(menu: ThyDropdownMenuComponent) {
        this.menu = menu;
    }

    /**
     * 下拉菜单触发方式: 'hover' | 'focus' | 'click'
     * @default click
     */
    @Input() set thyTrigger(value: ThyOverlayTrigger | string) {
        this.trigger = value as ThyOverlayTrigger;
    }

    popoverOpened = false;

    private popoverRef: ThyPopoverRef<unknown>;

    constructor(
        private viewContainerRef: ViewContainerRef,
        private popover: ThyPopover,
        elementRef: ElementRef,
        platform: Platform,
        focusMonitor: FocusMonitor,
        ngZone: NgZone
    ) {
        super(elementRef, platform, focusMonitor, ngZone, true);
    }

    ngOnInit() {
        this.initialize();
    }

    createOverlay(): OverlayRef {
        if (!this.menu || !(this.menu instanceof ThyDropdownMenuComponent)) {
            throw new Error(`thyDropdownMenu is required`);
        }
        const config: ThyPopoverConfig = {
            origin: this.elementRef.nativeElement,
            hasBackdrop: this.trigger === 'click' || this.trigger === 'focus',
            viewContainerRef: this.viewContainerRef,
            offset: 0,
            panelClass: 'thy-dropdown-pane'
        };
        this.popoverRef = this.popover.open(this.menu.templateRef, config);

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
        if (this.trigger !== 'hover') {
            delay = 0;
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
            if (this.popoverRef) {
                this.popoverRef.close();
            }
            this.hideTimeoutId = null;
        }, delay);
    }
}
