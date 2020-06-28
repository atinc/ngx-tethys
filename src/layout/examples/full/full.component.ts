import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-layout-full-example',
    templateUrl: './full.component.html'
})
export class ThyLayoutFullExampleComponent implements OnInit {
    title = '头部标题';

    activeMenu = 'kanban';

    constructor() {}

    ngOnInit(): void {}

    setActiveMenu(menu: string) {
        this.activeMenu = menu;
    }
}
