import { Component } from '@angular/core';

@Component({
    selector: 'demo-layout-section',
    templateUrl: './layout-section.component.html',
    styleUrls: ['./layout-section.scss']
})
export class DemoLayoutSectionComponent {
    title = '头部标题';

    activeMenu = 'kanban';

    public apiParameters = [
        {
            property: 'thy-sidebar[thyIsDraggableWidth]',
            description: '设置 thy-sidebar 宽度可调节',
            type: 'Boolean',
            default: 'false'
        }
    ];

    constructor() {}

    setActiveMenu(menu: string) {
        this.activeMenu = menu;
    }
}
