import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { isTextColor, isThemeColor, ThyTextColor, ThyThemeColor, UpdateHostClassService } from 'ngx-tethys/core';

/**
 * 文本组件
 * @name thy-text,[thyText]
 */
@Component({
    selector: 'thy-text, [thyText]:not(thy-divider)',
    templateUrl: './text.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-text'
    }
})
export class ThyTextComponent implements OnInit {
    /**
     * 前置图标
     */
    @Input() thyIcon: string;

    constructor() {}

    ngOnInit(): void {}
}
