import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { InputBoolean } from 'ngx-tethys/core';

/**
 * 菜单项名称
 * @name thy-menu-item-name,[thy-menu-item-name],[thyMenuItemName]
 */
@Component({
    selector: 'thy-menu-item-name,[thy-menu-item-name],[thyMenuItemName]',
    templateUrl: './menu-item-name.component.html',
    host: {
        class: 'thy-menu-item-name'
    },
    standalone: true
})
export class ThyMenuItemNameComponent implements OnInit {
    /**
     * 是否 ellipsis
     */
    @HostBinding('class.thy-menu-item-name-ellipsis')
    @Input()
    @InputBoolean()
    thyOverflowEllipsis = true;

    constructor() {}

    ngOnInit(): void {}
}
