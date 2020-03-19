import { Component, OnInit } from '@angular/core';
import { apiBreadcrumbParameters, apiBreadcrumbItemParameters } from './api-parameters';
import { LiveDemoCodeExample } from '../../core/live-demo/live-demo.component';
import { DemoBreadcrumbBasicComponent } from './basic/basic.component';
import { DemoBreadcrumbSlashComponent } from './slash/slash.component';
import { DemoBreadcrumbBackslashComponent } from './backslash/backslash.component';
import { BreadcrumbContentRefComponent } from './content-ref/content-ref.component';

@Component({
    selector: 'demo-breadcrumb-section',
    templateUrl: './breadcrumb-section.component.html',
    styleUrls: ['./breadcrumb-section.component.scss']
})
export class DemoBreadcrumbSectionComponent implements OnInit {
    liveDemos: LiveDemoCodeExample[] = [
        {
            title: '基本使用',
            component: DemoBreadcrumbBasicComponent,
            description: `>面包屑（">" 默认分隔符）`,
            codeExamples: [
                {
                    type: 'html',
                    name: 'basic.component.html',
                    content: require('!!raw-loader!./basic/basic.component.html')
                },
                {
                    type: 'ts',
                    name: 'basic.component.ts',
                    content: require('!!raw-loader!./basic/basic.component.ts')
                }
            ]
        },
        {
            title: 'slash分隔符',
            component: DemoBreadcrumbSlashComponent,
            description: `面包屑（"/"分隔符）`,
            codeExamples: [
                {
                    type: 'html',
                    name: 'slash.component.html',
                    content: require('!!raw-loader!./slash/slash.component.html')
                },
                {
                    type: 'ts',
                    name: 'slash.component.ts',
                    content: require('!!raw-loader!./slash/slash.component.ts')
                }
            ]
        },
        {
            title: 'backslash分隔符',
            component: DemoBreadcrumbBackslashComponent,
            description: `面包屑（"\\"分隔符）`,
            codeExamples: [
                {
                    type: 'html',
                    name: 'backslash.component.html',
                    content: require('!!raw-loader!./backslash/backslash.component.html')
                },
                {
                    type: 'ts',
                    name: 'backslash.component.ts BreadcrumbContentRefComponent',
                    content: require('!!raw-loader!./backslash/backslash.component.ts')
                }
            ]
        },
        {
            title: '多个面包屑时，自动折叠',
            component: BreadcrumbContentRefComponent,
            description: `默认最多展示5条面包屑，超过5条时出现折叠图标，如果在面包屑中没有使用<ng-template #contentRef></ng-template>，点击折叠图标后只展示隐藏掉的面包屑，如果使用了contentRef，点击折叠图标展示所有面包屑。面包屑最多展示11个字`,
            codeExamples: [
                {
                    type: 'html',
                    name: 'content-ref.component.html',
                    content: require('!!raw-loader!./content-ref/content-ref.component.html')
                },
                {
                    type: 'ts',
                    name: 'content-ref.component.ts',
                    content: require('!!raw-loader!./content-ref/content-ref.component.ts')
                }
            ]
        }
    ];

    apiBreadcrumbParameters = apiBreadcrumbParameters;

    apiBreadcrumbItemParameters = apiBreadcrumbItemParameters;

    constructor() {}

    ngOnInit() {}
}
