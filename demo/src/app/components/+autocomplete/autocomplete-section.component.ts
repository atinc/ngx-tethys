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
            property: 'thyEmptyText',
            description: '空选项时的文本',
            type: 'string',
            default: '没有任何数据'
        },
        {
            property: 'thyAutoActiveFirstOption',
            description: '自动激活第一个选项',
            type: 'EventEmitter<ThyAutocompleteActivatedEvent>',
            default: 'false'
        },
        {
            property: 'thyOptionSelected',
            description: 'output event: option选择事件',
            type: 'EventEmitter<ThyOptionSelectionChangeEvent>'
        },
        {
            property: 'thyOpened',
            description: 'output event: 打开事件',
            type: 'EventEmitter<void>'
        },
        {
            property: 'thyClosed',
            description: 'output event: 关闭事件',
            type: 'EventEmitter<void>'
        },
        {
            property: 'thyOptionActivated',
            description: 'option activated event: 激活状态改变触发(Arrow Up/Down select)',
            type: 'EventEmitter<ThyAutocompleteActivatedEvent>'
        }
    ];

    public apiTriggerParameters = [
        {
            property: 'thyAutocomplete',
            description: '传入trigger触发的autocomplete组件实例',
            type: 'ThyAutocompleteComponent'
        },
        {
            property: 'thyOffset',
            description: 'overlay的offset',
            type: 'number',
            default: '8'
        },
        {
            property: 'thyAutocompleteWidth',
            description: 'autocomplete组件的宽度，不设置宽度则与trigger保持一致',
            type: 'number'
        },
        {
            property: 'thyPlacement',
            description: 'autocomplete显示位置',
            type: 'number',
            default: 'bottomLeft'
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
