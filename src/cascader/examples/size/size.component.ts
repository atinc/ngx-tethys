import { Component, OnInit } from '@angular/core';
import { clone, options } from '../cascader-address-options';

@Component({
    selector: 'thy-cascader-size-example',
    templateUrl: './size.component.html'
})
export class ThyCascaderSizeExampleComponent implements OnInit {
    public areaCode: any[] = [];

    public values: any[] = [];

    public sizes = [
        {
            name: 'xs',
            height: 24
        },
        {
            name: 'sm',
            height: 28
        },
        {
            name: 'md',
            height: 32
        },
        {
            name: 'default',
            height: 36
        },
        {
            name: 'lg',
            height: 44
        }
    ];

    public currentSize = this.sizes[3];

    constructor() {}

    ngOnInit() {
        this.areaCode = clone(options);
    }
}
