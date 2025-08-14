import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThySpace, ThySpaceItemDirective } from 'ngx-tethys/space';
import { ThyColorPickerDirective } from 'ngx-tethys/color-picker';

@Component({
    selector: 'thy-placement-example',
    templateUrl: './placement.component.html',
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
    imports: [ThySpace, ThySpaceItemDirective, ThyColorPickerDirective, NgStyle, FormsModule]
})
export class ThyPlacementExampleComponent {
    color = '#6698FF';

    change(color: string) {
        console.log(color);
    }
}
