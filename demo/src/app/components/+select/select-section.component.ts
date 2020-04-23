import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { tap, delay } from 'rxjs/operators';
import { of, timer } from 'rxjs';
import { taskTypes } from './mock-data';
import { LiveDemoCodeExample } from 'app/core/live-demo/live-demo.component';
import { CustomSelectBasicComponent } from './basic/custom-select-basic.component';
import { CustomSelectEmptyComponent } from './empty/custom-select-empty.component';
import { CustomSelectDisplayComponent } from './display/custom-select-display.component';
import { CustomSelectGroupComponent } from './group/custom-select-group.component';
import { NativeSelectBasicComponent } from './native-select/native-select-basic.component';
import { CustomSelectScrollComponent } from './scroll-load/custom-select-scroll.component';
import { CustomSelectServerSearchComponent } from './server-search/server-search.component';

@Component({
    selector: 'demo-select-section',
    templateUrl: './select-section.component.html',
    styleUrls: ['./select-section.scss']
})
export class DemoSelectSectionComponent implements OnInit {
    //#region 参数说明
    public apiParameters = [
        {
            property: 'thySize',
            description: '大小，sm | md | lg',
            type: 'String',
            default: ''
        },
        {
            property: 'thyShowSearch',
            description: '下拉列表是否显示搜索框',
            type: 'boolean',
            default: 'false'
        },
        {
            property: 'thyPlaceHolder',
            description: '选择框默认文字',
            type: 'string',
            default: ''
        },
        {
            property: 'thyServerSearch',
            description: '是否使用服务端搜索，当为 true 时，将不再在前端进行过滤',
            type: 'boolean',
            default: 'false'
        },
        {
            property: 'thyOnSearch',
            description: '搜索时回调',
            type: '(searchText:string)=>{}'
        },
        {
            property: 'thyMode',
            description: '下拉选择模式',
            type: '"" | multiple',
            default: ''
        },
        {
            property: 'thyAllowClear',
            description: '单选(thyMode=""或者不设置)时，选择框支持清除',
            type: 'boolean',
            default: 'false'
        },
        {
            property: 'thyEmptyStateText',
            description: '数据为空时显示的提示文字',
            type: 'string',
            default: ''
        },
        {
            property: 'thyDisabled',
            description: '是否禁用，如果使用了 ngModel，也可以使用 disabled 属性',
            type: 'boolean',
            default: 'false'
        },
        {
            property: 'thyEnableScrollLoad',
            description: '滚动加载是否可用, 只能当这个参数可以，下面的thyOnScrollToBottom事件才会触发',
            type: 'boolean',
            default: 'false'
        },
        {
            property: 'thyOnScrollToBottom',
            description: 'output event: 下拉菜单滚动到底部事件，可以用这个事件实现滚动加载',
            type: '()=>{}'
        },
        {
            property: 'thyOnExpandStatusChange',
            description: 'output event: 下拉菜单展开和这点状态事件',
            type: '(openStatus: boolean)=>{}'
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
            property: 'thySearchKey',
            description:
                '传入搜索需要的关键字，支持多个关键字（“{{display_name}},{{name}},{{pin_yin}}”），如不传则默认按照label进行搜索,此为前端过滤',
            type: 'string',
            default: ''
        },
        {
            property: 'thyDisabled',
            description: '是否禁用',
            type: 'boolean',
            default: 'false'
        },
        {
            property: 'thySortComparator',
            description: '排序比较函数',
            type: 'function',
            default: undefined
        }
    ];
    //#endregion

    liveDemos: LiveDemoCodeExample[] = [
        {
            title: '基本使用',
            component: CustomSelectBasicComponent,
            description: `Custom-Select功能展示`,
            codeExamples: [
                {
                    type: 'html',
                    name: 'custom-select-basic.component.html',
                    content: require('!!raw-loader!./basic/custom-select-basic.component.html')
                },
                {
                    type: 'ts',
                    name: 'custom-select-basic.component.ts',
                    content: require('!!raw-loader!./basic/custom-select-basic.component.ts')
                }
            ]
        },
        {
            title: '选项为空',
            component: CustomSelectEmptyComponent,
            description: `Custom-Select 选项为空的默认展示`,
            codeExamples: [
                {
                    type: 'html',
                    name: 'custom-select-empty.component.html',
                    content: require('!!raw-loader!./empty/custom-select-empty.component.html')
                },
                {
                    type: 'ts',
                    name: 'custom-select-empty.component.ts',
                    content: require('!!raw-loader!./empty/custom-select-empty.component.ts')
                }
            ]
        },
        {
            title: '自定义显示',
            component: CustomSelectDisplayComponent,
            description: `Custom-Select 自定义Option显示和选中的显示`,
            codeExamples: [
                {
                    type: 'html',
                    name: 'custom-select-display.component.html',
                    content: require('!!raw-loader!./display/custom-select-display.component.html')
                },
                {
                    type: 'ts',
                    name: 'custom-select-display.component.ts',
                    content: require('!!raw-loader!./display/custom-select-display.component.ts')
                }
            ]
        },
        {
            title: '滚动加载',
            component: CustomSelectScrollComponent,
            description: `展示Custom-Select支持滚动加载Option`,
            codeExamples: [
                {
                    type: 'html',
                    name: 'custom-select-scroll.component.html',
                    content: require('!!raw-loader!./scroll-load/custom-select-scroll.component.html')
                },
                {
                    type: 'ts',
                    name: 'custom-select-scroll.component.ts',
                    content: require('!!raw-loader!./scroll-load/custom-select-scroll.component.ts')
                }
            ]
        },
        {
            title: 'Option分组',
            component: CustomSelectGroupComponent,
            description: `Option分组展示以及分组下的搜索功能展示`,
            codeExamples: [
                {
                    type: 'html',
                    name: 'custom-select-group.component.html',
                    content: require('!!raw-loader!./group/custom-select-group.component.html')
                },
                {
                    type: 'ts',
                    name: 'custom-select-group.component.ts',
                    content: require('!!raw-loader!./group/custom-select-group.component.ts')
                }
            ]
        },
        {
            title: '服务端搜索',
            component: CustomSelectServerSearchComponent,
            description: `展示服务端搜索功能`,
            codeExamples: [
                {
                    type: 'html',
                    name: 'server-search.component.html',
                    content: require('!!raw-loader!./server-search/server-search.component.html')
                },
                {
                    type: 'ts',
                    name: 'server-search.component.ts',
                    content: require('!!raw-loader!./server-search/server-search.component.ts')
                }
            ]
        },
        {
            title: '默认select',
            component: NativeSelectBasicComponent,
            description: `展示默认Select组件，支持自定义大小`,
            codeExamples: [
                {
                    type: 'html',
                    name: 'native-select-basic.component.html',
                    content: require('!!raw-loader!./native-select/native-select-basic.component.html')
                },
                {
                    type: 'ts',
                    name: 'native-select-basic.component.ts',
                    content: require('!!raw-loader!./native-select/native-select-basic.component.ts')
                }
            ]
        }
    ];

    ngOnInit() {}
}
