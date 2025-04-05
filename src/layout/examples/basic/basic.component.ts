import { Component, OnInit } from '@angular/core';
import { ThyLayout } from 'ngx-tethys/layout';

@Component({
    selector: 'thy-layout-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss'],
    imports: [ThyLayout]
})
export class ThyLayoutBasicExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
