import { Component, OnInit } from '@angular/core';
import option from '../cascader-address-options';
@Component({
    selector: 'thy-cascader-move-unfold-trigger-example',
    templateUrl: './move-unfold-trigger.component.html'
})
export class ThyCascaderMoveUnfoldTriggerExampleComponent implements OnInit {
    public areaCode: any[] = [];

    public values: any[] = [''];

    constructor() {}

    ngOnInit() {
        this.areaCode = option;
    }

    public onChanges(values: any): void {}
}
