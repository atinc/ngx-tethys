import { Component, HostBinding, Input, OnInit } from '@angular/core';
import ThyColor from './helpers/color.class';

/**
 * @internal
 */
@Component({
    selector: 'thy-picker-panel',
    templateUrl: './picker-panel.component.html'
})
export class ThyPickerPanelComponent implements OnInit {
    @HostBinding('class.thy-picker-panel') className = true;

    colour: ThyColor;

    @Input() color?: string;

    @Input() pickerColorChange: (color: string) => {};

    constructor() {}

    ngOnInit() {
        this.colour = new ThyColor(this.color);
    }

    colorChangeEvent($event: ThyColor) {
        this.colour = $event;
        this.color = this.colour.displayValue;
        this.pickerColorChange(this.color);
    }
}
