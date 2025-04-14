import { Component, OnInit } from '@angular/core';
import { ThyLoading } from 'ngx-tethys/loading';

@Component({
    selector: 'thy-loading-tip-example',
    templateUrl: './tip.component.html',
    imports: [ThyLoading]
})
export class ThyLoadingTipExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
