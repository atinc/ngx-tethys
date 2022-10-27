import { Component, OnInit } from '@angular/core';
import { clone, options } from '../cascader-address-options';

@Component({
    selector: 'thy-cascader-size-example',
    templateUrl: './size.component.html'
})
export class ThyCascaderSizeExampleComponent implements OnInit {
    public areaCode: any[] = [];

    public values: any[] = [];

    public sizes = ['sm', 'md', 'default', 'lg'];

    public size: string = 'default';

    constructor() {}

    ngOnInit() {
        this.areaCode = clone(options);
    }
}
