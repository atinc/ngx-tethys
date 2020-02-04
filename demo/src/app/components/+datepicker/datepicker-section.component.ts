import { Component, ViewEncapsulation } from '@angular/core';
import { LiveDemoCodeExample } from '../../core/live-demo/live-demo.component';
import { DemoDatePickerBasicComponent } from './basic/datepicker-basic.component';
import { DemoDatePickerFormatComponent } from './format/datepicker-format.component';
import { DemoDatePickerSizeComponent } from './size/datepicker-size.component';
import { DemoDatePickerTimeComponent } from './time/datepicker-time.component';
import { DemoDatePickerDisabledDateComponent } from './disabled-date/datepicker-disabled-date.component';
import { DemoDatePickerDisabledComponent } from './disabled/datepicker-disabled.component';
import { DemoDatePickerDirectiveComponent } from './directive/datepicker-directive.component';
import { DemoDatePickerReadonlyComponent } from './readonly/datepicker-readonly.component';
import { apiParameters, apiDatePickerParameters, apiRangePickerParameters } from './api-parameters';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'demo-datepicker-section',
    templateUrl: './datepicker-section.component.html',
    styleUrls: ['./datepicker-section.scss']
})
export class DemoDatePickerNextSectionComponent {
    apiParameters = apiParameters;
    apiDatePickerParameters = apiDatePickerParameters;
    apiRangePickerParameters = apiRangePickerParameters;
    liveDemos: LiveDemoCodeExample[] = [
        {
            title: '基本使用',
            component: DemoDatePickerBasicComponent,
            description: ``,
            codeExamples: [
                {
                    type: 'html',
                    name: 'datepicker-basic.component.html',
                    content: require('!!raw-loader!./basic/datepicker-basic.component.html')
                },
                {
                    type: 'ts',
                    name: 'datepicker-basic.component.ts',
                    content: require('!!raw-loader!./basic/datepicker-basic.component.ts')
                }
            ]
        },
        {
            title: '日期格式化',
            component: DemoDatePickerFormatComponent,
            description: ``,
            codeExamples: [
                {
                    type: 'html',
                    name: 'datepicker-format.component.html',
                    content: require('!!raw-loader!./format/datepicker-format.component.html')
                },
                {
                    type: 'ts',
                    name: 'datepicker-format.component.ts',
                    content: require('!!raw-loader!./format/datepicker-format.component.ts')
                }
            ]
        },
        {
            title: '五种大小',
            component: DemoDatePickerSizeComponent,
            description: ``,
            codeExamples: [
                {
                    type: 'html',
                    name: 'datepicker-size.component.html',
                    content: require('!!raw-loader!./size/datepicker-size.component.html')
                },
                {
                    type: 'ts',
                    name: 'datepicker-size.component.ts',
                    content: require('!!raw-loader!./size/datepicker-size.component.ts')
                }
            ]
        },
        {
            title: '日期时间选择',
            component: DemoDatePickerTimeComponent,
            description: ``,
            codeExamples: [
                {
                    type: 'html',
                    name: 'datepicker-time.component.html',
                    content: require('!!raw-loader!./time/datepicker-time.component.html')
                },
                {
                    type: 'ts',
                    name: 'datepicker-time.component.ts',
                    content: require('!!raw-loader!./time/datepicker-time.component.ts')
                }
            ]
        },
        {
            title: '不可选择日期',
            component: DemoDatePickerDisabledDateComponent,
            description: ``,
            codeExamples: [
                {
                    type: 'html',
                    name: 'datepicker-disabled-date.component.html',
                    content: require('!!raw-loader!./disabled-date/datepicker-disabled-date.component.html')
                },
                {
                    type: 'ts',
                    name: 'datepicker-disabled-date.component.ts',
                    content: require('!!raw-loader!./disabled-date/datepicker-disabled-date.component.ts')
                }
            ]
        },
        {
            title: '禁用',
            component: DemoDatePickerDisabledComponent,
            description: ``,
            codeExamples: [
                {
                    type: 'html',
                    name: 'datepicker-disabled.component.html',
                    content: require('!!raw-loader!./disabled/datepicker-disabled.component.html')
                },
                {
                    type: 'ts',
                    name: 'datepicker-disabled.component.ts',
                    content: require('!!raw-loader!./disabled/datepicker-disabled.component.ts')
                }
            ]
        },
        {
            title: '只读',
            component: DemoDatePickerReadonlyComponent,
            description: ``,
            codeExamples: [
                {
                    type: 'html',
                    name: 'datepicker-readonly.component.html',
                    content: require('!!raw-loader!./readonly/datepicker-readonly.component.html')
                },
                {
                    type: 'ts',
                    name: 'datepicker-readonly.component.ts',
                    content: require('!!raw-loader!./readonly/datepicker-readonly.component.ts')
                }
            ]
        },
        {
            title: '指令方式使用',
            component: DemoDatePickerDirectiveComponent,
            description: ``,
            codeExamples: [
                {
                    type: 'html',
                    name: 'datepicker-directive.component.html',
                    content: require('!!raw-loader!./directive/datepicker-directive.component.html')
                },
                {
                    type: 'ts',
                    name: 'datepicker-directive.component.ts',
                    content: require('!!raw-loader!./directive/datepicker-directive.component.ts')
                }
            ]
        }
    ];

    constructor() {}
}
