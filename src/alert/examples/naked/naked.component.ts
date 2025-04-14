import { Component, OnInit } from '@angular/core';
import { ThyAlert } from 'ngx-tethys/alert';

@Component({
    selector: 'thy-alert-naked-example',
    templateUrl: './naked.component.html',
    imports: [ThyAlert]
})
export class ThyAlertNakedExampleComponent implements OnInit {
    ngOnInit() {}
}
