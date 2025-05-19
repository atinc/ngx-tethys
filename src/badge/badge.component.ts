import { isTextColor } from 'ngx-tethys/core';

import { ChangeDetectionStrategy, Component, ElementRef, OnInit, Signal, computed, inject, input, numberAttribute } from '@angular/core';

import { coerceBooleanProperty, isUndefined } from 'ngx-tethys/util';

export type ThyBadgeSize = 'md' | 'sm' | 'lg';

/**
 * 徽标组件，支持组件`thy-badge`和`thyBadge`指令两种使用方式
 * @name thy-badge,[thyBadge]
 */
@Component({
    selector: 'thy-badge,[thyBadge]',
    templateUrl: './badge.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-badge-container',
        '[class.thy-badge-wrapper]': 'isWrapper'
    },
    imports: []
})
export class ThyBadge implements OnInit {
    private elementRef = inject(ElementRef);

    private nativeElement: any;

    readonly displayContent: Signal<string> = computed(() => {
        let content = this.value() as string;
        if (this.value() && !isUndefined(this.thyMaxCount()) && (this.value() as number) > this.thyMaxCount()) {
            content = `${this.thyMaxCount()}+`;
        }
        return content;
    });

    readonly badgeClassName: Signal<string> = computed(() => {
        const classes: string[] = [];
        classes.push(`thy-badge-${this.thyType()}`);
        if (this.thySize()) {
            classes.push(`thy-badge-${this.thySize()}`);
        }
        if (this.thyIsDot()) {
            classes.push(`thy-badge-dot`);
        } else if (this.thyIsHollow()) {
            classes.push(`thy-badge-hollow`);
        } else {
            classes.push(`thy-badge-count`);
        }
        const builtInTextColorClass = isTextColor(this.thyTextColor()) ? `text-${this.thyTextColor()}` : null;
        if (builtInTextColorClass) {
            classes.push(builtInTextColorClass);
        }
        const builtInBackgroundColorClass = isTextColor(this.thyBackgroundColor()) ? `bg-${this.thyBackgroundColor()}` : null;
        if (builtInBackgroundColorClass) {
            classes.push(builtInBackgroundColorClass);
        }
        return classes.join(' ');
    });

    // 是否包裹在元素上
    protected isWrapper = false;

    public readonly isShowBadge: Signal<boolean> = computed(() => {
        return !(!this.value() && !this.thyKeepShow() && !this.thyIsDot() && !this.thyIsHollow());
    });

    private readonly value: Signal<number | string> = computed(() => {
        return this.thyContent() || this.thyContext() || this.thyCount();
    });

    protected readonly textColor: Signal<string> = computed(() => {
        return !isTextColor(this.thyTextColor()) ? this.thyTextColor() : null;
    });

    protected readonly backgroundColor: Signal<string> = computed(() => {
        return !isTextColor(this.thyBackgroundColor()) ? this.thyBackgroundColor() : null;
    });

    constructor() {
        this.nativeElement = this.elementRef.nativeElement;
    }

    /**
     * 徽标类型
     * @type default | primary | danger | warning | success
     */
    readonly thyType = input<string, string>('danger', {
        transform: (value: string) => value || 'danger'
    });

    /**
     * 徽标内容数字
     * @type number
     */
    readonly thyCount = input<number, unknown>(undefined, { transform: numberAttribute });

    /**
     * 徽标内容文本
     * @type string
     */
    readonly thyContent = input<string>();

    /**
     * 已废弃，徽标内容文本，命名错误，请使用 thyContent
     */
    readonly thyContext = input<string>();

    /**
     * 徽标显示的最大值, 与 thyCount 一起使用,thyCount 超过了 thyMaxCount 设置的值时，徽标内容为 thyMaxCount+
     * @type number
     */
    readonly thyMaxCount = input<number, unknown>(undefined, { transform: numberAttribute });

    /**
     * 徽标显示的大小
     * @type md | sm | lg
     */
    readonly thySize = input<ThyBadgeSize, ThyBadgeSize>('md', { transform: (value: ThyBadgeSize) => value || 'md' });

    /**
     * 已废弃，徽标是一个实心点，已经被废弃
     * @deprecated
     */
    readonly thyIsDot = input(false, { transform: coerceBooleanProperty });

    /**
     * 已废弃，徽标是一个空心点
     * @deprecated
     */
    readonly thyIsHollow = input(false, { transform: coerceBooleanProperty });

    /**
     * thyCount 为 0 时，强制显示数字 0，默认不显示
     */
    readonly thyKeepShow = input(false, { transform: coerceBooleanProperty });

    /**
     * 设置徽标字体的颜色，支持内置颜色和自定义颜色 'primary' | '#87d068' | ...
     * @type string
     */
    readonly thyTextColor = input<string>('');

    /**
     * 设置徽标的背景颜色，支持内置颜色和自定义颜色 'primary' | '#87d068' | ...
     * @type string
     */
    readonly thyBackgroundColor = input<string>('');

    ngOnInit() {
        let childNodeCount = 0;
        this.nativeElement.childNodes.forEach((n: HTMLElement) => {
            if (['#comment'].indexOf(n.nodeName) < 0) {
                childNodeCount++;
            }
        });
        this.isWrapper = childNodeCount > 0;
    }
}
