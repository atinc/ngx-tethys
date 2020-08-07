import { Component, OnInit } from '@angular/core';
import option from '../cascader-address-options';
@Component({
    selector: 'thy-cascader-selectchanged-example',
    templateUrl: './select-changed.component.html'
})
export class ThyCascaderSelectChangedExampleComponent implements OnInit {
    public areaCode: any[] = [];

    public values: any[] = [''];

    constructor() {}

    ngOnInit() {
        this.areaCode = option;
    }

    public onChanges(values: any): void {}
}
