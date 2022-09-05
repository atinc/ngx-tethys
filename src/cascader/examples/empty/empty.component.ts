import { Component } from '@angular/core';

@Component({
    selector: 'thy-cascader-empty-example',
    template: `
        <thy-cascader [thyOptions]="[]" thyEmptyStateText="Hello World" style="width:200px"> </thy-cascader>
    `
})
export class ThyCascaderEmptyExampleComponent {
    public values: any[] = [];

    constructor() {}
}
