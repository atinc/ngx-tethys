import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyColorPickerDirective } from 'ngx-tethys/color-picker';

@Component({
    selector: 'thy-color-picker-disabled-example',
    templateUrl: './disabled.component.html',
    styles: [
        `
            .box {
                width: 30px;
                height: 30px;
                margin-top: 12px;
            }
        `
    ],
    imports: [ThyColorPickerDirective, NgStyle, FormsModule]
})
export class ThyColorPickerDisableExampleComponent {
    color = '#6698FF';

    disabled = true;

    change(color: string) {
        console.log(color);
    }
}
