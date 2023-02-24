import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
    selector: 'thy-layout-sidebar-example',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class ThyLayoutSidebarExampleComponent implements OnInit {
    isolated = false;

    collapsedWidth = 90;

    width = '';

    trigger: undefined | null = undefined;

    @ViewChild('customTpl', { read: TemplateRef, static: true }) customTpl: TemplateRef<unknown> | undefined;

    collapsed = false;

    triggerCollapsed = false;

    constructor() {}

    ngOnInit(): void {}

    collapsedChange(collapsed: boolean) {
        this.trigger = collapsed ? null : undefined;
    }

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.trigger = this.collapsed ? null : undefined;
    }

    dragWidthChange(width: number) {}
}
