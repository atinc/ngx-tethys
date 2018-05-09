import { Component, ElementRef, TemplateRef, OnInit } from '@angular/core';
import { ComponentExample } from '../../docs/model/component-example';

@Component({
    selector: 'demo-date-picker-section',
    templateUrl: './date-picker-section.component.html'
})
export class DemoDataPickerSectionComponent implements OnInit {

    value1;

    value2;

    constructor() { }

    ngOnInit() {
        this.value1 = {
            date: new Date(),
            with_time: false
        };

        this.value2 = {
            date: new Date(),
            with_time: true
        };
    }

    onChange(event) {
        this.value1 = event;
    }

    onChange2(event) {
        this.value2 = event;
    }

}
