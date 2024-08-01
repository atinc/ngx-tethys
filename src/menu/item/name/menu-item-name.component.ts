import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { coerceBooleanProperty } from 'ngx-tethys/util';

/**
 * 菜单项名称
 * @name thy-menu-item-name,[thy-menu-item-name],[thyMenuItemName]
 * @order 20
 */
@Component({
    selector: 'thy-menu-item-name,[thy-menu-item-name],[thyMenuItemName]',
    templateUrl: './menu-item-name.component.html',
    host: {
        class: 'thy-menu-item-name'
    },
    standalone: true
})
export class ThyMenuItemName implements OnInit {
    /**
     * 是否 ellipsis
     */
    @HostBinding('class.thy-menu-item-name-ellipsis')
    @Input({ transform: coerceBooleanProperty })
    thyOverflowEllipsis = true;

    constructor() {}

    ngOnInit(): void {}
}
