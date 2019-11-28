import { Component, ViewEncapsulation } from '@angular/core';
import { LiveDemoCodeExample } from '../../core/live-demo/live-demo.component';
import { DemoListBasicComponent } from './basic/list-basic.component';
import { DemoListDropComponent } from './list-drop/list-drop.component';
import { DemoListGridComponent } from './list-grid/list-grid.component';
import { DemoListSeniorComponent } from './list-senior/list-senior.component';
import { DemoListObjectValueComponent } from './list-object-value/list-object-value.component';

@Component({
    selector: 'demo-list-section',
    templateUrl: './list-section.component.html',
    encapsulation: ViewEncapsulation.None
})
export class DemoListSectionComponent {
    liveDemos: LiveDemoCodeExample[] = [
        {
            title: '基本使用',
            component: DemoListBasicComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'list-basic.component.html',
                    content: require('!!raw-loader!./basic/list-basic.component.html')
                },
                {
                    type: 'ts',
                    name: 'list-basic.component.ts',
                    content: require('!!raw-loader!./basic/list-basic.component.ts')
                }
            ]
        },
        {
            title: 'List排序',
            component: DemoListDropComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'list-drop.component.html',
                    content: require('!!raw-loader!./list-drop/list-drop.component.html')
                },
                {
                    type: 'ts',
                    name: 'list-drop.component.ts',
                    content: require('!!raw-loader!./list-drop/list-drop.component.ts')
                }
            ]
        },
        {
            title: 'Grid Section',
            component: DemoListGridComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'list-grid.component.html',
                    content: require('!!raw-loader!./list-grid/list-grid.component.html')
                },
                {
                    type: 'ts',
                    name: 'list-grid.component.ts',
                    content: require('!!raw-loader!./list-grid/list-grid.component.ts')
                }
            ]
        },
        {
            title: 'Selection List Value is Object',
            component: DemoListObjectValueComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'list-object-value.component.html',
                    content: require('!!raw-loader!./list-object-value/list-object-value.component.html')
                },
                {
                    type: 'ts',
                    name: 'list-object-value.component.ts',
                    content: require('!!raw-loader!./list-object-value/list-object-value.component.ts')
                }
            ]
        },
        {
            title: 'Selection List',
            component: DemoListSeniorComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'list-senior.component.html',
                    content: require('!!raw-loader!./list-senior/list-senior.component.html')
                },
                {
                    type: 'ts',
                    name: 'list-senior.component.ts',
                    content: require('!!raw-loader!./list-senior/list-senior.component.ts')
                }
            ]
        }
    ];

    public apiOptionParameters = [
        {
            property: 'thyValue',
            description:
                '选项的 Value，可以是普通的 ID，也可以是对象，与 thy-selection-list 的 ngModel 和 thyUniqueKey 配合使用',
            type: 'any',
            default: 'null'
        },
        {
            property: 'thyListOptionSize',
            description: '选项的大小尺寸，默认值大小150*120',
            type: 'sm',
            default: 'null'
        }
    ];

    public apiParameters = [
        {
            property: 'thyBindKeyEventContainer',
            description: '绑定键盘事件的容器',
            type: 'Element | ElementRef | string',
            default: 'thy-selection-list 组件绑定的元素'
        },
        {
            property: 'thyScrollContainer',
            description: '出现滚动条的容器',
            type: 'Element | ElementRef | string',
            default: 'thy-selection-list 组件绑定的元素'
        },
        {
            property: 'thyBeforeKeydown',
            description: '键盘事件触发 Before 调用，如果返回 false 则停止继续执行',
            type: 'Function',
            default: 'null'
        },
        {
            property: 'thyMultiple',
            description: '是否为多选',
            type: 'Boolean',
            default: 'true'
        },
        {
            property: 'thyUniqueKey',
            description:
                'Option Value 唯一的 Key，用于存储哪些选择被选中的唯一值，只有 Option 的 thyValue 是对象的时才可以传入该选项',
            type: 'String',
            default: 'null'
        },
        {
            property: 'thyCompareWith',
            description: '比较2个选项的 Value 是否相同',
            type: 'Function',
            default: 'null'
        },
        {
            property: 'thySelectionChange',
            description: '选择 Options 的 Change 事件，',
            type: 'Function',
            default: 'null'
        },
        {
            property: 'ngModel',
            description: '默认选择项，选择项可以是对象，也可以是唯一的 ID，一般和 Option 的 thyValue 对应',
            type: 'any　| any[]',
            default: 'null'
        },
        {
            property: 'thyLayout',
            description: '列表的展示方式',
            type: 'list | grid',
            default: 'list'
        }
    ];

    constructor() {}
}
