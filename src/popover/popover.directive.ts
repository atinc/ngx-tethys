import {
    Directive,
    ElementRef,
    NgZone,
    OnDestroy,
    Input,
    TemplateRef,
    OnInit,
    ViewContainerRef,
    HostBinding,
    ChangeDetectorRef,
    numberAttribute,
    inject
} from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { OverlayRef } from '@angular/cdk/overlay';
import { FocusMonitor } from '@angular/cdk/a11y';
import { ThyOverlayDirectiveBase, ThyOverlayTrigger, ThyPlacement } from 'ngx-tethys/core';
import { ThyPopover } from './popover.service';
import { ComponentType } from '@angular/cdk/portal';
import { ThyPopoverRef } from './popover-ref';
import { ThyPopoverConfig } from './popover.config';
import { coerceBooleanProperty } from 'ngx-tethys/util';

/**
 * 弹出悬浮层指令
 * @name thyPopover
 * @order 50
 */
@Directive({
    selector: '[thyPopover]',
    standalone: true
})
export class ThyPopoverDirective extends ThyOverlayDirectiveBase implements OnInit, OnDestroy {
    elementRef: ElementRef;
    private popover = inject(ThyPopover);
    private viewContainerRef = inject(ViewContainerRef);
    private cdr = inject(ChangeDetectorRef);

    @HostBinding(`class.thy-popover-opened`) popoverOpened = false;

    /**
     * 悬浮组件或者模板
     */
    @Input('thyPopover') content: ComponentType<any> | TemplateRef<any>;

    /**
     * 弹出悬浮层的触发方式
     */
    @Input() set thyTrigger(trigger: ThyOverlayTrigger) {
        this.trigger = trigger;
    }

    /**
     * 弹出悬浮层的位置
     * @type top | topLeft | topRight | bottom | bottomLeft | bottomRight | left | leftTop | leftBottom | right |  rightTop | rightBottom
     */
    @Input() thyPlacement: ThyPlacement = 'bottom';

    /**
     * 弹出悬浮层的偏移量
     */
    @Input({ transform: numberAttribute }) thyOffset: number = 0;

    /**
     * 弹出悬浮层的配置
     */
    @Input() thyConfig: ThyPopoverConfig;

    /**
     * 显示延迟时间
     */
    @Input({ transform: numberAttribute })
    set thyShowDelay(value: number) {
        this.showDelay = value;
    }

    /**
     * 隐藏延迟时间
     */
    @Input({ transform: numberAttribute })
    set thyHideDelay(value: number) {
        this.hideDelay = value;
    }

    /**
     * 自动适配内容变化重新计算位置
     */
    @Input({ transform: coerceBooleanProperty }) thyAutoAdaptive = false;

    /**
     * 是否禁用打开悬浮层
     * @default false
     */
    @Input({ transform: coerceBooleanProperty }) set thyDisabled(value: boolean) {
        this.disabled = value;
    }

    private popoverRef: ThyPopoverRef<any>;

    constructor() {
        const elementRef = inject(ElementRef);
        const platform = inject(Platform);
        const focusMonitor = inject(FocusMonitor);
        const ngZone = inject(NgZone);

        super(elementRef, platform, focusMonitor, ngZone, true);
        this.elementRef = elementRef;
    }

    ngOnInit(): void {
        this.initialize();
    }

    createOverlay(): OverlayRef {
        const config = Object.assign(
            {
                origin: this.elementRef.nativeElement,
                hasBackdrop: this.trigger === 'click' || this.trigger === 'focus',
                viewContainerRef: this.viewContainerRef,
                placement: this.thyPlacement,
                offset: this.thyOffset,
                autoAdaptive: this.thyAutoAdaptive
            },
            this.thyConfig
        );
        this.popoverRef = this.popover.open(this.content, config);

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
            if (!this.disabled) {
                const overlayRef = this.createOverlay();
                this.overlayRef = overlayRef;
                this.popoverOpened = true;
                this.cdr.markForCheck();
            }
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
                this.cdr.markForCheck();
            }
            this.hideTimeoutId = null;
        }, delay);
    }

    ngOnDestroy() {
        this.dispose();
    }
}
