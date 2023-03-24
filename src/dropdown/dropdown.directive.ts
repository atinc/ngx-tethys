import { Directive, ElementRef, OnInit, Input, NgZone, ViewContainerRef, TemplateRef, EventEmitter, Output } from '@angular/core';
import { ThyDropdownMenuComponent } from './dropdown-menu.component';
import { ThyPopover, ThyPopoverConfig, ThyPopoverRef } from 'ngx-tethys/popover';
import {
    ComponentTypeOrTemplateRef,
    InputBoolean,
    InputNumber,
    ThyOverlayDirectiveBase,
    ThyOverlayTrigger,
    ThyPlacement
} from 'ngx-tethys/core';
import { ComponentType, OverlayRef } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { FocusMonitor } from '@angular/cdk/a11y';
import { SafeAny } from 'ngx-tethys/types';
import { coerceArray, helpers, isFunction, isTemplateRef } from 'ngx-tethys/util';

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

    private innerPanelClassList: string[] = ['thy-dropdown-pane'];

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
    @Input('thyShowDelay')
    @InputNumber()
    set thyShowDelay(value: number) {
        this.showDelay = value;
    }

    /**
     * 关闭延迟毫秒
     * @type number
     * @default 100
     */
    @Input('thyHideDelay')
    @InputNumber()
    set thyHideDelay(value: number) {
        this.hideDelay = value;
    }

    /**
     * 弹出菜单后的当前触发元素的激活样式类
     */
    @Input() thyActiveClass: string = 'thy-dropdown-origin-active';

    /**
     * 弹出框的参数，底层使用 Popover 组件, 默认为`{ width: "240px",  minWidth: "240px" }`
     * @default { width: "240px", minWidth: "240px" }
     */
    @Input() thyPopoverOptions: Pick<ThyPopoverConfig, 'placement' | 'width' | 'height' | 'insideClosable' | 'minWidth'>;

    /**
     * 弹出框的显示位置，'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight' | 'left' | 'leftTop' | 'leftBottom' | 'right' | 'rightTop' | 'rightBottom'
     *
     * @type ThyPlacement
     * @default bottomLeft
     */
    @Input() thyPlacement: ThyPlacement;

    /**
     * 点击 dropdown-menu 内部是否关闭弹出框
     *
     * @type boolean
     * @default true
     */
    @Input() @InputBoolean() thyMenuInsideClosable: boolean;

    /**
     * 弹出框 overlay panel 的类名
     *
     * @type string | string[]
     */
    @Input() set thyPanelClass(value: string | string[]) {
        this.innerPanelClassList = this.innerPanelClassList.concat(coerceArray(value));
    }

    get thyPanelClass() {
        return this.innerPanelClassList;
    }

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
            { width: THY_DROPDOWN_DEFAULT_WIDTH },
            this.thyPopoverOptions
        );
        const config: ThyPopoverConfig = {
            origin: this.elementRef.nativeElement,
            hasBackdrop: false,
            viewContainerRef: this.viewContainerRef,
            offset: 0,
            panelClass: this.thyPanelClass,
            placement: this.thyPlacement ? this.thyPlacement : placement ? placement : 'bottomLeft',
            width,
            height,
            outsideClosable: true,
            insideClosable: !helpers.isUndefined(this.thyMenuInsideClosable)
                ? this.thyMenuInsideClosable
                : !helpers.isUndefined(insideClosable)
                ? insideClosable
                : true,
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
