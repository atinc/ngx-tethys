import { Component, OnInit } from '@angular/core';
import { ThyAlert } from '../../alert.component';

@Component({
    selector: 'thy-alert-operation-example',
    templateUrl: './operation.component.html',
    imports: [ThyAlert]
})
export class ThyAlertOperationExampleComponent implements OnInit {
    ngOnInit() {}
}
