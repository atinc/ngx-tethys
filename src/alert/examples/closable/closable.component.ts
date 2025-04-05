import { Component, OnInit } from '@angular/core';
import { ThyAlert } from 'ngx-tethys/alert';

@Component({
    selector: 'thy-alert-closable-example',
    templateUrl: './closable.component.html',
    imports: [ThyAlert]
})
export class ThyAlertClosableExampleComponent implements OnInit {
    ngOnInit() {}
}
