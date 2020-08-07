import { Component, OnInit } from '@angular/core';
import option from '../cascader-address-options';
@Component({
    selector: 'thy-cascader-move-unfold-example',
    templateUrl: './move-unfold.component.html'
})
export class ThyCascaderMoveUnfoldExampleComponent implements OnInit {
    public areaCode: any[] = [];

    public values: any[] = [''];

    constructor() {}

    ngOnInit() {
        this.areaCode = option;
    }

    public onChanges(values: any): void {}
}
