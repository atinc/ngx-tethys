
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'demo-form-section',
    templateUrl: './form-section.component.html',
    styleUrls: [
        './form-section.scss'
    ],
    encapsulation: ViewEncapsulation.None
})
export class DemoFormSectionComponent {

    model: any = {
        select: 1
    };

    options = [
        {
            _id: 1,
            value: '选项1'
        },
        {
            _id: 2,
            value: '选项2'
        }
    ];

    constructor() {
    }

    save(form: any) {
        debugger;
    }
}
