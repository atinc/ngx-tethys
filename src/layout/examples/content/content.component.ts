import { Component, OnInit } from '@angular/core';
import { ThyContent, ThyContentMain, ThyContentSection, ThyHeader, ThyLayout } from 'ngx-tethys/layout';
import { ThyNav } from 'ngx-tethys/nav';

@Component({
    selector: 'thy-layout-content-example',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss'],
    imports: [ThyLayout, ThyHeader, ThyContent, ThyContentMain, ThyContentSection, ThyNav]
})
export class ThyLayoutContentExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
