import { Directive, ElementRef, forwardRef, NgZone, Input, OnDestroy, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThyPopover } from 'ngx-tethys/popover';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ThyColorPickerPanelComponent } from './color-picker-panel.component';
import ThyColor from './helpers/color.class';
import { InputBoolean } from '../core/behaviors/decorators';
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
     * 弹框偏移量
     * @type  number
     * @default 0
     */
    @Input() thyOffset: number = 0;

    /**
     * 颜色选择面板是否有幕布，当设置为 false 时，需手动关闭面板。
     * @default true
     */
    @Input() @InputBoolean() thyHasBackdrop: boolean = true;

    private onChangeFn: (value: number | string) => void = () => {};

    private onTouchFn: () => void = () => {};

    color: string;

    private destroy$ = new Subject<void>();

    public get backgroundColor(): string {
        return this.color;
    }

    constructor(
        private thyPopover: ThyPopover,
        private zone: NgZone,
        private elementRef: ElementRef<HTMLElement>,
        private ngZone: NgZone
    ) {}

    ngOnInit(): void {
        this.zone.runOutsideAngular(() => {
            fromEvent<Event>(this.elementRef.nativeElement, 'click')
                .pipe(takeUntil(this.destroy$))
                .subscribe(event => {
                    this.ngZone.run(() => this.togglePanel(event));
                });
        });
    }

    togglePanel(event: Event) {
        this.thyPopover.open(ThyColorPickerPanelComponent, {
            origin: event.currentTarget as HTMLElement,
            offset: 0,
            manualClosure: true,
            width: '286px',
            originActiveClass: 'thy-color-picker-active',
            hasBackdrop: this.thyHasBackdrop,
            backdropClosable: this.thyHasBackdrop ? true : false,
            initialState: {
                color: new ThyColor(this.color).toHexString(true),
                popoverOptions: {
                    hasBackdrop: this.thyHasBackdrop
                },
                colorChange: (value: string) => {
                    this.onModelChange(value);
                }
            }
        });
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
    }
}
