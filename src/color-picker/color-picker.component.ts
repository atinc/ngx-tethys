import { Directive, ElementRef, forwardRef, Input, NgZone, OnDestroy, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputBoolean } from 'ngx-tethys/core';
import { ThyPopover, ThyPopoverRef } from 'ngx-tethys/popover';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ThyColorPickerPanelComponent } from './color-picker-panel.component';
import { DEFAULT_COLORS } from './constant';
import ThyColor from './helpers/color.class';
/**
 * 颜色选择组件
 */
@Directive({
    selector: '[thyColorPicker]',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => ThyColorPickerDirective)
        }
    ]
})
export class ThyColorPickerDirective implements OnInit, OnDestroy {
    /**
     * 弹框偏移量。
     * @type  number
     * @default 0
     */
    @Input() thyOffset: number = 0;

    /**
     * 颜色选择面板是否有幕布。
     * @default true
     */
    @Input() @InputBoolean() thyHasBackdrop: boolean = true;

    /**
     * 设置颜色选择面板的默认颜色选项值。
     */
    @Input() thyDefaultColor: string;

    /**
     * 是否显示'无填充色'选项。
     */
    @Input() @InputBoolean() thyTransparentColorSelectable: boolean = true;

    /**
     * 预设的快捷选择颜色。
     * @default DEFAULT_COLORS
     */
    @Input() thyPresetColors: string[] = DEFAULT_COLORS;

    private onChangeFn: (value: number | string) => void = () => {};

    private onTouchFn: () => void = () => {};

    color: string;

    private popoverRef: ThyPopoverRef<ThyColorPickerPanelComponent>;

    private destroy$ = new Subject<void>();

    public get backgroundColor(): string {
        return this.color;
    }

    constructor(private thyPopover: ThyPopover, private zone: NgZone, private elementRef: ElementRef<HTMLElement>) {}

    ngOnInit(): void {
        this.zone.runOutsideAngular(() => {
            fromEvent<Event>(this.elementRef.nativeElement, 'click')
                .pipe(takeUntil(this.destroy$))
                .subscribe(event => {
                    this.zone.run(() => this.togglePanel(event));
                });
        });
    }

    togglePanel(event: Event) {
        this.popoverRef = this.thyPopover.open(ThyColorPickerPanelComponent, {
            origin: event.currentTarget as HTMLElement,
            offset: this.thyOffset,
            manualClosure: true,
            width: '286px',
            originActiveClass: 'thy-default-picker-active',
            hasBackdrop: this.thyHasBackdrop,
            outsideClosable: false,
            initialState: {
                color: new ThyColor(this.color).toHexString(true),
                defaultColor: this.thyDefaultColor,
                transparentColorSelectable: this.thyTransparentColorSelectable,
                defaultColors: this.thyPresetColors,
                colorChange: (value: string) => {
                    this.onModelChange(value);
                }
            }
        });
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
    }

    hide() {
        this.popoverRef?.getOverlayRef()?.hasAttached() && this.popoverRef.close();
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

    onModelChange(value: string): void {
        this.color = value;
        this.onChangeFn(value);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
        this.hide();
        this.popoverRef = null;
    }
}
