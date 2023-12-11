import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit, ViewContainerRef } from '@angular/core';
import { InputBoolean } from 'ngx-tethys/core';
import { ThyPopover, ThyPopoverRef } from 'ngx-tethys/popover';
import { ThyColorPickerCustomPanelComponent } from './color-picker-custom-panel.component';
import { ThyColor } from './helpers/color.class';
import { ThyIconComponent } from 'ngx-tethys/icon';
import { NgIf, NgClass, NgTemplateOutlet, NgFor, NgStyle } from '@angular/common';

/**
 * @internal
 */
@Component({
    selector: 'thy-color-picker-panel',
    templateUrl: './color-picker-panel.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.pt-4]': '!transparentColorSelectable'
    },
    standalone: true,
    imports: [NgIf, NgClass, NgTemplateOutlet, NgFor, ThyIconComponent, NgStyle]
})
export class ThyColorPickerPanelComponent implements OnInit {
    @HostBinding('class.thy-color-picker-panel') className = true;

    @Input() color: string;

    @Input() colorChange: (color: string) => {};

    @Input() set defaultColor(value: string) {
        this.customDefaultColor = value;
    }

    get defaultColor() {
        return new ThyColor(this.customDefaultColor).toHexString(true);
    }

    @Input() @InputBoolean() transparentColorSelectable: boolean;

    @Input() defaultColors: string[];

    public customDefaultColor: string;

    recentColors: string[] = [];

    newColor: string;

    customPanelPopoverRef: ThyPopoverRef<ThyColorPickerCustomPanelComponent>;

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
        if (!this.customPanelPopoverRef) {
            this.customPanelPopoverRef = this.thyPopover.open(ThyColorPickerCustomPanelComponent, {
                origin: event.currentTarget as HTMLElement,
                offset: -4,
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
                        this.colorChange(value);
                    }
                }
            });
        }
        this.customPanelPopoverRef?.afterClosed().subscribe(() => {
            if (this.newColor) {
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
