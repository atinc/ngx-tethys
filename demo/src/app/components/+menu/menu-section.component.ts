import { Component, OnInit } from '@angular/core';
import { ThyPopBoxService } from '../../../../../src/pop-box';
import { DemoMenuPopComponent } from './pop-menu.component';

@Component({
    selector: 'demo-menu-section',
    templateUrl: './menu-section.component.html',
    styleUrls:['./menu-section.scss']
})
export class DemoMenuSectionComponent implements OnInit {
    public apiThyMenuGroupParameters = [
        {
            property: 'thyTitle',
            description: '分组标题',
            type: 'String',
            default: ''
        },
        {
            property: 'thyExpand',
            description: '默认是否展开',
            type: 'Boolean',
            default: 'false'
        },
        {
            property: 'thyShowIcon',
            description: '是否标题前面的图标',
            type: 'Boolean',
            default: 'false'
        },
        {
            property: 'thyIcon',
            description: '标题前面的图标class',
            type: 'String',
            default: 'wtf wtf-drive-o'
        },
        {
            property: 'thyShowAction',
            description: '是否显示右侧图标',
            type: 'Boolean',
            default: 'false'
        },
        {
            property: 'thyActionMenu',
            description: '点击右侧图标弹出菜单',
            type: 'TemplateRef',
            default: ''
        },
        {
            property: 'thyActionIcon',
            description: '右侧图标class',
            type: 'String',
            default: ''
        },
        {
            property: 'thyOnActionClick',
            description: '点击操作图标事件, 如果设置了菜单，显示菜单优先',
            type: 'Event',
            default: ''
        }
    ];

    public apiThyMenuItemIconParameters = [
        {
            property: 'thyColor',
            description: '设置图标颜色',
            type: 'String',
            default: '$primary'
        }
    ];

    public apiThyMenuItemActionParameters = [
        {
            property: 'thyActionMenu',
            description: '点击右侧图标弹出菜单',
            type: 'TemplateRef | ComponentType<T>',
            default: ''
        },
        {
            property: 'thyStopPropagation',
            description: '是否阻止冒泡',
            type: 'boolean',
            default: 'true'
        }
    ];

    constructor(private pbox: ThyPopBoxService) {}

    ngOnInit() {}

    moreAction() {
        console.log('click');
    }

    popMenu(event: Event) {
        this.pbox.show(DemoMenuPopComponent,{
            target: event.currentTarget,
            insideAutoClose: true,
            stopPropagation: true,
            placement: 'bottom right'
        })
    }
}
