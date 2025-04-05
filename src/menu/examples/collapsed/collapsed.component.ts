import { Component, OnInit } from '@angular/core';
import { ThyMenu, ThyMenuGroup, ThyMenuItem } from 'ngx-tethys/menu';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'thy-menu-collapsed-example',
    templateUrl: './collapsed.component.html',
    styleUrls: ['./collapsed.component.scss'],
    imports: [ThyMenu, ThyMenuItem, ThyIcon, ThyMenuGroup]
})
export class ThyMenuCollapsedExampleComponent implements OnInit {
    collapsed = true;

    constructor() {}

    ngOnInit(): void {}
}
