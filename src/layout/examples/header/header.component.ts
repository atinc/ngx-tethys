import { Component, OnInit } from '@angular/core';
import { ThyDivider } from 'ngx-tethys/divider';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyLayout, ThyHeader, ThyContent } from 'ngx-tethys/layout';
import { ThyNav, ThyNavItemDirective } from 'ngx-tethys/nav';
import { ThySpace } from 'ngx-tethys/space';

@Component({
    selector: 'thy-layout-header-example',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    imports: [ThyLayout, ThyHeader, ThyContent, ThySpace, ThyDivider, ThyIcon, ThyNav, ThyNavItemDirective]
})
export class ThyLayoutHeaderExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
