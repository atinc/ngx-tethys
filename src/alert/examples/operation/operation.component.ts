import { Component, OnInit } from '@angular/core';
import { ThyAlert } from 'ngx-tethys/alert';
import { ThyAlertActionItemDirective } from 'ngx-tethys/alert';

@Component({
    selector: 'thy-alert-operation-example',
    templateUrl: './operation.component.html',
    imports: [ThyAlert, ThyAlertActionItemDirective]
})
export class ThyAlertOperationExampleComponent implements OnInit {
    ngOnInit() {}
}
