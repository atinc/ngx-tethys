import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyAlert } from 'ngx-tethys/alert';

@Component({
    selector: 'thy-alert-message-template-example',
    templateUrl: './message-template.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyAlert]
})
export class ThyAlertMessageTemplateExampleComponent implements OnInit {
    ngOnInit() {}
}
