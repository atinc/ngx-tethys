import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-cascader-empty-example',
    template: `
        <thy-cascader [thyOptions]="[]" [(ngModel)]="values" thyEmptyStateText="Hello World"> </thy-cascader>
    `
})
export class ThyCascaderEmptyExampleComponent {
    public values: any[] = [];

    constructor() {}
}
