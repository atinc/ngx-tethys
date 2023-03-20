import { coerceBooleanProperty } from 'ngx-tethys/util';

import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';

/**
 * 卡片内容组件
 * @name thy-card-content
 * @order 30
 */
@Component({
    selector: 'thy-card-content',
    preserveWhitespaces: false,
    template: `
        <ng-content></ng-content>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-card-content'
    },
    standalone: true
})
export class ThyCardContentComponent implements OnInit {
    @HostBinding('class.thy-card-content--scroll') scrollClassName = false;

    /**
     * 内容区，滚动
     * @default false
     */
    @Input('thyScroll')
    set thyScroll(value: any) {
        this.scrollClassName = coerceBooleanProperty(value);
    }

    @HostBinding('class.thy-card-content--sm') _thySizeSm = false;

    /**
     * 已废弃，Content 大小, sm 时 padding-top 间距变小
     * @deprecated
     * @default md
     */
    @Input('thySize')
    set thySize(value: string) {
        this._thySizeSm = value === 'sm';
    }

    ngOnInit() {}
}
