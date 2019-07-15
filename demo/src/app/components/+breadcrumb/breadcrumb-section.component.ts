import { Component, OnInit } from '@angular/core';
import { apiBreadcrumbParameters } from './api-parameters';

@Component({
    selector: 'demo-breadcrumb-section',
    templateUrl: './breadcrumb-section.component.html',
    styleUrls: ['./breadcrumb-section.component.scss']
})
export class DemoBreadcrumbSectionComponent implements OnInit {
    exampleCode = `
<thy-breadcrumb thyIcon="folder-fill">
    <thy-breadcrumb-item><span>首页</span></thy-breadcrumb-item>
    <thy-breadcrumb-item>
        <a href="javascript:;">产品研发部</a>
    </thy-breadcrumb-item>
    <thy-breadcrumb-item>
        <a href="javascript:;">架构</a>
    </thy-breadcrumb-item>
    <thy-breadcrumb-item>
        <a href="javascript:;">基础 <thy-icon thyIconName="angle-down"></thy-icon></a>
    </thy-breadcrumb-item>
</thy-breadcrumb>
    `;

    exampleCode2 = `
<thy-breadcrumb thyIcon="folder-fill" thySeparator="slash">
    ...
</thy-breadcrumb>
    `;

    exampleCode3 = `
<thy-breadcrumb thySeparator="backslash">
    ...
</thy-breadcrumb>
    `;
    apiBreadcrumbParameters = apiBreadcrumbParameters;
    constructor() {}

    ngOnInit() {}
}
