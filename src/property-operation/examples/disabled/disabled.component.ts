import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-property-operation-disabled-example',
    templateUrl: './disabled.component.html',
    standalone: false
})
export class ThyPropertyOperationDisabledExampleComponent implements OnInit {
    disabled = true;

    constructor() {}

    ngOnInit() {}
}
