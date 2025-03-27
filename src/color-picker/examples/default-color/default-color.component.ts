import { Component } from '@angular/core';

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
    standalone: false
})
export class ThyDefaultColorExampleComponent {
    color = '#6698FF';

    change(color: string) {
        console.log(color);
    }
}
