import { Component, OnInit } from '@angular/core';
import { apiBreadcrumbParameters } from './api-parameters';

@Component({
    selector: 'demo-breadcrumb-section',
    templateUrl: './breadcrumb-section.component.html',
    styleUrls: ['./breadcrumb-section.component.scss']
})
export class DemoBreadcrumbSectionComponent implements OnInit {
    exampleCode = `
<thy-breadcrumb thyIcon="wtf-folder">
    <thy-breadcrumb-item><span>首页</span></thy-breadcrumb-item>
    <thy-breadcrumb-item>
        <a href="javascript:;">产品研发部</a>
    </thy-breadcrumb-item>
    <thy-breadcrumb-item>
        <a href="javascript:;">架构</a>
    </thy-breadcrumb-item>
    <thy-breadcrumb-item>
        <a href="javascript:;">基础 <i class="wtf wtf-angle-down"></i></a>
    </thy-breadcrumb-item>
</thy-breadcrumb>
    `;

    exampleCode2 = `
<thy-breadcrumb thyIcon="wtf-folder" thySeparator="slash">
    ...
</thy-breadcrumb>
    `;

    exampleCode3 = `
<thy-breadcrumb thyIcon="wtf-folder" thySeparator="backslash">
    ...
</thy-breadcrumb>
    `;
    apiBreadcrumbParameters = apiBreadcrumbParameters;
    constructor() {}

    ngOnInit() {}
}
