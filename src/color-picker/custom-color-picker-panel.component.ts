import { Component, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import ThyColor from './helpers/color.class';

/**
 * @internal
 */
@Component({
    selector: 'thy-picker-panel',
    templateUrl: './custom-color-picker-panel.component.html'
})
export class ThyPickerPanelComponent implements OnInit {
    @HostBinding('class.thy-picker-panel') className = true;

    @HostListener('keydown', ['$event'])
    preventDefault(e: KeyboardEvent) {
        e.stopPropagation();
    }

    colorInstance: ThyColor;

    @Input() color?: string;

    @Input() pickerColorChange: (color: string) => {};

    constructor() {}

    ngOnInit() {
        this.colorInstance = new ThyColor(this.color);
    }

    colorChangeEvent($event: ThyColor) {
        this.colorInstance = $event;
        this.color = this.colorInstance.displayValue;
        this.pickerColorChange(this.color);
    }
}
