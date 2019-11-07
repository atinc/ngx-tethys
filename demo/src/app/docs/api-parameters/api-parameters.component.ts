import { Component, Input, OnInit } from '@angular/core';
import { coerceArray } from '@angular/cdk/coercion';

class ApiParameter {
    property: string;
    description: string;
    type: string;
    default: string;
}

@Component({
    selector: 'api-parameters',
    templateUrl: './api-parameters.component.html'
})
export class ApiParametersComponent implements OnInit {
    @Input() title = '参数列表';
    @Input() types: 'component' | 'directive' | Array<'component' | 'directive'>;
    @Input() parameters: ApiParameter[];

    showComponentLabel: boolean;

    showDirectiveLabel: boolean;

    constructor() {}

    ngOnInit() {
        const types = coerceArray(this.types);
        this.showComponentLabel = types.includes('component');
        this.showDirectiveLabel = types.includes('directive');
    }
}
