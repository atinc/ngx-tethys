import { Component, OnInit } from '@angular/core';
import { ThyStatistic } from 'ngx-tethys/statistic';
@Component({
    selector: 'thy-color-example',
    templateUrl: './color.component.html',
    styleUrls: ['./color.component.scss'],
    imports: [ThyStatistic]
})
export class ThyStatisticColorExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
