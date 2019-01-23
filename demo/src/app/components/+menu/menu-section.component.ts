import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-menu-section',
    templateUrl: './menu-section.component.html'
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
            property: 'thyActionClick',
            description: '点击右侧事件, 如果设置了菜单，显示菜单优先',
            type: 'Event',
            default: ''
        }
    ];

    public apiThyMenuItemIconMoreParameters = [
        {
            property: 'thyActionMenu',
            description: '点击右侧图标弹出菜单',
            type: 'TemplateRef',
            default: ''
        }
    ];

    ngOnInit() {}

    moreAction() {
        console.log('click');
    }
}
