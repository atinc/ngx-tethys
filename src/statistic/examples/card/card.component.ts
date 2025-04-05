import { Component, OnInit } from '@angular/core';
import { ThyStatistic } from 'ngx-tethys/statistic';

@Component({
    selector: 'thy-card-example',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    imports: [ThyStatistic]
})
export class ThyStatisticCardExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
