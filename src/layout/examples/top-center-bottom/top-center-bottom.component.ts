import { Component, OnInit } from '@angular/core';
import { ThyLayout, ThyContent, ThyHeader, ThyContentMain } from 'ngx-tethys/layout';
import { ThyBreadcrumb, ThyBreadcrumbItem } from 'ngx-tethys/breadcrumb';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'thy-layout-top-center-bottom',
    templateUrl: './top-center-bottom.component.html',
    styleUrls: ['./top-center-bottom.component.scss'],
    imports: [ThyLayout, ThyContent, ThyHeader, ThyContentMain, ThyBreadcrumb, ThyBreadcrumbItem, ThyIcon]
})
export class ThyLayoutTopCenterBottomComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
