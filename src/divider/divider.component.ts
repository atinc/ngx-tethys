import { Component, Input, TemplateRef, ViewEncapsulation, OnChanges, SimpleChanges, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { InputBoolean } from 'ngx-tethys/core';
import { useHostRenderer } from '@tethys/cdk/dom';
import { NgIf, NgTemplateOutlet } from '@angular/common';

export type ThyDividerStyle = 'solid' | 'dashed';

export type ThyDividerTextDirection = 'left' | 'right' | 'center';

export type ThyDividerColor = 'lighter' | 'light' | 'danger' | 'primary' | 'success' | 'warning' | string;

/**
 * 分割线
 */
@Component({
    preserveWhitespaces: false,
    encapsulation: ViewEncapsulation.None,
    selector: 'thy-divider',
    template: `
        <div *ngIf="templateContent" class="thy-divider-inner-template">
            <ng-template *ngTemplateOutlet="templateContent"></ng-template>
        </div>

        <span *ngIf="textContent" class="thy-divider-inner-text">{{ textContent }}</span>
    `,
    host: {
        '[class.thy-divider]': `true`,
        '[class.thy-divider-horizontal]': `!thyVertical`,
        '[class.thy-divider-vertical]': `thyVertical`,
        '[class.thy-divider-with-content]': `textContent || templateContent`,
        '[class.thy-divider-with-content-left]': `(textContent || templateContent) && thyTextDirection === 'left'`,
        '[class.thy-divider-with-content-right]': `(textContent || templateContent) && thyTextDirection === 'right'`,
        '[class.thy-divider-with-content-center]': `(textContent || templateContent) && thyTextDirection === 'center'`,
        '[class.thy-divider-solid]': `thyStyle === 'solid'`,
        '[class.thy-divider-dashed]': `thyStyle === 'dashed'`,
        '[class.thy-divider-deeper]': `!!thyDeeper`
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, NgTemplateOutlet]
})
export class ThyDividerComponent implements OnChanges, OnInit {
    templateContent: TemplateRef<HTMLElement>;

    textContent: string;

    private hostRenderer = useHostRenderer();

    /**
     * 是否垂直方向
     * @default false
     */
    @Input() thyVertical: boolean;

    /**
     * 风格线的分割，虚线和实线
     * @default solid
     */
    @Input() thyStyle: ThyDividerStyle = 'solid';

    /**
     * 分割线的颜色，默认 #eee，light 为 #ddd，primary 主色，success 成功色，warning 警告色，danger 危险色
     * @default default
     */
    @Input() thyColor: ThyDividerColor = 'default';

    /**
     * 中间文本内容，支持文字和模板
     */
    @Input() set thyText(value: string | TemplateRef<HTMLElement>) {
        if (value instanceof TemplateRef) {
            this.templateContent = value;
        } else {
            this.textContent = value;
        }
    }

    /**
     * 中间内容的方向
     */
    @Input() thyTextDirection: ThyDividerTextDirection = 'center';

    /**
     * 颜色加深，已经废弃，请使用 thyColor="light" 代替
     * @deprecated
     * @default false
     */
    @InputBoolean()
    @Input()
    thyDeeper = false;

    constructor() {}

    ngOnInit(): void {
        this.setColor(this.thyColor);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.thyColor && !changes.thyColor.isFirstChange()) {
            this.setColor(changes.thyColor.currentValue);
        }
    }

    setColor(color: ThyDividerColor) {
        this.hostRenderer.updateClass([`thy-divider-${color}`]);
    }
}
