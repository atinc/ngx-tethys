import { Component } from '@angular/core';

@Component({
    selector: 'thy-trigger-example',
    templateUrl: './trigger.component.html',
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
export class ThyTriggerExampleComponent {
    color = '#6698FF';

    change(color: string) {
        console.log(color);
    }
}
