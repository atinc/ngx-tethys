import { Component, OnInit } from '@angular/core';
import { DEFAULT_COLORS } from 'ngx-tethys/color-picker';

@Component({
    selector: 'thy-preset-colors-example',
    templateUrl: './preset-colors.component.html',
    styles: [
        `
            .box {
                width: 30px;
                height: 30px;
            }
        `
    ],
    standalone: false
})
export class ThyPresetColorsExampleComponent implements OnInit {
    color = '#6698FF';

    presetColors: string[] = [];

    ngOnInit() {
        this.presetColors = DEFAULT_COLORS.slice(10, DEFAULT_COLORS.length - 10);
        console.log(this.presetColors, 'preset colors');
    }

    change(color: string) {
        console.log(color);
    }
}
