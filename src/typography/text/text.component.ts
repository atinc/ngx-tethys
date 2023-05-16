import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ThyIconComponent } from 'ngx-tethys/icon';
import { NgIf } from '@angular/common';

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
    standalone: true,
    imports: [NgIf, ThyIconComponent]
})
export class ThyTextComponent implements OnInit {
    /**
     * 前置图标
     */
    @Input() thyIcon: string;

    constructor() {}

    ngOnInit(): void {}
}
