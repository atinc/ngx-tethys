import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { ThyPopover } from 'ngx-tethys/popover';
import Color from './helpers/color.class';
import { DEFAULT_COLORS } from './helpers/constant';
import { ThyPickerPanelComponent } from './picker-panel.component';

/**
 * 颜色选择器组件
 */
@Component({
    selector: 'thy-default-panel',
    templateUrl: './default-panel.component.html'
})
export class ThyDefaultPanelComponent implements OnInit {
    @HostBinding('class.thy-default-panel') className = true;

    colour: string;

    @Input() set color(value: string) {
        this.colour = value;
    }

    get color() {
        return this.colour;
    }

    @Input() colorChange: (color: string) => {};

    defaultColors = DEFAULT_COLORS;

    recentColors: string[] = [];

    newColor: string;

    constructor(private thyPopover: ThyPopover) {}

    ngOnInit(): void {
        const colors = localStorage.getItem('recentColors');
        if (colors) {
            this.recentColors = JSON.parse(colors);
        }
    }

    selectColor(color: string) {
        this.colour = color;
        this.colorChange(this.colour);
        this.thyPopover.closeAll();
    }

    showMoreColor(event: Event) {
        const popoverRef = this.thyPopover.open(ThyPickerPanelComponent, {
            origin: event.currentTarget as HTMLElement,
            offset: 0,
            placement: 'rightBottom',
            manualClosure: true,
            width: '260px',
            originActiveClass: 'thy-color-picker-active',
            initialState: {
                color: this.colour,
                pickerColorChange: (value: string) => {
                    this.newColor = value;
                }
            }
        });

        popoverRef.afterClosed().subscribe(() => {
            if (this.newColor) {
                this.colorChange(this.newColor);
                this.recentColors.unshift(this.newColor);
                this.recentColors = this.recentColors.slice(0, 9);
                localStorage.setItem('recentColors', JSON.stringify(this.recentColors));
            }
            this.thyPopover.closeAll();
        });
    }

    getIconColor(item: string) {
        const rgba = new Color(item).rgba;
        var yiq = rgba.red * 0.2126 + rgba.green * 0.7152 + rgba.blue * 0.0722;
        return yiq > 128 ? 'black' : 'white';
    }
}
