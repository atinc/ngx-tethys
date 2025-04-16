import { Component, OnInit } from '@angular/core';
import { ThyLoading } from 'ngx-tethys/loading';

@Component({
    selector: 'thy-loading-mask-example',
    templateUrl: './mask.component.html',
    imports: [ThyLoading]
})
export class ThyLoadingMaskExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
