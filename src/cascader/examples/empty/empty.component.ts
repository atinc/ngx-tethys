import { Component } from '@angular/core';
import { ThyCascader } from 'ngx-tethys/cascader';

@Component({
    selector: 'thy-cascader-empty-example',
    template: ` <thy-cascader [thyOptions]="[]" thyEmptyStateText="Hello World" style="width:200px"> </thy-cascader> `,
    imports: [ThyCascader]
})
export class ThyCascaderEmptyExampleComponent {
    public values: any[] = [];

    constructor() {}
}
