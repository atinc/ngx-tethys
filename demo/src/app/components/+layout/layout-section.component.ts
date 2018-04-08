
import { Component } from '@angular/core';

@Component({
    selector: 'demo-layout-section',
    templateUrl: './layout-section.component.html',
    styleUrls: [
        './layout-section.scss'
    ]
})
export class DemoLayoutSectionComponent {

    title = '头部标题';

    activeMenu = 'kanban';

    constructor() {
    }

    setActiveMenu(menu: string) {
        this.activeMenu = menu;
    }

}
