import { Directive, EventEmitter, forwardRef, HostListener, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThyPopover } from 'ngx-tethys/popover';
import { ThyDefaultPanelComponent } from './default-panel.component';
import Color from './helpers/color.class';
/**
 * 颜色选择器组件
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
export class ThyColorPickerDirective implements OnInit {
    /**
     * 选中颜色
     */
    @Input() thyColor: string;

    /**
     * 颜色change事件
     */
    @Output()
    public thyColorChange = new EventEmitter<string>();

    public get backgroundColor(): string {
        return this.thyColor;
    }

    constructor(private thyPopover: ThyPopover) {}

    ngOnInit(): void {}

    @HostListener('click', ['$event'])
    togglePanel(event: Event) {
        this.thyPopover.open(ThyDefaultPanelComponent, {
            origin: event.currentTarget as HTMLElement,
            offset: 0,
            manualClosure: true,
            width: '286px',
            originActiveClass: 'thy-defaul-picker-active',
            initialState: {
                color: new Color(this.thyColor).toHexString(true),
                colorChange: (value: string) => {
                    this.thyColorChange.emit(value);
                }
            }
        });
    }
}
