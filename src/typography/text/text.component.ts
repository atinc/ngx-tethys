import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ThyThemeColor } from 'ngx-tethys/core';

/**
 * 文本组件
 * @name thy-text,[thyText]
 */
@Component({
    selector: 'thy-text, [thyText]',
    templateUrl: './text.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-text'
    }
})
export class ThyTextComponent implements OnInit {
    /**
     * 文本颜色，支持设置主题色和自定义颜色值，主题色为 default、primary、success、info、warning、danger
     */
    @Input() thyColor: ThyThemeColor | string = '';

    /**
     * 前置图标
     */
    @Input() thyIcon: string;

    constructor() {}

    ngOnInit(): void {}
}
