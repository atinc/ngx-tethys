import { Component, OnInit } from '@angular/core';
import option from '../cascader-address-options';

@Component({
    selector: 'thy-cascader-disable-example',
    templateUrl: './disable.component.html'
})
export class ThyCascaderDisableExampleComponent implements OnInit {
    public areaCode: any[] = [];

    public values: any[] = [];

    public curVal = ['11', '1101', '110102'];

    constructor() {}

    ngOnInit() {
        this.areaCode = [...option];
    }
}
