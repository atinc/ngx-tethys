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

    @ViewChild('customTpl', { read: TemplateRef, static: true }) customTpl: TemplateRef<unknown> | undefined;

    collapsed = false;

    constructor() {}

    ngOnInit(): void {}

    collapsedChange(isCollapsed: boolean) {
        this.collapsed = isCollapsed;
    }
}
