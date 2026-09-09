import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyAlert } from 'ngx-tethys/alert';

@Component({
    selector: 'thy-alert-closable-example',
    templateUrl: './closable.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyAlert]
})
export class ThyAlertClosableExampleComponent implements OnInit {
    ngOnInit() {}
}
