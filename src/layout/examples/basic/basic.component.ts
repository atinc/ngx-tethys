import { Component, OnInit } from '@angular/core';
import { ThyLayout, ThyHeader, ThyContent, ThyContentSection, ThyContentMain, ThySidebar } from 'ngx-tethys/layout';


@Component({
    selector: 'thy-layout-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss'],
    imports: [ThyLayout, ThyHeader, ThyContent, ThyContentSection, ThyContentMain, ThySidebar]
})
export class ThyLayoutBasicExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
