import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyAlert } from 'ngx-tethys/alert';

@Component({
    selector: 'thy-alert-bordered-example',
    templateUrl: './bordered.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyAlert]
})
export class ThyAlertBorderedExampleComponent implements OnInit {
    ngOnInit() {}
}
