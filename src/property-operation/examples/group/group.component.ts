import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyButtonIcon } from 'ngx-tethys/button';
import { ThyPropertyOperation, ThyPropertyOperationGroup } from 'ngx-tethys/property-operation';

@Component({
    selector: 'thy-property-operation-group-example',
    templateUrl: './group.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyPropertyOperation, ThyPropertyOperationGroup, ThyButtonIcon]
})
export class ThyPropertyOperationGroupExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
