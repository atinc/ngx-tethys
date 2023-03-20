import { Directive, ElementRef, OnInit, Input, NgZone, ViewContainerRef, TemplateRef, EventEmitter, Output } from '@angular/core';
import { ThyDropdownMenuComponent } from './dropdown-menu.component';
import { ThyPopover, ThyPopoverConfig, ThyPopoverRef } from 'ngx-tethys/popover';
import { ComponentTypeOrTemplateRef, ThyOverlayDirectiveBase, ThyOverlayTrigger } from 'ngx-tethys/core';
import { ComponentType, OverlayRef } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { FocusMonitor } from '@angular/cdk/a11y';
import { SafeAny } from 'ngx-tethys/types';
import { isFunction, isTemplateRef } from 'ngx-tethys/util';

export type ThyDropdownTrigger = 'click' | 'hover';

export const THY_DROPDOWN_DEFAULT_WIDTH = '240px';

type ThyDropdownMenu = ThyDropdownMenuComponent | TemplateRef<SafeAny> | ComponentType<SafeAny>;

/**
 * thyDropdown 触发下拉菜单指令
 * @name thyDropdown
 */
@Directive({
    selector: `[thyDropdown]`,
    host: {
        class: 'thy-dropdown'
    },
    standalone: true
})
export class ThyDropdownDirective extends ThyOverlayDirectiveBase implements OnInit {
    menu!: ThyDropdownMenu;

    private popoverRef: ThyPopoverRef<unknown>;

    popoverOpened = false;

    /**
     * Dropdown 下拉菜单，支持 thy-dropdown-menu 组件、TemplateRef 和自定义菜单组件
     */
    @Input() set thyDropdownMenu(menu: ThyDropdownMenu) {
        this.menu = menu;
    }

    /**
     * Dropdown 下拉菜单组件，和 thyDropdownMenu 参与相同，快捷传下拉菜单组件参数
     */
    @Input() set thyDropdown(menu: ThyDropdownMenu) {
        this.menu = menu;
    }

    /**
     * 下拉菜单触发方式
     * @type 'hover' | 'focus' | 'click' | string
     * @default click
     */
    @Input() set thyTrigger(value: ThyOverlayTrigger | string) {
        this.trigger = value as ThyOverlayTrigger;
    }

    /**
     * 打开延迟毫秒
     * @type number
     * @default 100
     */
    @Input('thyShowDelay') set thyShowDelay(value: number) {
        this.showDelay = value;
    }

    /**
     * 关闭延迟毫秒
     * @type number
     * @default 100
     */
    @Input('thyHideDelay') set thyHideDelay(value: number) {
        this.hideDelay = value;
    }

    /**
     * 弹出菜单后的当前触发元素的激活样式类
     */
    @Input() thyActiveClass: string = 'thy-dropdown-origin-active';

    /**
     * 弹出框的参数，底层使用 Popover 组件, 默认为`{ placement: "bottom", width: "240px", insideClosable: true, minWidth: "240px" }`
     * @default { placement: "bottomLeft", width: "240px", insideClosable: true: minWidth: "240px" }
     */
    @Input() thyPopoverOptions: Pick<ThyPopoverConfig, 'placement' | 'width' | 'height' | 'insideClosable' | 'minWidth'>;

    /**
     * 菜单 Active 事件，打开菜单返回 true，关闭返回 false
     */
    @Output() thyActiveChange = new EventEmitter<boolean>();

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
        let componentTypeOrTemplateRef: ComponentTypeOrTemplateRef<SafeAny>;
        if (this.menu && this.menu instanceof ThyDropdownMenuComponent) {
            componentTypeOrTemplateRef = this.menu.templateRef;
        } else if (isFunction(this.menu) || isTemplateRef(this.menu)) {
            componentTypeOrTemplateRef = this.menu as ComponentTypeOrTemplateRef<SafeAny>;
        }
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
            if (!componentTypeOrTemplateRef) {
                throw new Error(`thyDropdownMenu is required`);
            }
        }

        const { placement, width, height, insideClosable, minWidth } = Object.assign(
            { placement: 'bottomLeft', width: THY_DROPDOWN_DEFAULT_WIDTH, insideClosable: true },
            this.thyPopoverOptions
        );
        const config: ThyPopoverConfig = {
            origin: this.elementRef.nativeElement,
            hasBackdrop: false,
            viewContainerRef: this.viewContainerRef,
            offset: 0,
            panelClass: 'thy-dropdown-pane',
            placement,
            width,
            height,
            outsideClosable: true,
            insideClosable,
            minWidth,
            originActiveClass: this.thyActiveClass
        };
        this.popoverRef = this.popover.open(componentTypeOrTemplateRef, config);
        this.popoverRef.afterOpened().subscribe(() => {
            this.thyActiveChange.emit(true);
        });
        this.popoverRef.afterClosed().subscribe(() => {
            this.popoverOpened = false;
            this.thyActiveChange.emit(false);
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
