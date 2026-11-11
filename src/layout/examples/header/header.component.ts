import { Component, OnInit } from '@angular/core';
import { ThyAction } from 'ngx-tethys/action';
import { ThyDivider } from 'ngx-tethys/divider';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyLayout, ThyHeader, ThyContent, ThyHeaderDirective, ThyLayoutDirective, ThyContentDirective } from 'ngx-tethys/layout';
import { ThyNav, ThyNavItemDirective } from 'ngx-tethys/nav';
import { ThySpace, ThySpaceItemDirective } from 'ngx-tethys/space';
import { ThyTooltipDirective } from 'ngx-tethys/tooltip';

@Component({
    selector: 'thy-layout-header-example',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    imports: [
        ThyLayout,
        ThyLayoutDirective,
        ThyHeader,
        ThyHeaderDirective,
        ThyTooltipDirective,
        ThyContent,
        ThyContentDirective,
        ThySpace,
        ThySpaceItemDirective,
        ThyDivider,
        ThyIcon,
        ThyNav,
        ThyNavItemDirective,
        ThyAction
    ]
})
export class ThyLayoutHeaderExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
