import { FocusMonitor } from '@angular/cdk/a11y';
import { Platform } from '@angular/cdk/platform';
import { Directive, ElementRef, Input, NgZone, OnDestroy, OnInit, ViewContainerRef, numberAttribute, inject } from '@angular/core';
import { ThyOverlayDirectiveBase, ThyOverlayTrigger, ThyPlacement } from 'ngx-tethys/core';
import { SafeAny } from 'ngx-tethys/types';
import { coerceBooleanProperty, isString } from 'ngx-tethys/util';
import { ThyTooltipContent } from './interface';
import { ThyTooltipRef } from './tooltip-ref';
import { ThyTooltipService } from './tooltip.service';

/**
 * @name thyTooltip
 */
@Directive({
    selector: '[thyTooltip],[thy-tooltip]',
    exportAs: 'thyTooltip'
})
export class ThyTooltipDirective extends ThyOverlayDirectiveBase implements OnInit, OnDestroy {
    private viewContainerRef = inject(ViewContainerRef);
    private thyTooltipService = inject(ThyTooltipService);

    touchendHideDelay = 1500;

    protected isAutoCloseOnMobileTouch: boolean = true;

    private tooltipClass: string | string[];

    private tooltipRef: ThyTooltipRef;

    private _content: ThyTooltipContent;

    get content() {
        return this._content;
    }

    /**
     * 提示消息，可以是文本，也可以是一个模板
     * @type string | TemplateRef<T>
     */
    @Input('thyTooltip') set content(value: ThyTooltipContent) {
        // If the content is not a string (e.g. number), convert it to a string and trim it.
        this._content = value && isString(value) ? `${value}`.trim() : value;
        if (!this._content && this.tooltipRef?.isTooltipVisible()) {
            this.tooltipRef.hide(0);
        } else {
            this.tooltipRef?.updateTooltipContent(value, this.data);
        }
    }

    /**
     * 指定提示的位置
     * @type ThyPlacement
     */
    @Input('thyTooltipPlacement') placement: ThyPlacement = 'top';

    /**
     * 提示内容自定义样式
     */
    @Input('thyTooltipClass')
    set thyTooltipClass(value: string | string[]) {
        this.tooltipClass = value;
        this.tooltipRef?.setTooltipClass(this.tooltipClass);
    }

    /**
     * 显示提示内容延迟毫秒
     */
    @Input({ alias: 'thyTooltipShowDelay', transform: numberAttribute }) showDelay: number;

    /**
     * 隐藏提示内容延迟毫秒
     */
    @Input({ alias: 'thyTooltipHideDelay', transform: numberAttribute }) hideDelay: number;

    _trigger: ThyOverlayTrigger = 'hover';

    /**
     * 触发提示方式
     * <br/>`hover` 鼠标移入，显示提示；鼠标移出，隐藏提示；显示提示时，滚动页面，会隐藏提示。
     * <br/>`focus` 元素获取焦点，显示提示；元素失去焦点，隐藏提示；显示元素时，滚动页面，提示会跟随聚焦源一起移动。
     * <br/>`click` 点击元素，显示提示；点击backdrop，隐藏提示；显示提示时，页面的滚动行为会被阻止。
     *
     * @type hover | focus | click
     */
    @Input('thyTooltipTrigger') set thyTooltipTrigger(value: ThyOverlayTrigger) {
        this.trigger = value;
    }

    /**
     * 设置是否禁用提示
     * @default false
     */
    @Input({ alias: 'thyTooltipDisabled', transform: coerceBooleanProperty })
    set thyTooltipDisabled(value: boolean) {
        this.disabled = value;
        // If tooltip is disabled, hide immediately.
        if (this.disabled) {
            this.hide(0);
        }
    }

    /**
     * 传入 template 时，需要注入给 template 的上下文数据
     */
    @Input('thyTooltipTemplateContext') data: SafeAny;

    /**
     * 偏移量
     */
    @Input({ alias: 'thyTooltipOffset', transform: numberAttribute }) tooltipOffset: number;

    /**
     * hover 触发方式下 鼠标移入Tooltip是否固定 Tooltip
     * @default false
     */
    @Input({ alias: 'thyTooltipPin', transform: coerceBooleanProperty })
    set tooltipPin(value: boolean) {
        this.overlayPin = value;
    }

    constructor() {
        const elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
        const ngZone = inject(NgZone);
        const platform = inject(Platform);
        const focusMonitor = inject(FocusMonitor);

        super(elementRef, platform, focusMonitor, ngZone);
    }

    ngOnInit() {
        this.initialize();
    }

    /** Shows the tooltip after the delay in ms, defaults to tooltip-delay-show 200ms */
    show(delay: number = this.showDelay): void {
        if (this.disabled) {
            return;
        }
        if (!this.tooltipRef) {
            this.tooltipRef = this.thyTooltipService.create(this.elementRef, {
                viewContainerRef: this.viewContainerRef,
                placement: this.placement,
                contentClass: this.tooltipClass,
                offset: this.tooltipOffset,
                tooltipPin: this.tooltipPin,
                hasBackdrop: this.trigger === 'click'
            });
        }
        this.tooltipRef.show(this.content, this.data, delay);
    }

    /** Hides the tooltip after the delay in ms, defaults to tooltip-delay-hide 100ms */
    hide(delay: number = this.hideDelay): void {
        this.tooltipRef?.hide(delay);
    }

    ngOnDestroy() {
        this.tooltipRef?.dispose();
    }
}
