import { Component, OnInit } from '@angular/core';
import { ThyStatistic } from 'ngx-tethys/statistic';

@Component({
    selector: 'thy-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss'],
    imports: [ThyStatistic]
})
export class ThyStatisticBasicExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
