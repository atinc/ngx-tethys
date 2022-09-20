import { Component } from '@angular/core';

@Component({
    selector: 'thy-basic-example',
    templateUrl: './basic.component.html',
    styles: [
        `
            .box {
                width: 30px;
                height: 30px;
            }
        `
    ]
})
export class ThyBasicExampleComponent {
    color = '#ddd';

    change(color: string) {
        console.log(color);
    }
}
