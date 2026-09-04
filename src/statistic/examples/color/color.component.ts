import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyStatistic } from 'ngx-tethys/statistic';

@Component({
    selector: 'thy-color-example',
    templateUrl: './color.component.html',
    styleUrls: ['./color.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyStatistic, CommonModule]
})
export class ThyStatisticColorExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
