import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyStatistic } from 'ngx-tethys/statistic';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'thy-custom-example',
    templateUrl: './custom.component.html',
    styleUrls: ['./custom.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyStatistic, CommonModule]
})
export class ThyStatisticCustomExampleComponent implements OnInit {
    constructor() {}

    deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

    ngOnInit() {}
}
