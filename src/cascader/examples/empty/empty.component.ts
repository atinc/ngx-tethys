import { Component } from '@angular/core';

@Component({
    selector: 'thy-cascader-empty-example',
    template: ` <thy-cascader [thyOptions]="[]" thyEmptyStateText="Hello World" style="width:200px"> </thy-cascader> `,
    standalone: false
})
export class ThyCascaderEmptyExampleComponent {
    public values: any[] = [];

    constructor() {}
}
