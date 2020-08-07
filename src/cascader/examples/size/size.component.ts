import { Component, OnInit } from '@angular/core';
import option from '../cascader-address-options';
@Component({
    selector: 'thy-cascader-size-example',
    templateUrl: './size.component.html'
})
export class ThyCascaderSizeExampleComponent implements OnInit {
    public areaCode: any[] = [];

    public values: any[] = [''];

    constructor() {}

    ngOnInit() {
        this.areaCode = option;
    }

    public onChanges(values: any): void {}
}
