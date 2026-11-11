import { Component, OnInit } from '@angular/core';
import { ThyAlert } from 'ngx-tethys/alert';

@Component({
    selector: 'thy-alert-icon-example',
    templateUrl: './icon.component.html',
    imports: [ThyAlert]
})
export class ThyAlertIconExampleComponent implements OnInit {
    ngOnInit() {}
}
