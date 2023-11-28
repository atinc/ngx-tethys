import { ThyPlacement, ThyAbstractOverlayConfig } from 'ngx-tethys/core';

import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { ElementRef, InjectionToken } from '@angular/core';

/**
 * @public
 * @order 20
 */
export class ThyPopoverConfig<TData = unknown> extends ThyAbstractOverlayConfig<TData> {
    /**
     * 弹出悬浮层位置计算的 Origin Element，Connected Element
     * @description.en-us Origin Element, for overlay flexible connected to
     */
    origin: ElementRef<any> | HTMLElement;

    /**
     * 动画触发器的名称
     */
    animationTrigger?: 'zoomMotion' | 'slideMotion';

    /**
     * 源点位置
     * @description.en-us Origin point, default use origin's boundingClientRect
     */
    originPosition?: {
        x: number;
        y: number;
    } & { width?: number; height?: number };

    /**
     * 相对于源点的位置，可选值：topCenter, topLeft, topRight, bottomCenter, bottomLeft, bottomRight ...
     * @description.en-us Placement be relative to origin, topCenter, topLeft, topRight, bottomCenter, bottomLeft, bottomRight ...
     */
    placement?: ThyPlacement;

    /**
     * 点击popover内部是否自动关闭弹出框
     * @description.en-us Click inside can been close
     */
    insideClosable?: boolean;

    /**
     * 相对于源点的偏移量
     * @description.en-us Offset be relative to origin, default is 0
     * @default 0
     */
    offset?: number;

    /**
     * 是否只能手动关闭，唯一标识为origin
     * @description.en-us Manually close it, default rules is which auto close last popover when open a new unless set manualClosure as true
     */
    manualClosure?: boolean;

    /**
     * 对弹出悬浮层位置计算的 Origin Element，Connected Element 添加 class
     * @description.en-us Origin active class when popover is opened
     * @default thy-popover-origin-active
     */
    originActiveClass?: string | string[];

    /**
     * 滚动策略
     */
    scrollStrategy?: ScrollStrategy;

    /**
     * 点击popover外部是否自动关闭弹出框，hasBackdrop=false 时该参数起作用
     * @description.en-us Click outside can been close
     */
    outsideClosable?: boolean;

    /**
     * 是否开启自动适配大小模式，开启后当弹出框内容宽高发生变化后自动更新位置
     * @description.en-us autoAdaptive is true when height change can auto update position
     */
    autoAdaptive?: boolean;
}

export const THY_POPOVER_DEFAULT_CONFIG = new InjectionToken<ThyPopoverConfig>('thy-popover-default-config');

export const THY_POPOVER_DEFAULT_CONFIG_VALUE = {
    hasBackdrop: true,
    backdropClass: 'thy-popover-backdrop',
    panelClass: '',
    offset: 0,
    backdropClosable: true,
    closeOnNavigation: true,
    placement: 'bottom' as ThyPlacement,
    insideClosable: false,
    manualClosure: false,
    originActiveClass: 'thy-popover-origin-active',
    autoAdaptive: false,
    minWidth: '240px'
};

export const THY_POPOVER_DEFAULT_CONFIG_PROVIDER = {
    provide: THY_POPOVER_DEFAULT_CONFIG,
    useValue: THY_POPOVER_DEFAULT_CONFIG_VALUE
};

export const THY_POPOVER_SCROLL_STRATEGY = new InjectionToken<() => ScrollStrategy>('thy-popover-scroll-strategy');

export const THY_POPOVER_SCROLL_STRATEGY_FACTORY = (overlay: Overlay) => {
    return () => overlay.scrollStrategies.block();
};

export const THY_POPOVER_SCROLL_STRATEGY_PROVIDER = {
    provide: THY_POPOVER_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: THY_POPOVER_SCROLL_STRATEGY_FACTORY
};
