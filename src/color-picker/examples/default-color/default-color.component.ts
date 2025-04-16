import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyColorPickerDirective } from 'ngx-tethys/color-picker';

@Component({
    selector: 'thy-default-color-example',
    templateUrl: './default-color.component.html',
    styles: [
        `
            .box {
                width: 30px;
                height: 30px;
            }
        `
    ],
    imports: [ThyColorPickerDirective, NgStyle, FormsModule]
})
export class ThyDefaultColorExampleComponent {
    color = '#6698FF';

    change(color: string) {
        console.log(color);
    }
}
