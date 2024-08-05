import { Direction } from '@angular/cdk/bidi';
import { ViewContainerRef } from '@angular/core';

export interface ThyAbstractOverlayPosition {
    /** Override for the overlay's top position. */
    top?: string;

    /** Override for the overlay's bottom position. */
    bottom?: string;

    /** Override for the overlay's left position. */
    left?: string;

    /** Override for the overlay's right position. */
    right?: string;
}

export class ThyAbstractOverlayConfig<TData = unknown> {
    /**
     * 当前的组件的 viewContainerRef，指定后弹出的组件的父注入器为当前组件的注入器
     * @description.en-us Where the attached component should live in Angular's *logical* component tree.This affects what is available for injection and the change detection order for the component instantiated inside of the overlay. This does not affect where the overlay content will be rendered.
     */
    viewContainerRef?: ViewContainerRef;

    /**
     * 弹出框的唯一标识
     * @description.en-us ID for the overlay. If omitted, a unique one will be generated.
     */
    id?: string;

    /**
     * overlay panel 类名
     * @description.en-us Custom class for the overlay pane.
     */
    panelClass?: string | string[] = '';

    /** Custom class for the overlay component's host element. */
    hostClass?: string | string[];

    /**
     * 是否有幕布
     * @description.en-us Whether the overlay has a backdrop.
     */
    hasBackdrop? = true;

    /**
     * 自定义幕布的样式
     * @description.en-us Custom class for the backdrop.
     */
    backdropClass?: string | string[] = '';

    /**
     * @description 点击幕布或者按ESC键是否自动关闭弹出框，hasBackdrop=true 时该参数起作用
     * @description.en-us Whether the user can use escape or clicking on the backdrop to close the overlay.
     */
    backdropClosable? = true;

    /** Whether the user can use escape or clicking on the backdrop to close the overlay. */
    disableClose? = false;

    /**
     * 自定义弹出框的宽度
     * @default 660px
     * @description.en-us Width of the overlay.
     */
    width? = '';

    /**
     * 自定义弹出框的高度
     * @default 85vh
     * @description.en-us Height of the overlay.
     */
    height? = '';

    /**
     * 弹出框最小宽度
     * @description.en-us Min-width of the overlay. If a number is provided, pixel units are assumed.
     */
    minWidth?: number | string;

    /**
     * 弹出框最小高度
     * @description.en-us Min-height of the overlay. If a number is provided, pixel units are assumed.
     */
    minHeight?: number | string;

    /**
     * 弹出框最大宽度
     * @description.en-us Max-width of the overlay. If a number is provided, pixel units are assumed. Defaults to 80vw
     */
    maxWidth?: number | string;

    /**
     * 弹出框最大高度
     * @default 85vh
     * @description.en-us Max-height of the overlay. If a number is provided, pixel units are assumed.
     */
    maxHeight?: number | string;

    /**
     * 传入的初始化状态，弹出组件的变量会自动赋值，在 ngOnInit 生命周期钩子可以获取到，构造函数获取不到
     * @description.en-us Data being injected into the child component.
     */
    initialState?: TData | null = null;

    /** Layout direction for the overlay's content. */
    direction?: Direction;

    /** ID of the element that describes the overlay. */
    ariaDescribedBy?: string | null = null;

    /** Aria label to assign to the overlay element */
    ariaLabel?: string | null = null;

    /** Whether the overlay should focus the first focusable element on open. */
    autoFocus? = true;

    /**
     * Whether the overlay should restore focus to the
     * previously-focused element, after it's closed.
     */
    restoreFocus? = true;

    /**
     * Control the previously-focused element focusing process.
     */
    restoreFocusOptions?: FocusOptions = { preventScroll: true };

    /**
     * 切换浏览器导航是否自动关闭弹出框
     * @description.en-us Whether the overlay should close when the user goes backwards/forwards in history.Note that this usually doesn't include clicking on links (unless the user is using the `HashLocationStrategy`).
     */
    closeOnNavigation? = true;

    /**
     * 关闭弹窗前的回调函数，返回 false 可阻止关闭弹窗
     */
    canClose?: (result?: unknown) => boolean;

    /**
     * 设置当提供的位置均不适合时是否可以将覆盖层推到屏幕上
     * @description.en-us Sets whether the overlay can be pushed on-screen if none of the provided positions fit
     * @default true
     */
    canPush? = true;
}

export interface ThyAbstractOverlayOptions {
    /** component name, e.g. dialog | popover | slide */
    name: string;
    /** Whether enable animation */
    animationEnabled: boolean;
    /** Whether dispose cdk overlay ref when close upper overlay */
    disposeWhenClose: boolean;
}
