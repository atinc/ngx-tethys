import { Component, OnInit } from '@angular/core';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyStatistic } from 'ngx-tethys/statistic';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'thy-prefix-suffix-example',
    templateUrl: './prefix-suffix.component.html',
    styleUrls: ['./prefix-suffix.component.scss'],
    imports: [ThyStatistic, ThyIcon, CommonModule]
})
export class ThyStatisticPrefixAndSuffixExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
