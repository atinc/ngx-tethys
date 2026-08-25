import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyAlert, ThyAlertActionItemDirective } from 'ngx-tethys/alert';

@Component({
    selector: 'thy-alert-operation-example',
    templateUrl: './operation.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyAlert, ThyAlertActionItemDirective]
})
export class ThyAlertOperationExampleComponent implements OnInit {
    ngOnInit() {}
}
