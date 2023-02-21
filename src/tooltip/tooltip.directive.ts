import { Directive, ElementRef, NgZone, Input, OnInit, OnDestroy, ViewContainerRef, Inject } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty, isString } from 'ngx-tethys/util';
import { ThyPlacement, ThyOverlayDirectiveBase, ThyOverlayTrigger, InputBoolean } from 'ngx-tethys/core';
import { ThyTooltipContent } from './interface';
import { ThyTooltipRef } from './tooltip-ref';
import { ThyTooltipService } from './tooltip.service';
import { SafeAny } from 'ngx-tethys/types';

@Directive({
    selector: '[thyTooltip],[thy-tooltip]',
    exportAs: 'thyTooltip'
})
export class ThyTooltipDirective extends ThyOverlayDirectiveBase implements OnInit, OnDestroy {
    touchendHideDelay = 1500;

    private tooltipClass: string | string[];

    private tooltipRef: ThyTooltipRef;

    private _content: ThyTooltipContent;

    get content() {
        return this._content;
    }

    /**
     * 提示消息，可以是文本，也可以是一个模版
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
     */
    // eslint-disable-next-line @angular-eslint/no-input-rename
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
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('thyTooltipShowDelay') showDelay: number;

    /**
     * 隐藏提示内容延迟毫秒
     */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('thyTooltipHideDelay') hideDelay: number;

    _trigger: ThyOverlayTrigger = 'hover';

    /**
     * 触发提示方式
     * @type 'hover' | 'focus' | 'click'
     */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('thyTooltipTrigger') set thyTooltipTrigger(value: ThyOverlayTrigger) {
        this.trigger = value;
    }

    /**
     * 设置是否禁用提示
     */
    @Input('thyTooltipDisabled')
    set thyTooltipDisabled(value: boolean) {
        this.disabled = coerceBooleanProperty(value);
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
    @Input('thyTooltipOffset') tooltipOffset: number;

    /**
     * hover 触发方式下 鼠标移入Tooltip是否固定 Tooltip
     */
    @Input('thyTooltipPin')
    @InputBoolean()
    set tooltipPin(value: boolean) {
        this.overlayPin = value;
    }

    constructor(
        elementRef: ElementRef<HTMLElement>,
        ngZone: NgZone,
        platform: Platform,
        focusMonitor: FocusMonitor,
        private viewContainerRef: ViewContainerRef,
        private thyTooltipService: ThyTooltipService
    ) {
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
