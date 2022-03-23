import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-layout-full-example',
    templateUrl: './full.component.html'
})
export class ThyLayoutFullExampleComponent implements OnInit {
    collapsed = false;
    sidebarWidth = 240;
    originSidebarWidth: number;

    constructor() {}

    ngOnInit(): void {}

    toggleCollapse(active: boolean) {
        this.collapsed = active;
        if (!active) {
            this.originSidebarWidth = this.sidebarWidth;
            this.sidebarWidth = 10;
        } else {
            this.sidebarWidth = this.originSidebarWidth;
        }
    }
}
