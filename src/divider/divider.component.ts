import { Component, TemplateRef, ViewEncapsulation, OnInit, input, effect, Signal, computed } from '@angular/core';
import { useHostRenderer } from '@tethys/cdk/dom';
import { NgTemplateOutlet } from '@angular/common';
import { coerceBooleanProperty } from 'ngx-tethys/util';

export type ThyDividerAppearance = 'solid' | 'dashed';

/** @deprecated use ThyDividerAppearance, will be removed in v23 */
export type ThyDividerStyle = ThyDividerAppearance;

export type ThyDividerTextDirection = 'left' | 'right' | 'center';

export type ThyDividerColor = 'light' | 'lighter' | 'danger' | 'primary' | 'success' | 'warning';

/**
 * 分割线
 * @name thy-divider
 */
@Component({
    preserveWhitespaces: false,
    encapsulation: ViewEncapsulation.None,
    selector: 'thy-divider',
    template: `
        @if (templateContent()) {
            <div class="thy-divider-inner-template">
                <ng-template *ngTemplateOutlet="templateContent()"></ng-template>
            </div>
        }

        @if (textContent()) {
            <span class="thy-divider-inner-text">{{ textContent() }}</span>
        }
    `,
    host: {
        '[class.thy-divider]': `true`,
        '[class.thy-divider-horizontal]': `!thyVertical()`,
        '[class.thy-divider-vertical]': `thyVertical()`,
        '[class.thy-divider-with-content]': `textContent() || templateContent()`,
        '[class.thy-divider-with-content-left]': `(textContent() || templateContent()) && thyTextDirection() === 'left'`,
        '[class.thy-divider-with-content-right]': `(textContent() || templateContent()) && thyTextDirection() === 'right'`,
        '[class.thy-divider-with-content-center]': `(textContent() || templateContent()) && thyTextDirection() === 'center'`,
        '[class.thy-divider-solid]': `appearance() === 'solid'`,
        '[class.thy-divider-dashed]': `appearance() === 'dashed'`
    },
    imports: [NgTemplateOutlet]
})
export class ThyDivider implements OnInit {
    private hostRenderer = useHostRenderer();

    /**
     * 是否垂直方向
     */
    readonly thyVertical = input(false, { transform: coerceBooleanProperty });

    /**
     * 分割线的外观
     * @type solid(实线) | dashed(虚线)
     * @default solid
     */
    readonly thyAppearance = input<ThyDividerAppearance>();

    /**
     * 分割线的风格（已废弃，将在 v23 彻底删除），请使用 thyAppearance
     * @deprecated please use thyAppearance, will be removed in v23
     * @type solid(实线) | dashed(虚线)
     * @default solid
     */
    readonly thyStyle = input<ThyDividerStyle>('solid');

    readonly appearance = computed(() => this.thyAppearance() || this.thyStyle() || 'solid');

    /**
     * 分割线的颜色，默认 #eee，light 为 #ddd，primary 主色，success 成功色，warning 警告色，danger 危险色
     * @type 'lighter' | 'light' | 'danger' | 'primary' | 'success' | 'warning'
     */
    readonly thyColor = input<ThyDividerColor>('lighter');

    /**
     * 中间文本内容，支持文字和模板
     */
    readonly thyText = input<string | TemplateRef<HTMLElement>>();

    readonly templateContent: Signal<TemplateRef<HTMLElement> | undefined> = computed(() => {
        const text = this.thyText();
        if (text instanceof TemplateRef) {
            return text;
        }
    });

    readonly textContent: Signal<string | undefined> = computed(() => {
        const text = this.thyText();
        if (typeof text === 'string') {
            return text;
        }
    });

    /**
     * 中间内容的方向
     * @type left | right | center
     */
    readonly thyTextDirection = input<ThyDividerTextDirection>('center');

    constructor() {
        effect(() => {
            this.setColor();
        });
    }

    ngOnInit(): void {}

    setColor() {
        this.hostRenderer.updateClass([`thy-divider-${this.thyColor()}`]);
    }
}
