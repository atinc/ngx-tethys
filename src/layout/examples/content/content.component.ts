import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
    ThyContent,
    ThyContentDirective,
    ThyContentMain,
    ThyContentMainDirective,
    ThyContentSection,
    ThyContentSectionDirective,
    ThyHeader,
    ThyHeaderDirective,
    ThyLayout,
    ThyLayoutDirective
} from 'ngx-tethys/layout';
import { ThyNav, ThyNavItemDirective } from 'ngx-tethys/nav';

@Component({
    selector: 'thy-layout-content-example',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        ThyLayout,
        ThyLayoutDirective,
        ThyHeader,
        ThyHeaderDirective,
        ThyContent,
        ThyContentDirective,
        ThyContentMain,
        ThyContentMainDirective,
        ThyContentSection,
        ThyContentSectionDirective,
        ThyNav,
        ThyNavItemDirective
    ]
})
export class ThyLayoutContentExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
