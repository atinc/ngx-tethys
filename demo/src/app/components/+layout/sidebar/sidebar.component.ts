import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-demo-layout-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['../layout-section.scss']
})
export class DemoLayoutSidebarComponent implements OnInit {
    isolated = false;

    width = '';

    constructor() {}

    ngOnInit(): void {}
}
