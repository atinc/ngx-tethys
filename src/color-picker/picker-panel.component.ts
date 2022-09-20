import { Component, HostBinding, Input, OnInit } from '@angular/core';
import Color from './helpers/color.class';

/**
 * @internal
 */
@Component({
    selector: 'thy-picker-panel',
    templateUrl: './picker-panel.component.html'
})
export class ThyPickerPanelComponent implements OnInit {
    @HostBinding('class.thy-picker-panel') className = true;

    colour: Color;

    @Input() color?: string;

    @Input() pickerColorChange: (color: string) => {};

    constructor() {}

    ngOnInit() {
        this.colour = new Color(this.color);
    }

    colorChangeEvent($event: Color) {
        this.colour = $event;
        this.color = this.colour.displayValue;
        this.pickerColorChange(this.color);
    }
}
