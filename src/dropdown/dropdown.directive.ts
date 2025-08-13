import { FocusMonitor } from '@angular/cdk/a11y';
import { ComponentType, OverlayRef } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import {
    ChangeDetectorRef,
    Directive,
    ElementRef,
    EventEmitter,
    NgZone,
    OnInit,
    Output,
    Signal,
    TemplateRef,
    ViewContainerRef,
    computed,
    effect,
    inject,
    input,
    numberAttribute
} from '@angular/core';
import { ComponentTypeOrTemplateRef, ThyOverlayDirectiveBase, ThyOverlayTrigger, ThyPlacement } from 'ngx-tethys/core';
import { ThyPopover, ThyPopoverConfig, ThyPopoverRef } from 'ngx-tethys/popover';
import { SafeAny } from 'ngx-tethys/types';
import { coerceArray, coerceBooleanProperty, helpers, isFunction, isTemplateRef, isUndefinedOrNull } from 'ngx-tethys/util';
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
    }
})
export class ThyDropdownDirective extends ThyOverlayDirectiveBase implements OnInit {
    private viewContainerRef = inject(ViewContainerRef);
    private popover = inject(ThyPopover);

    readonly menu: Signal<ThyDropdownMenu> = computed(() => {
        return (this.thyDropdownMenu() || this.thyDropdown())!;
    });

    private popoverRef: ThyPopoverRef<unknown>;

    popoverOpened = false;

    /**
     * Dropdown 下拉菜单，支持 thy-dropdown-menu 组件、TemplateRef 和自定义菜单组件
     */
    readonly thyDropdownMenu = input<ThyDropdownMenu>();

    /**
     * Dropdown 下拉菜单组件，和 thyDropdownMenu 参与相同，快捷传下拉菜单组件参数
     */
    readonly thyDropdown = input<ThyDropdownMenu>();

    /**
     * 下拉菜单触发方式
     * @type 'hover' | 'focus' | 'click' | string
     * @default click
     */
    readonly thyTrigger = input<ThyOverlayTrigger | string>('click');

    /**
     * 打开延迟毫秒
     */
    readonly thyShowDelay = input(100, { transform: numberAttribute });

    /**
     * 关闭延迟毫秒
     */
    readonly thyHideDelay = input(100, { transform: numberAttribute });

    /**
     * 弹出菜单后的当前触发元素的激活样式类
     */
    readonly thyActiveClass = input<string, string>('thy-dropdown-origin-active', {
        transform: (value: string) => value || 'thy-dropdown-origin-active'
    });

    /**
     * 弹出框的参数，底层使用 Popover 组件, 默认为`{ placement: "bottomLeft", insideClosable: true, minWidth: "240px", outsideClosable: true }`
     */
    readonly thyPopoverOptions =
        input<Pick<ThyPopoverConfig, 'placement' | 'height' | 'insideClosable' | 'minWidth' | 'outsideClosable'>>();

    /**
     * 弹出框的显示位置，会覆盖 thyPopoverOptions 中的 placement，`top` | `topLeft` | `topRight` | `bottom` | `bottomLeft` | `bottomRight` | `left` | `leftTop` | `leftBottom` | `right` | `rightTop` | `rightBottom`
     */
    readonly thyPlacement = input<ThyPlacement, ThyPlacement>('bottomLeft', { transform: (value: ThyPlacement) => value || 'bottomLeft' });

    /**
     * 点击 dropdown-menu 内部是否关闭弹出框，会覆盖 thyPopoverOptions 中的 insideClosable
     */
    readonly thyMenuInsideClosable = input(true, { transform: coerceBooleanProperty });

    /**
     * 弹出框 overlay panel 的类名
     * @type string | string[]
     */
    readonly thyPanelClass = input<string | string[], string | string[]>(['thy-dropdown-pane'], {
        transform: (value: string | string[]) =>
            (!isUndefinedOrNull(value) && ['thy-dropdown-pane'].concat(coerceArray(value))) || ['thy-dropdown-pane']
    });

    /**
     * 菜单 Active 事件，打开菜单返回 true，关闭返回 false
     */
    @Output() thyActiveChange = new EventEmitter<boolean>();

    constructor() {
        const elementRef = inject(ElementRef);
        const platform = inject(Platform);
        const focusMonitor = inject(FocusMonitor);
        const ngZone = inject(NgZone);
        const changeDetectorRef = inject(ChangeDetectorRef);

        super(elementRef, platform, focusMonitor, ngZone, true, changeDetectorRef);

        // TODO: 以下为 overlay 基类中参数，之后需统一修改
        effect(() => {
            this.trigger = (this.thyTrigger() || 'click') as ThyOverlayTrigger;
        });
        effect(() => {
            this.hideDelay = this.thyHideDelay() ?? 100;
        });
        effect(() => {
            this.showDelay = this.thyShowDelay() ?? 100;
        });
    }

    ngOnInit() {
        this.initialize();
    }

    createOverlay(): OverlayRef {
        let componentTypeOrTemplateRef: ComponentTypeOrTemplateRef<SafeAny> | undefined = undefined;
        const menu = this.menu();
        if (menu && menu instanceof ThyDropdownMenuComponent) {
            componentTypeOrTemplateRef = menu?.templateRef();
        } else if (isFunction(menu) || isTemplateRef(menu)) {
            componentTypeOrTemplateRef = menu as ComponentTypeOrTemplateRef<SafeAny>;
        }
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
            if (!componentTypeOrTemplateRef) {
                throw new Error(`thyDropdownMenu is required`);
            }
        }

        const { placement, height, insideClosable, outsideClosable, minWidth } = Object.assign(
            { placement: 'bottomLeft', insideClosable: true, outsideClosable: true },
            this.thyPopoverOptions()
        );
        const thyPlacement = this.thyPlacement();
        const thyMenuInsideClosable = this.thyMenuInsideClosable();
        const config: ThyPopoverConfig = {
            origin: this.elementRef.nativeElement,
            hasBackdrop: false,
            viewContainerRef: this.viewContainerRef,
            offset: 0,
            panelClass: this.thyPanelClass(),
            placement: thyPlacement ? thyPlacement : placement,
            height,
            outsideClosable,
            insideClosable: helpers.isUndefined(thyMenuInsideClosable) ? insideClosable : thyMenuInsideClosable,
            minWidth,
            originActiveClass: this.thyActiveClass()
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
