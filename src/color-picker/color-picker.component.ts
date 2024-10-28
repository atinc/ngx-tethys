import { FocusMonitor } from '@angular/cdk/a11y';
import { Platform } from '@angular/cdk/platform';
import {
    Directive,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    NgZone,
    numberAttribute,
    OnDestroy,
    OnInit,
    Output,
    inject
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThyOverlayDirectiveBase, ThyPlacement, ThyOverlayTrigger, mixinTabIndex, mixinDisabled } from 'ngx-tethys/core';
import { ThyPopover, ThyPopoverRef } from 'ngx-tethys/popover';
import { fromEvent, Subject } from 'rxjs';
import { ThyColorPickerPanel } from './color-picker-panel.component';
import { DEFAULT_COLORS } from './constant';
import { ThyColor } from './helpers/color.class';
import { takeUntil } from 'rxjs/operators';
import { coerceBooleanProperty } from 'ngx-tethys/util';

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
    ],
    standalone: true
})
export class ThyColorPickerDirective extends _BaseMixin implements OnInit, OnDestroy {
    private thyPopover = inject(ThyPopover);
    protected zone: NgZone;
    protected elementRef: ElementRef<HTMLElement>;

    /**
     * 弹框偏移量
     * @type  number
     */
    @Input({ transform: numberAttribute }) thyOffset: number = 0;

    /**
     * 颜色选择面板是否有幕布
     */
    @Input({ transform: coerceBooleanProperty }) thyHasBackdrop: boolean = true;

    /**
     * 设置颜色选择面板的默认颜色选项值
     */
    @Input() thyDefaultColor: string;

    /**
     * 是否显示'无填充色'选项
     */
    @Input({ transform: coerceBooleanProperty }) thyTransparentColorSelectable: boolean = true;

    /**
     * 预设的快捷选择颜色
     * @type string[]
     */
    @Input() thyPresetColors: string[] = DEFAULT_COLORS;

    /**
     * 颜色面板弹出位置 'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight' | 'left' | 'leftTop' | 'leftBottom' | 'right' | 'rightTop' | 'rightBottom'
     * @type ThyPlacement
     */
    @Input() thyPlacement: ThyPlacement = 'bottom';

    /**
     * panel 展开后触发
     */
    @Output() thyPanelOpen: EventEmitter<ThyPopoverRef<ThyColorPickerPanel>> = new EventEmitter<ThyPopoverRef<ThyColorPickerPanel>>();

    /**
     * panel 关闭后触发
     */
    @Output() thyPanelClose: EventEmitter<ThyPopoverRef<ThyColorPickerPanel>> = new EventEmitter<ThyPopoverRef<ThyColorPickerPanel>>();

    /**
     * 弹出悬浮层的触发方式
     * @type 'hover' | 'click'
     * @default click
     */
    @Input() set thyTrigger(trigger: ThyOverlayTrigger) {
        this.trigger = trigger;
    }

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
        this.zone = zone;
        this.elementRef = elementRef;
    }

    ngOnInit(): void {
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

    togglePanel() {
        this.closePanel = false;
        this.popoverRef = this.thyPopover.open(ThyColorPickerPanel, {
            origin: this.elementRef.nativeElement as HTMLElement,
            offset: this.thyOffset,
            manualClosure: true,
            width: '286px',
            placement: this.thyPlacement,
            originActiveClass: 'thy-default-picker-active',
            hasBackdrop: this.thyHasBackdrop,
            outsideClosable: false,
            canClose: () => {
                if (this.trigger === 'hover') {
                    return this.closePanel;
                }
                return true;
            },
            initialState: {
                color: new ThyColor(this.color).toHexString(true),
                defaultColor: this.thyDefaultColor,
                transparentColorSelectable: this.thyTransparentColorSelectable,
                defaultColors: this.thyPresetColors,
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
        if (this.popoverRef && !this.thyHasBackdrop) {
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
