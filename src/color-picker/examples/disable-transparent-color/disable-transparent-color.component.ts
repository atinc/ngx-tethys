import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyColorPickerDirective } from 'ngx-tethys/color-picker';

@Component({
    selector: 'thy-disable-transparent-color-example',
    templateUrl: './disable-transparent-color.component.html',
    styles: [
        `
            .box {
                width: 30px;
                height: 30px;
                margin-top: 12px;
                cursor: pointer;
            }
        `
    ],
    imports: [ThyColorPickerDirective, NgStyle, FormsModule]
})
export class ThyDisableTransparentColorExampleComponent {
    color = '#6698FF';

    change(color: string) {
        console.log(color);
    }
}
