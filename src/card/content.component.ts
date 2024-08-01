import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
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
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-card-content'
    },
    standalone: true
})
export class ThyCardContent implements OnInit {
    @HostBinding('class.thy-card-content--scroll') scrollClassName = false;

    /**
     * 内容区，滚动
     * @default false
     */
    @Input({ transform: coerceBooleanProperty })
    set thyScroll(value: boolean) {
        this.scrollClassName = value;
    }

    @HostBinding('class.thy-card-content--sm') _thySizeSm = false;

    /**
     * 已废弃，Content 大小，sm 时 padding-top 间距变小
     * @deprecated
     * @default md
     */
    @Input('thySize')
    set thySize(value: string) {
        this._thySizeSm = value === 'sm';
    }

    ngOnInit() {}
}
