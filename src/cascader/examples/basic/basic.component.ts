import { Component, OnInit } from '@angular/core';
import option from '../cascader-address-options';

@Component({
    selector: 'thy-cascader-basic-example',
    templateUrl: './basic.component.html'
})
export class ThyCascaderBasicExampleComponent implements OnInit {
    public areaCode: any[] = [];

    public values: any[] = [''];

    constructor() {}

    ngOnInit() {
        this.areaCode = option;
    }

    public onChanges(values: any): void {}
}
