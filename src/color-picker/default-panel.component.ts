import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { ThyPopover } from 'ngx-tethys/popover';
import Color from './helpers/color.class';
import { DEFAULT_COLORS } from './helpers/constant';
import { ThyPickerPanelComponent } from './picker-panel.component';

/**
 * @internal
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
                const index = this.recentColors.findIndex(item => item === this.newColor);
                if (index !== -1) {
                    this.recentColors.splice(index, 1);
                }
                this.recentColors.unshift(this.newColor);
                this.recentColors = this.recentColors.slice(0, 10);
                localStorage.setItem('recentColors', JSON.stringify(this.recentColors));
            }
            this.thyPopover.closeAll();
        });
    }

    getIconColor(item: string) {
        const rgba = new Color(item).rgba;
        const hsp = 0.299 * rgba.red + 0.587 * rgba.green + 0.114 * rgba.blue;
        return hsp > 192 ? 'black' : 'white';
    }
}
