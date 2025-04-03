import { Component, OnInit } from '@angular/core';
import { ThyAlert } from '../../alert.component';

@Component({
    selector: 'thy-alert-basic-example',
    templateUrl: './basic.component.html',
    imports: [ThyAlert]
})
export class ThyAlertBasicExampleComponent implements OnInit {
    ngOnInit() {}
}
