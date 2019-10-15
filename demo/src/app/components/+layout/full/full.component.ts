import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-demo-layout-full',
    templateUrl: './full.component.html'
})
export class DemoLayoutFullComponent implements OnInit {
    title = '头部标题';

    activeMenu = 'kanban';

    constructor() {}

    ngOnInit(): void {}

    setActiveMenu(menu: string) {
        this.activeMenu = menu;
    }
}
