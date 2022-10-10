import { Component, HostBinding, Input, OnInit, ViewContainerRef } from '@angular/core';
import { ThyPopover, ThyPopoverRef } from 'ngx-tethys/popover';
import ThyColor from './helpers/color.class';
import { DEFAULT_COLORS } from './constant';
import { ThyPickerPanelComponent } from './custom-color-picker-panel.component';

/**
 * @internal
 */
@Component({
    selector: 'thy-color-picker-panel',
    templateUrl: './color-picker-panel.component.html'
})
export class ThyColorPickerPanelComponent implements OnInit {
    @HostBinding('class.thy-color-picker-panel') className = true;

    @Input() color: string;

    @Input() colorChange: (color: string) => {};

    defaultColors = DEFAULT_COLORS;

    recentColors: string[] = [];

    newColor: string;

    constructor(
        private thyPopover: ThyPopover,
        private viewContainerRef: ViewContainerRef,
        private thyPopoverRef: ThyPopoverRef<ThyColorPickerPanelComponent>
    ) {}

    ngOnInit(): void {
        const colors = localStorage.getItem('recentColors');
        if (colors) {
            this.recentColors = JSON.parse(colors);
        }
    }

    selectColor(color: string) {
        this.color = color;
        this.colorChange(this.color);
        this.thyPopoverRef.close();
    }

    showMoreColor(event: Event) {
        const popoverRef = this.thyPopover.open(ThyPickerPanelComponent, {
            origin: event.currentTarget as HTMLElement,
            offset: 0,
            placement: 'rightBottom',
            manualClosure: true,
            width: '260px',
            hasBackdrop: false,
            viewContainerRef: this.viewContainerRef,
            originActiveClass: 'thy-color-picker-active',
            initialState: {
                color: this.color,
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
            this.thyPopoverRef.close();
        });
    }

    getIconColor(item: string) {
        const rgba = new ThyColor(item).rgba;
        const hsp = 0.299 * rgba.red + 0.587 * rgba.green + 0.114 * rgba.blue;
        return hsp > 192 ? 'black' : 'white';
    }
}
