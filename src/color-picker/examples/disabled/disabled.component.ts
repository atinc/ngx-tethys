import { Component } from '@angular/core';

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
    ]
})
export class ThyColorPickerDisableExampleComponent {
    color = '#6698FF';

    disabled = true;

    change(color: string) {
        console.log(color);
    }
}
