import { Component, OnInit } from '@angular/core';
import option from '../cascader-address-options';

@Component({
    selector: 'thy-cascader-disabled-example',
    templateUrl: './disabled.component.html'
})
export class ThyCascaderDisabledExampleComponent implements OnInit {
    public areaCode: any[] = [];

    public values: any[] = [];

    public curVal = ['11', '1101', '110102'];

    constructor() {}

    ngOnInit() {
        this.areaCode = [...option];
    }
}
