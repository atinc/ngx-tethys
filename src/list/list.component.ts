import { Component, Input, HostBinding } from '@angular/core';
import { coerceBooleanProperty } from 'ngx-tethys/util';

/**
 * 列表组件
 * @name thy-list
 * @order 10
 */
@Component({
    selector: 'thy-list',
    template: '<ng-content></ng-content>'
})
export class ThyList {
    /**
     * 控制分割线的显示与隐藏
     * @default false
     */
    @Input({ transform: coerceBooleanProperty })
    set thyDivided(value: boolean) {
        this._isDivided = value;
    }

    @HostBinding(`class.thy-list-divided`) _isDivided = false;

    @HostBinding(`class.thy-list`) _isList = true;

    constructor() {}
}
