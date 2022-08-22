import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { isTextColor, isThemeColor, ThyTextColor, ThyThemeColor, UpdateHostClassService } from 'ngx-tethys/core';

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
    },
    providers: [UpdateHostClassService]
})
export class ThyTextComponent implements OnInit {
    private color: ThyThemeColor | ThyTextColor | string = '';

    /**
     * 文本颜色，支持设置主题色和自定义颜色值，主题色为 default、primary、success、info、warning、danger
     */
    @Input()
    set thyColor(color: ThyThemeColor | ThyTextColor | string) {
        this.color = color;
        this.setColor();
    }

    /**
     * 前置图标
     */
    @Input() thyIcon: string;

    constructor(private elementRef: ElementRef, private updateHostClassService: UpdateHostClassService) {
        this.updateHostClassService.initializeElement(this.elementRef);
    }

    ngOnInit(): void {}

    private setColor() {
        if (isThemeColor(this.color) || isTextColor(this.color)) {
            this.updateHostClassService.updateClass([`thy-text-${this.color}`]);
        } else {
            this.elementRef.nativeElement.style.color = this.color;
        }
    }
}
