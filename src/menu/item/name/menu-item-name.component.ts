import { Component, OnInit, HostBinding, Input } from '@angular/core';

/**
 * 菜单项名称
 */
@Component({
    selector: 'thy-menu-item-name,[thy-menu-item-name],[thyMenuItemName]',
    templateUrl: './menu-item-name.component.html',
    host: {
        class: 'thy-menu-item-name'
    }
})
export class ThyMenuItemNameComponent implements OnInit {
    /**
     * 是否 ellipsis，默认 true
     */
    @HostBinding('class.thy-menu-item-name-ellipsis')
    @Input()
    thyOverflowEllipsis = true;

    constructor() {}

    ngOnInit(): void {}
}
