import { Component } from '@angular/core';

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
    standalone: false
})
export class ThyDisableTransparentColorExampleComponent {
    color = '#6698FF';

    change(color: string) {
        console.log(color);
    }
}
