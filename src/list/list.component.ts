import { Component, input } from '@angular/core';
import { coerceBooleanProperty } from 'ngx-tethys/util';

/**
 * 列表组件
 * @name thy-list
 * @order 10
 */
@Component({
    selector: 'thy-list',
    host: {
        class: 'thy-list',
        '[class.thy-list-divided]': 'thyDivided()'
    },
    template: '<ng-content></ng-content>'
})
export class ThyList {
    /**
     * 控制分割线的显示与隐藏
     */
    readonly thyDivided = input(false, { transform: coerceBooleanProperty });
}
