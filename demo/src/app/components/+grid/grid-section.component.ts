import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination/pagination.component';

@Component({
    selector: 'demo-grid-section',
    templateUrl: './grid-section.component.html'
})
export class DemoGridSectionComponent implements OnInit {

    public model: any[] = [
        {
            id: 1,
            name: '张三',
            age: 10,
            checked: true,
            desc: ''
        }, {
            id: 2,
            name: '李四',
            age: 10,
            checked: false,
            desc: '这是一条测试数据'
        }, {
            id: 3,
            name: '王五',
            age: 10,
            checked: false,
            desc: '这是一条测试数据'
        }
    ];

    public gridApiParams = [
        {
            property: 'thyModel',
            description: 'Grid 数据源',
            type: 'Object[]',
            default: ''
        },
        {
            property: 'thyRowKey',
            description: '设置每行数据的唯一标识属性名',
            type: 'String',
            default: '_id'
        },
        {
            property: 'thyTheme',
            description: '设置Grid的显示风格 可选值 [default , bordered]',
            type: 'String',
            default: 'default'
        },
        {
            property: 'thyClassName',
            description: '设置Grid中使用的Table的Class',
            type: 'String',
            default: ''
        },
        {
            property: 'thyLoadingDone',
            description: '设置加载状态',
            type: 'Boolean',
            default: 'true'
        },
        {
            property: 'thyLoadingText',
            description: '设置加载显示的文本',
            type: 'String',
            default: ''
        },
        {
            property: 'thyEmptyOptions',
            description: '配置空状态组件',
            type: 'ThyGridEmptyOptions',
            default: ''
        },
        {
            property: 'thyFilter',
            description: '设置Grid过滤条件（暂未实现功能）',
            type: 'Object | Function',
            default: ''
        },
        {
            property: 'thyPageIndex',
            description: '设置当前页',
            type: 'Number',
            default: '1'
        },
        {
            property: 'thyPageSize',
            description: '设置每页显示数量',
            type: 'Number',
            default: '20'
        },
        {
            property: 'thyPageTotal',
            description: '设置总页数',
            type: 'Number',
            default: ''
        },
        {
            property: '(thyOnPageChange)',
            description: '翻页回调事件',
            type: 'PageChangedEvent',
            default: ''
        },
        {
            property: '(thyOnMultiSelectChange)',
            description: '多选回调事件',
            type: 'ThyMultiSelectEvent',
            default: ''
        },
        {
            property: '(thyOnRadioSelectChange)',
            description: '单选回调事件',
            type: 'ThyRadioSelectEvent',
            default: ''
        },
        {
            property: '(thyOnSwitchChange)',
            description: '切换组件回调事件',
            type: 'ThySwitchEvent',
            default: ''
        },
    ];
    public columnApiParams = [
        {
            property: 'thyModelKey',
            description: '设置数据属性Key',
            type: 'String',
            default: ''
        },
        {
            property: 'thyTitle',
            description: '设置列名',
            type: 'String',
            default: ''
        },
        {
            property: 'thyWidth',
            description: '设置列的宽度',
            type: 'String | Number',
            default: ''
        },
        {
            property: 'thyClassName',
            description: '设置列的Class',
            type: 'String',
            default: ''
        },
        {
            property: 'thyHeaderClassName',
            description: '是指列头部的Class',
            type: 'String',
            default: ''
        },
        {
            property: 'thyType',
            description: '设置列的类型 index:序列 ，checkbox:多选 ，radio:单选 ，switch:切换',
            type: 'String',
            default: ''
        },
        {
            property: 'thyDisabled',
            description: '设置自定义类型的禁用状态',
            type: 'Boolean',
            default: 'false'
        },
        {
            property: 'thySelections',
            description: 'checkbox radio 类型的列可设置选中的数据 ，支持 单个对象 单个Id  同时支持多个Id [_id1,_id2] 多个对象 [{_id:1},{_id:2}]',
            type: 'String | Number | Object | String[] | Number[] | Object[] ',
            default: ''
        },
        {
            property: 'thyDefaultText',
            description: '设置数据为空的时候显示的文本',
            type: 'String',
            default: ''
        }
    ];

    public selections = [1, 2, 3];

    public pagination = {
        index: 1,
        size: 20,
        total: 100
    };

    public loadingDone = false;

    public draggableOptions = {
        onStart: (event) => {
            console.log('onStart', event);
        },
        onUpdate: (event) => {
            console.log('onUpdate', event);
        }
    };

    ngOnInit() {
        setTimeout(() => {
            this.loadingDone = true;
            this.model.push({ ...this.model[1], checked: true });
        }, 3000);
    }

    onMultiSelectChange(event) {
        console.log(event);
    }

    onRadioSelectChange(event) {
        console.log(event);
    }

    onPageChange(event) {
        console.log(event);
    }

    onSwitchChange(event) {
        // 设置选中后，如果需要取消选中(必须调 refresh 来刷新数据)
        setTimeout(() => {
            event.row.checked = false;
            event.refresh();
        }, 2000);
    }

    onDraggableUpdate(event) {
        console.log(event);
    }
}
