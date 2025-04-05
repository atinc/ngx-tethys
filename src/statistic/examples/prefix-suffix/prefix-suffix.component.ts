import { Component, OnInit } from '@angular/core';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyStatistic } from 'ngx-tethys/statistic';
@Component({
    selector: 'thy-prefix-suffix-example',
    templateUrl: './prefix-suffix.component.html',
    styleUrls: ['./prefix-suffix.component.scss'],
    imports: [ThyStatistic, ThyIcon]
})
export class ThyStatisticPrefixAndSuffixExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
