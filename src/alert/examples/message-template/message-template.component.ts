import { Component, OnInit } from '@angular/core';
import { ThyAlert } from 'ngx-tethys/alert';

@Component({
    selector: 'thy-alert-message-template-example',
    templateUrl: './message-template.component.html',
    imports: [ThyAlert]
})
export class ThyAlertMessageTemplateExampleComponent implements OnInit {
    ngOnInit() {}
}
