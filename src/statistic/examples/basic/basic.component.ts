import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyStatistic } from 'ngx-tethys/statistic';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'thy-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyStatistic, CommonModule]
})
export class ThyStatisticBasicExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
