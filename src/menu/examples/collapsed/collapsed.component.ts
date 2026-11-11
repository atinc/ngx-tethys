import { Component, OnInit, signal } from '@angular/core';
import { ThyMenu, ThyMenuGroup, ThyMenuItem, ThyMenuItemIcon, ThyMenuItemName } from 'ngx-tethys/menu';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'thy-menu-collapsed-example',
    templateUrl: './collapsed.component.html',
    styleUrls: ['./collapsed.component.scss'],
    imports: [ThyMenu, ThyMenuItem, ThyMenuItemIcon, ThyMenuItemName, ThyIcon, ThyMenuGroup]
})
export class ThyMenuCollapsedExampleComponent implements OnInit {
    collapsed = signal<boolean>(true);

    constructor() {}

    ngOnInit(): void {}
}
