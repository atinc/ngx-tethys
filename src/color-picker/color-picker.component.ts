import { FocusMonitor } from '@angular/cdk/a11y';
import { OverlayRef } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import {
    AfterViewInit,
    Directive,
    effect,
    ElementRef,
    forwardRef,
    inject,
    Input,
    input,
    NgZone,
    numberAttribute,
    OnDestroy,
    OnInit,
    output
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { mixinDisabled, mixinTabIndex, ThyOverlayDirectiveBase, ThyOverlayTrigger, ThyPlacement } from 'ngx-tethys/core';
import { ThyPopover, ThyPopoverRef } from 'ngx-tethys/popover';
import { coerceBooleanProperty } from 'ngx-tethys/util';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ThyColorPickerPanel } from './color-picker-panel.component';
import { DEFAULT_COLORS } from './constant';
import { ThyColor } from './helpers/color.class';

export class OverlayBase extends ThyOverlayDirectiveBase {
    constructor(
        protected zone: NgZone,
        protected elementRef: ElementRef<HTMLElement>,
        platform: Platform,
        focusMonitor: FocusMonitor
    ) {
        super(elementRef, platform, focusMonitor, zone, true);
    }

    show(): void {}

    hide() {}
}

const _BaseMixin = mixinTabIndex(mixinDisabled(OverlayBase));

/**
 * 颜色选择组件
 * @name thyColorPicker
 */
@Directive({
    selector: '[thyColorPicker]',
    host: {
        class: 'thy-color-picker',
        '[attr.tabindex]': `tabIndex`,
        '[class.thy-color-picker-disabled]': 'disabled'
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => ThyColorPickerDirective)
        }
    ]
})
export class ThyColorPickerDirective extends _BaseMixin implements OnInit, OnDestroy, AfterViewInit {
    private thyPopover = inject(ThyPopover);

    /**
     * 弹框偏移量
     * @type  number
     */
    readonly thyOffset = input<number, unknown>(0, { transform: numberAttribute });

    /**
     * 颜色选择面板是否有幕布
     */
    readonly thyHasBackdrop = input(true, { transform: coerceBooleanProperty });

    /**
     * 设置颜色选择面板的默认颜色选项值
     */
    readonly thyDefaultColor = input<string>();

    /**
     * 是否显示'无填充色'选项
     */
    readonly thyTransparentColorSelectable = input(true, { transform: coerceBooleanProperty });

    /**
     * 预设的快捷选择颜色
     * @type string[]
     */
    readonly thyPresetColors = input<string[]>(DEFAULT_COLORS);

    /**
     * 颜色面板弹出位置 'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight' | 'left' | 'leftTop' | 'leftBottom' | 'right' | 'rightTop' | 'rightBottom'
     * @type ThyPlacement
     */
    readonly thyPlacement = input<ThyPlacement>('bottom');

    /**
     * panel 展开后触发
     */
    readonly thyPanelOpen = output<ThyPopoverRef<ThyColorPickerPanel>>();

    /**
     * panel 关闭后触发
     */
    readonly thyPanelClose = output<ThyPopoverRef<ThyColorPickerPanel>>();

    /**
     * 弹出悬浮层的触发方式
     * @type 'hover' | 'click'
     */
    readonly thyTrigger = input<ThyOverlayTrigger>('click');

    /**
     * 显示延迟时间
     */
    readonly thyShowDelay = input<number, unknown>(100, { transform: numberAttribute });

    /**
     * 隐藏延迟时间
     */
    readonly thyHideDelay = input<number, unknown>(100, { transform: numberAttribute });

    /**
     * 是否属于禁用状态
     */
    @Input({ transform: coerceBooleanProperty })
    override set thyDisabled(value: boolean) {
        this.disabled = value;
    }
    override get thyDisabled(): boolean {
        return this.disabled;
    }

    protected onChangeFn: (value: number | string) => void = () => {};

    private onTouchFn: () => void = () => {};

    color: string;

    private popoverRef: ThyPopoverRef<ThyColorPickerPanel>;

    private closePanel = true;

    private destroy$ = new Subject<void>();

    public get backgroundColor(): string {
        return this.color;
    }

    constructor() {
        const zone = inject(NgZone);
        const elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
        const platform = inject(Platform);
        const focusMonitor = inject(FocusMonitor);

        super(zone, elementRef, platform, focusMonitor);

        effect(() => {
            // TODO: 基类参数
            this.showDelay = this.thyShowDelay() ?? 100;
            this.hideDelay = this.thyHideDelay() ?? 100;
            this.trigger = this.thyTrigger() || 'click';
        });
    }

    ngOnInit(): void {}

    ngAfterViewInit() {
        this.initialize();
        if (this.trigger === 'hover') {
            this.ngZone.runOutsideAngular(() => {
                return fromEvent(document, 'mousemove')
                    .pipe(takeUntil(this.destroy$))
                    .subscribe(event => {
                        if (this.popoverRef?.getOverlayRef()?.hasAttached()) {
                            if (
                                this.elementRef.nativeElement.contains(event.target as HTMLElement) ||
                                (event.target as HTMLElement).closest('.thy-color-picker-custom-panel') ||
                                !!(event.target as HTMLElement).querySelector('.thy-color-picker-custom-panel') ||
                                this.popoverRef.getOverlayRef()?.hostElement?.contains(event.target as HTMLElement)
                            ) {
                                this.closePanel = false;
                            } else {
                                this.closePanel = true;
                                this.popoverRef.close();
                            }
                        }
                    });
            });
        }
    }

    togglePanel(): OverlayRef {
        this.closePanel = false;
        this.popoverRef = this.thyPopover.open(ThyColorPickerPanel, {
            origin: this.elementRef.nativeElement as HTMLElement,
            offset: this.thyOffset(),
            manualClosure: true,
            width: '286px',
            placement: this.thyPlacement(),
            originActiveClass: 'thy-default-picker-active',
            hasBackdrop: this.thyHasBackdrop(),
            outsideClosable: false,
            canClose: () => {
                if (this.trigger === 'hover') {
                    return this.closePanel;
                }
                return true;
            },
            initialState: {
                color: new ThyColor(this.color).toHexString(true),
                defaultColor: this.thyDefaultColor(),
                transparentColorSelectable: this.thyTransparentColorSelectable(),
                defaultColors: this.thyPresetColors(),
                colorChange: (value: string) => {
                    this.closePanel = true;
                    this.onModelChange(value);
                }
            }
        });
        if (this.popoverRef) {
            this.popoverRef.afterOpened().subscribe(() => {
                this.thyPanelOpen.emit(this.popoverRef);
            });
            this.popoverRef.afterClosed().subscribe(() => {
                this.thyPanelClose.emit(this.popoverRef);
                this.elementRef.nativeElement.focus();
            });
        }
        if (this.popoverRef && !this.thyHasBackdrop()) {
            this.popoverRef
                .getOverlayRef()
                .outsidePointerEvents()
                .subscribe(event => {
                    if ((event.target as HTMLElement).closest('.thy-color-picker-custom-panel')) {
                        return;
                    }
                    if (!this.popoverRef.getOverlayRef().hostElement.contains(event.target as HTMLElement)) {
                        this.popoverRef.close();
                    }
                });
        }
        return this.popoverRef.getOverlayRef();
    }

    override show(delay: number = this.showDelay): void {
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
            const overlayRef = this.togglePanel();
            this.overlayRef = overlayRef;
            this.showTimeoutId = null;
        }, delay);
    }

    override hide(delay: number = this.hideDelay) {
        if (this.showTimeoutId) {
            clearTimeout(this.showTimeoutId);
            this.showTimeoutId = null;
        }

        this.hideTimeoutId = setTimeout(() => {
            if (this.popoverRef) {
                this.popoverRef?.getOverlayRef()?.hasAttached() && this.popoverRef.close();
            }
            this.hideTimeoutId = null;
        }, delay);
    }

    writeValue(value: string): void {
        this.color = value;
    }

    registerOnChange(fn: any): void {
        this.onChangeFn = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchFn = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    onModelChange(value: string): void {
        this.color = value;
        this.onChangeFn(value);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
        this.hide();
        this.dispose();
        this.popoverRef = null;
    }
}
