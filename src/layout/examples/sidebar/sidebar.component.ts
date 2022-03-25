import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-layout-sidebar-example',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class ThyLayoutSidebarExampleComponent implements OnInit {
    isolated = false;

    collapsedWidth = 80;

    width = '';

    constructor() {}

    ngOnInit(): void {}
}
