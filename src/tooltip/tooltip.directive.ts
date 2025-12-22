import { FocusMonitor } from '@angular/cdk/a11y';
import { Platform } from '@angular/cdk/platform';
import {
    Directive,
    ElementRef,
    NgZone,
    OnDestroy,
    OnInit,
    ViewContainerRef,
    afterNextRender,
    effect,
    inject,
    input,
    linkedSignal,
    numberAttribute,
    signal
} from '@angular/core';
import { ThyOverlayDirectiveBase, ThyOverlayTrigger, ThyPlacement } from 'ngx-tethys/core';
import { SafeAny } from 'ngx-tethys/types';
import { coerceBooleanProperty, isString } from 'ngx-tethys/util';
import { ThyTooltipContent } from './interface';
import { ThyTooltipRef } from './tooltip-ref';
import { ThyTooltipService } from './tooltip.service';

/**
 * @name thyTooltip
 */
@Directive({ selector: '[thyTooltip],[thy-tooltip]', exportAs: 'thyTooltip' })
export class ThyTooltipDirective extends ThyOverlayDirectiveBase implements OnInit, OnDestroy {
    private viewContainerRef = inject(ViewContainerRef);
    private thyTooltipService = inject(ThyTooltipService);

    touchendHideDelay = 1500;

    protected isAutoCloseOnMobileTouch: boolean = true;

    private tooltipRef!: ThyTooltipRef;

    private readonly viewInitialized = signal(false);

    /**
     * 提示消息，可以是文本，也可以是一个模板
     * @type string | TemplateRef<T>
     */
    readonly thyTooltipContent = input<ThyTooltipContent>(undefined, { alias: 'thyTooltip' });

    getValidContent(value: ThyTooltipContent) {
        // If the content is not a string (e.g. number), convert it to a string and trim it.
        const validValue = value && isString(value) ? `${value}`.trim() : value;
        return validValue;
    }

    content = linkedSignal(() => {
        const value = this.thyTooltipContent();
        return this.getValidContent(value!);
    });

    /**
     * 指定提示的位置
     * @type ThyPlacement
     */
    readonly thyPlacement = input<ThyPlacement>('top', { alias: 'thyTooltipPlacement' });

    placement = linkedSignal(() => {
        return this.thyPlacement();
    });

    /**
     * 提示内容自定义样式
     */
    readonly thyTooltipClass = input<string | string[]>();

    /**
     * 显示提示内容延迟毫秒
     */
    readonly thyTooltipShowDelay = input<number, unknown>(undefined, { transform: numberAttribute });

    /**
     * 隐藏提示内容延迟毫秒
     */
    readonly thyTooltipHideDelay = input<number, unknown>(undefined, { transform: numberAttribute });

    /**
     * 触发提示方式
     * <br/>`hover` 鼠标移入，显示提示；鼠标移出，隐藏提示；显示提示时，滚动页面，会隐藏提示。
     * <br/>`focus` 元素获取焦点，显示提示；元素失去焦点，隐藏提示；显示元素时，滚动页面，提示会跟随聚焦源一起移动。
     * <br/>`click` 点击元素，显示提示；点击backdrop，隐藏提示；显示提示时，页面的滚动行为会被阻止。
     *
     * @type hover | focus | click
     */
    readonly thyTooltipTrigger = input<ThyOverlayTrigger>('hover');

    /**
     * 设置是否禁用提示
     * @default false
     */
    readonly thyTooltipDisabled = input<boolean, unknown>(undefined, { transform: coerceBooleanProperty });

    toolTipDisabled = linkedSignal(() => {
        return this.thyTooltipDisabled();
    });

    /**
     * 传入 template 时，需要注入给 template 的上下文数据
     */
    readonly data = input<SafeAny>(undefined, { alias: 'thyTooltipTemplateContext' });

    /**
     * 偏移量
     */
    readonly thyTooltipOffset = input<number, unknown>(undefined, { alias: 'thyTooltipOffset', transform: numberAttribute });

    tooltipOffset = linkedSignal(() => {
        return this.thyTooltipOffset();
    });

    /**
     * hover 触发方式下 鼠标移入Tooltip是否固定 Tooltip
     * @default false
     */
    readonly tooltipPin = input<boolean, unknown>(undefined, { alias: 'thyTooltipPin', transform: coerceBooleanProperty });

    setDisabled(disabled: boolean) {
        this.toolTipDisabled.set(disabled);
    }

    setContent(content: ThyTooltipContent) {
        const validValue = this.getValidContent(content);
        this.content.set(validValue);
    }

    setOffset(offset: number) {
        this.tooltipOffset.set(offset);
    }

    setPlacement(placement: ThyPlacement) {
        this.placement.set(placement);
    }

    constructor() {
        const elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
        const ngZone = inject(NgZone);
        const platform = inject(Platform);
        const focusMonitor = inject(FocusMonitor);
        super(elementRef, platform, focusMonitor, ngZone);

        effect(() => {
            const value = this.content();
            const data = this.data();
            const viewInit = this.viewInitialized();
            if (!value && this.tooltipRef?.isTooltipVisible()) {
                this.tooltipRef.hide(0);
            } else if (value && this.tooltipRef?.isTooltipVisible()) {
                this.tooltipRef?.updateTooltipContent(value, data);
            }
            if (value && viewInit && !this.disabled) {
                this.setupEventsIfNeeded();
            }
        });

        effect(() => {
            const trigger = this.thyTooltipTrigger();
            const overlayPin = this.tooltipPin();
            this.trigger = trigger;
            this.overlayPin = overlayPin;
        });

        effect(() => {
            const disabled = this.toolTipDisabled();
            this.disabled = !!disabled;
            if (disabled && this.tooltipRef?.isTooltipVisible()) {
                this.hide(0);
            }
        });

        afterNextRender(() => {
            this.viewInitialized.set(true);
            const tooltipClass = this.thyTooltipClass();
            if (this.tooltipRef && tooltipClass) {
                this.tooltipRef.setTooltipClass(tooltipClass);
            }
        });
    }

    ngOnInit() {}

    private setupEventsIfNeeded(): void {
        const content = this.content();
        const viewInitialized = this.viewInitialized();
        if (this.disabled || !content || !viewInitialized) {
            return;
        }
        this.initialize();
    }

    /** Shows the tooltip after the delay in ms, defaults to tooltip-delay-show 200ms */
    show(delay: number | undefined = this.thyTooltipShowDelay()): void {
        if (this.disabled) {
            return;
        }
        if (!this.tooltipRef) {
            this.tooltipRef = this.thyTooltipService.create(this.elementRef, {
                viewContainerRef: this.viewContainerRef,
                placement: this.placement(),
                contentClass: this.thyTooltipClass(),
                offset: this.tooltipOffset(),
                tooltipPin: this.tooltipPin(),
                hasBackdrop: this.trigger === 'click'
            });
        }
        this.tooltipRef.show(this.content(), this.data(), delay);
    }

    /** Hides the tooltip after the delay in ms, defaults to tooltip-delay-hide 100ms */
    hide(delay: number | undefined = this.thyTooltipHideDelay()): void {
        this.tooltipRef?.hide(delay);
    }

    ngOnDestroy() {
        this.tooltipRef?.dispose();
    }
}
