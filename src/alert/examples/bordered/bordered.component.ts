import { Component, OnInit } from '@angular/core';
import { ThyAlert } from '../../alert.component';

@Component({
    selector: 'thy-alert-bordered-example',
    templateUrl: './bordered.component.html',
    imports: [ThyAlert]
})
export class ThyAlertBorderedExampleComponent implements OnInit {
    ngOnInit() {}
}
