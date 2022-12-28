import { Component, OnInit } from '@angular/core';
import { DEFAULT_COLORS } from 'ngx-tethys/color-picker';

@Component({
    selector: 'thy-disabled-colors-example',
    templateUrl: './disabled-colors.component.html',
    styles: [
        `
            .box {
                width: 30px;
                height: 30px;
            }
        `
    ]
})
export class ThyDisabledColorsExampleComponent implements OnInit {
    color = '#6698FF';

    disabledColors: string[] = [];

    ngOnInit() {
        this.disabledColors = DEFAULT_COLORS.slice(0, 10).concat(DEFAULT_COLORS.slice(DEFAULT_COLORS.length - 10));
    }

    change(color: string) {
        console.log(color);
    }
}
