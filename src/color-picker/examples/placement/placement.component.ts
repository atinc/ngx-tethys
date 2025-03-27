import { Component } from '@angular/core';

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
    standalone: false
})
export class ThyPlacementExampleComponent {
    color = '#6698FF';

    change(color: string) {
        console.log(color);
    }
}
