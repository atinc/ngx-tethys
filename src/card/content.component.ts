import { Component, input, OnInit } from '@angular/core';
import { coerceBooleanProperty } from 'ngx-tethys/util';

/**
 * 卡片内容组件
 * @name thy-card-content
 * @order 30
 */
@Component({
    selector: 'thy-card-content',
    preserveWhitespaces: false,
    template: ` <ng-content></ng-content> `,
    host: {
        class: 'thy-card-content',
        '[class.thy-card-content--scroll]': '!!thyScroll()'
    }
})
export class ThyCardContent implements OnInit {
    /**
     * 内容区，滚动
     */
    readonly thyScroll = input(false, { transform: coerceBooleanProperty });

    ngOnInit() {}
}
