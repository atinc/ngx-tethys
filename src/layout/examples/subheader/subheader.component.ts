import { Component, OnInit } from '@angular/core';
import { ThyBreadcrumb, ThyBreadcrumbItem } from 'ngx-tethys/breadcrumb';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyLayout, ThyContent, ThyHeader } from 'ngx-tethys/layout';
import { ThyNav, ThyNavItemDirective } from 'ngx-tethys/nav';

@Component({
    selector: 'thy-layout-subheader-example',
    templateUrl: './subheader.component.html',
    styleUrls: ['./subheader.component.scss'],
    imports: [ThyLayout, ThyContent, ThyNav, ThyNavItemDirective, ThyHeader, ThyBreadcrumb, ThyBreadcrumbItem, ThyIcon]
})
export class ThyLayoutSubheaderExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
