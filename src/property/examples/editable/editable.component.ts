import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-property-editable-example',
    templateUrl: './editable.component.html',
    styleUrls: ['./editable.component.scss'],
    host: {}
})
export class ThyPropertyEditableExampleComponent implements OnInit {
    user = {
        name: '张萌',
        phone: '18500010001',
        age: 24,
        address: '北京市朝阳区十八里店小区26号10001'
    };

    constructor() {}

    ngOnInit() {}
}
