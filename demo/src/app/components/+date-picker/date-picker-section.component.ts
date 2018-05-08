import { Component, ElementRef, TemplateRef, OnInit } from '@angular/core';
import { ComponentExample } from '../../docs/model/component-example';

@Component({
    selector: 'demo-date-picker-section',
    templateUrl: './date-picker-section.component.html'
})
export class DemoDataPickerSectionComponent implements OnInit {

    value1;

    constructor() { }

    ngOnInit() {
        this.value1 = new Date();
    }

    onChange(event) {
        this.value1 = event;
        console.log(event);
    }

}
