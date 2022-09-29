import { Directive, ElementRef, forwardRef, NgZone, OnDestroy, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThyPopover } from 'ngx-tethys/popover';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ThyColorDefaultPanelComponent } from './default-panel.component';
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
        const defaultPanelPopover = this.thyPopover.open(ThyColorDefaultPanelComponent, {
            origin: event.currentTarget as HTMLElement,
            offset: 0,
            manualClosure: true,
            width: '286px',
            originActiveClass: 'thy-default-picker-active',
            initialState: {
                color: new ThyColor(this.color).toHexString(true),
                colorChange: (value: string) => {
                    this.onModelChange(value);
                },
                closeCallback: () => {
                    defaultPanelPopover.close();
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
    }
}
