import { Component, OnInit } from '@angular/core';
import option from '../cascader-address-options';

@Component({
    selector: 'thy-cascader-disable-example',
    templateUrl: './disable.component.html'
})
export class ThyCascaderDisableExampleComponent implements OnInit {
    public areaCode: any[] = [];

    public values: any[] = [''];

    constructor() {}

    ngOnInit() {
        this.areaCode = option;
    }

    public onChanges(values: any): void {}
}
