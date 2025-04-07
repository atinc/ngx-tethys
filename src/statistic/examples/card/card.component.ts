import { Component, OnInit } from '@angular/core';
import { ThyStatistic } from 'ngx-tethys/statistic';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'thy-card-example',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    imports: [ThyStatistic, CommonModule]
})
export class ThyStatisticCardExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
