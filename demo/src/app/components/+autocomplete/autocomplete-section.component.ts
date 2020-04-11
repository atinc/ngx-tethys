import { Component, OnInit } from '@angular/core';
import { LiveDemoCodeExample } from 'app/core/live-demo/live-demo.component';
import { DemoAutocompleteBasicComponent } from './basic/basic.component';

@Component({
    selector: 'demo-autocomplete-section',
    templateUrl: './autocomplete-section.component.html',
    styleUrls: ['./autocomplete-section.scss']
})
export class DemoAutocompleteSectionComponent implements OnInit {
    //#region 参数说明
    public apiParameters = [
        {
            property: 'selectionChange',
            description: 'output event: 选择项发生变化事件',
            type: 'EventEmitter<ThyAutoOptionComponent>'
        },
        {
            property: 'opened',
            description: 'output event: 打开事件',
            type: 'EventEmitter<void>'
        },
        {
            property: 'closed',
            description: 'output event: 关闭事件',
            type: 'EventEmitter<void>'
        }
    ];

    public apiTriggerParameters = [
        {
            property: 'thyAutocomplete',
            description: '传入trigger触发的autocomplete组件实例',
            type: 'ThyAutocompleteComponent'
        }
    ];

    public optionApiParameters = [
        {
            property: 'thyValue',
            description: '每个option的value值',
            type: 'string',
            default: ''
        },
        {
            property: 'thyLabelText',
            description: '每个option的label，用于显示',
            type: 'string',
            default: ''
        },
        {
            property: 'thyShowOptionCustom',
            description: '是否自定义展示option内容',
            type: 'boolean',
            default: 'false'
        },
        {
            property: 'thyDisabled',
            description: '是否禁用',
            type: 'boolean',
            default: 'false'
        }
    ];
    //#endregion

    liveDemos: LiveDemoCodeExample[] = [
        {
            title: '基本使用',
            component: DemoAutocompleteBasicComponent,
            description: `Autocomplete 功能展示`,
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
        }
    ];

    ngOnInit() {}
}
