import { Component } from '@angular/core';

@Component({
    selector: 'demo-layout-section',
    templateUrl: './layout-section.component.html',
    styleUrls: ['./layout-section.scss']
})
export class DemoLayoutSectionComponent {
    title = '头部标题';

    activeMenu = 'kanban';

    public thyLayoutApiParameters = [
    ];

    public thyLayoutSidebarApiParameters = [
        {
            property: 'thyHasBorderRight',
            description: '右侧有边框',
            type: 'Boolean',
            default: 'true'
        },
        {
            property: 'thyWidth',
            description: '宽度',
            type: 'number',
            default: ''
        },
        {
            property: 'thyIsDraggableWidth',
            description: '宽度',
            type: 'boolean',
            default: ''
        }
    ];

    public thyLayoutHeaderApiParameters = [
        {
            property: 'thyHasBorder',
            description: '底部是否有边框',
            type: 'boolean',
            default: 'false'
        },
        {
            property: 'thySize',
            description: '头部大小',
            type: 'string',
            default: 'md | sm'
        },
        {
            property: 'thyTitle',
            description: '标题',
            type: 'string',
            default: ''
        },
        {
            property: 'thyIcon',
            description: '图标',
            type: 'string',
            default: ''
        },
        {
            property: 'thyIconPrefix',
            description: '图标前缀',
            type: 'string',
            default: 'wtf'
        }
    ];


    constructor() {}

    setActiveMenu(menu: string) {
        this.activeMenu = menu;
    }
}
