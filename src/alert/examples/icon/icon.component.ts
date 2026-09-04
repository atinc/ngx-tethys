import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyAlert } from 'ngx-tethys/alert';

@Component({
    selector: 'thy-alert-icon-example',
    templateUrl: './icon.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyAlert]
})
export class ThyAlertIconExampleComponent implements OnInit {
    ngOnInit() {}
}
