import { Component, OnInit } from '@angular/core';
import option from '../cascader-address-options';

@Component({
    selector: 'thy-cascader-multiple-example',
    templateUrl: './multiple.component.html'
})
export class ThyCascaderMultipleExampleComponent implements OnInit {
    public areaCode: any[] = [];

    public values: any[] = [];

    constructor() {}

    ngOnInit() {
        this.areaCode = option;
    }

    public onChanges(values: any): void {}
}
