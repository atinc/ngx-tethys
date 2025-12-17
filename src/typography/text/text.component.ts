import { ChangeDetectionStrategy, Component, OnInit, input } from '@angular/core';
import { ThyIcon } from 'ngx-tethys/icon';

/**
 * 文本组件
 * @name thy-text,[thyText]
 * @order 10
 */
@Component({
    selector: 'thy-text, [thyText]:not(thy-divider)',
    templateUrl: './text.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-text'
    },
    imports: [ThyIcon]
})
export class ThyText implements OnInit {
    /**
     * 前置图标
     */
    readonly thyIcon = input<string>();

    constructor() {}

    ngOnInit(): void {}
}
