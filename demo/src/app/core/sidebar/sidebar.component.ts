import { Component, OnInit, ViewEncapsulation, HostBinding } from '@angular/core';

import { allMenus } from '../menu';

@Component({
    selector: 'demo-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit {
    @HostBinding(`class.demo-sidebar`) addSidebarClass = true;

    allMenus = allMenus;

    constructor() {}

    ngOnInit() {}
}
