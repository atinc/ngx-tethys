import { FocusMonitor } from '@angular/cdk/a11y';
import { ComponentType, OverlayRef } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import {
    ChangeDetectorRef,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    NgZone,
    OnInit,
    Output,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';
import {
    ComponentTypeOrTemplateRef,
    InputBoolean,
    InputNumber,
    ThyOverlayDirectiveBase,
    ThyOverlayTrigger,
    ThyPlacement
} from 'ngx-tethys/core';
import { ThyPopover, ThyPopoverConfig, ThyPopoverRef } from 'ngx-tethys/popover';
import { SafeAny } from 'ngx-tethys/types';
import { coerceArray, helpers, isFunction, isTemplateRef } from 'ngx-tethys/util';
import { ThyDropdownMenuComponent } from './dropdown-menu.component';

export type ThyDropdownTrigger = 'click' | 'hover';

type ThyDropdownMenu = ThyDropdownMenuComponent | TemplateRef<SafeAny> | ComponentType<SafeAny>;

/**
 * thyDropdown 触发下拉菜单指令
 * @name thyDropdown
 * @order 10
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
     * @default 100
     */
    @Input('thyShowDelay')
    @InputNumber()
    set thyShowDelay(value: number) {
        this.showDelay = value;
    }

    /**
     * 关闭延迟毫秒
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
     * 弹出框的参数，底层使用 Popover 组件, 默认为`{ placement: "bottomLeft", insideClosable: true, minWidth: "240px" }`
     * @default { placement: "bottomLeft", insideClosable: true, minWidth: "240px" }
     */
    @Input() thyPopoverOptions: Pick<ThyPopoverConfig, 'placement' | 'height' | 'insideClosable' | 'minWidth'>;

    /**
     * 弹出框的显示位置，会覆盖 thyPopoverOptions 中的 placement，`top` | `topLeft` | `topRight` | `bottom` | `bottomLeft` | `bottomRight` | `left` | `leftTop` | `leftBottom` | `right` | `rightTop` | `rightBottom`
     * @default bottomLeft
     */
    @Input() thyPlacement: ThyPlacement;

    /**
     * 点击 dropdown-menu 内部是否关闭弹出框，会覆盖 thyPopoverOptions 中的 insideClosable
     * @default true
     */
    @Input() @InputBoolean() thyMenuInsideClosable: boolean;

    /**
     * 弹出框 overlay panel 的类名
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
        ngZone: NgZone,
        changeDetectorRef: ChangeDetectorRef
    ) {
        super(elementRef, platform, focusMonitor, ngZone, true, changeDetectorRef);
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

        const { placement, height, insideClosable, minWidth } = Object.assign(
            { placement: 'bottomLeft', insideClosable: true },
            this.thyPopoverOptions
        );
        const actualPlacement = this.thyPlacement ? this.thyPlacement : placement;
        const config: ThyPopoverConfig = {
            origin: this.elementRef.nativeElement,
            animationTrigger:
                actualPlacement && (actualPlacement.startsWith('top') || actualPlacement.startsWith('bottom'))
                    ? 'slideMotion'
                    : 'zoomMotion',
            hasBackdrop: false,
            viewContainerRef: this.viewContainerRef,
            offset: 0,
            panelClass: this.thyPanelClass,
            placement: this.thyPlacement ? this.thyPlacement : placement,
            height,
            outsideClosable: true,
            insideClosable: helpers.isUndefined(this.thyMenuInsideClosable) ? insideClosable : this.thyMenuInsideClosable,
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
            this.markForCheck();
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
            this.markForCheck();
        }, delay);
    }
}
