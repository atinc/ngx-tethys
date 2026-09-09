import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyRate } from 'ngx-tethys/rate';

@Component({
    selector: 'thy-rate-clear-example',
    templateUrl: './clear.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyRate, FormsModule]
})
export class ThyRateClearExampleComponent implements OnInit {
    value = 3;

    constructor() {}

    ngOnInit() {}

    change(event: number) {}
}
