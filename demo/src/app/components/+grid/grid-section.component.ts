import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination/pagination.component';
import { ThyMultiSelectEvent } from '../../../../../src/public-api';

@Component({
    selector: 'demo-grid-section',
    templateUrl: './grid-section.component.html'
})
export class DemoGridSectionComponent implements OnInit {
    public cloneModel: any[];
    public model: any[] = [
        {
            id: 1,
            name: '张三',
            age: 0,
            checked: true,
            desc: ''
        },
        {
            id: 2,
            name: '李四',
            age: 10,
            checked: false,
            desc: '这是一条测试数据'
        },
        {
            id: 3,
            name: '王五',
            age: 10,
            checked: false,
            desc: '这是一条测试数据'
        },
        {
            id: 4,
            name: '张三2',
            age: 0,
            checked: true,
            desc: ''
        },
        {
            id: 5,
            name: '李四2',
            age: 10,
            checked: false,
            desc: '这是一条测试数据'
        },
        {
            id: 6,
            name: '王五2',
            age: 10,
            checked: false,
            desc: '这是一条测试数据'
        },
        {
            id: 7,
            name: '张三3',
            age: 0,
            checked: true,
            desc: ''
        },
        {
            id: 8,
            name: '李四3',
            age: 10,
            checked: false,
            desc: '这是一条测试数据'
        },
        {
            id: 9,
            name: '王五3',
            age: 10,
            checked: false,
            desc: '这是一条测试数据'
        },
        {
            id: 10,
            name: '张三4',
            age: 0,
            checked: true,
            desc: ''
        },
        {
            id: 11,
            name: '李四4',
            age: 10,
            checked: false,
            desc: '这是一条测试数据'
        },
        {
            id: 12,
            name: '王五4',
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
            property: 'thyDraggable',
            description: '开启Grid拖拽',
            type: 'Boolean',
            default: 'false'
        },
        {
            property: 'thyWholeRowSelect',
            description: '设置开启选中当前行自动选中checkbox',
            type: 'Boolean',
            default: 'false'
        },
        {
            property: '(thyOnRowClick)',
            description: 'Grid行点击事件',
            type: 'ThyGridRowEvent',
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
        {
            property: '(thyOnDraggableChange)',
            description: '拖动修改事件',
            type: 'ThyGridDraggableEvent',
            default: ''
        }
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
            description:
                'checkbox radio 类型的列可设置选中的数据 ，支持 单个对象 单个Id  同时支持多个Id [_id1,_id2] 多个对象 [{_id:1},{_id:2}]',
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

    public selections = [];

    public pagination = {
        index: 1,
        size: 3,
        total: 12
    };

    public abc = true;

    public loadingDone = false;

    public draggableOptions = {
        disabled: false,
        onMove: event => {
            console.log('onMove');
            return event.related.className.indexOf('table-draggable-ignore-item') === -1;
        },
        filter: '.table-draggable-ignore-item'
    };

    ngOnInit() {
        setTimeout(() => {
            this.loadingDone = true;
        }, 3000);
        this.cloneModel = this.model;
        this.model = this.cloneModel.slice(0, this.pagination.index * this.pagination.size);
    }

    onMultiSelectChange(event: ThyMultiSelectEvent) {
        if (!this.selections.includes(event.row)) {
            this.selections.push(event.row);
        } else {
            this.selections = this.selections.filter(item => item.id !== event.row.id);
        }
        this.selections = [...this.selections];
        console.log(event);
        console.log(this.selections);
    }

    gridRowClassName(row, index) {
        if (row.id === 1) {
            return 'table-draggable-ignore-item';
        }
    }

    onRadioSelectChange(event) {
        console.log(event);
    }

    onPageChange(event) {
        console.log(event);
        this.model = this.cloneModel.slice((event.page - 1) * this.pagination.size, event.page * this.pagination.size);
    }

    onSwitchChange(event) {
        setTimeout(() => {
            event.row.checked = false;
            event.refresh();
        }, 2000);
    }

    onDraggableUpdate(event) {
        console.log(event);
    }

    onContextMenu(event) {
        console.log(event);
        alert('右键');
    }

    onRowClick(event) {
        console.log(event);
    }
}
