import {
    afterNextRender,
    Component,
    computed,
    DestroyRef,
    effect,
    ElementRef,
    inject,
    input,
    Renderer2,
    ViewEncapsulation
} from '@angular/core';

import { NgClass } from '@angular/common';
import { useHostRenderer } from '@tethys/cdk/dom';
import { ThyIcon } from 'ngx-tethys/icon';
import { assertIconOnly, coerceBooleanProperty, ThyBooleanInput } from 'ngx-tethys/util';
import { THY_BUTTON_GROUP } from './button.token';

export type ThyButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export type ThyButtonAppearance = 'fill' | 'outline' | 'link';

export type ThyButtonColor = 'default' | 'primary' | 'info' | 'warning' | 'danger' | 'success';

/** @deprecated use ThyButtonColor, will be removed in v23 */
export type ThyButtonType = ThyButtonColor;

const iconOnlyClass = 'thy-btn-icon-only';

/**
 * 操作按钮，支持组件`thy-button`和`thyButton`指令两种形式
 * @name thy-button,[thy-button],[thyButton]
 * @order 10
 */
@Component({
    selector: 'thy-button,[thy-button],[thyButton]',
    templateUrl: './button.component.html',
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'thy-btn btn',
        '[class.btn-block]': 'thyBlock()',
        '[class.disabled]': 'thyDisabled()',
        '[attr.aria-disabled]': 'thyDisabled() || null'
    },
    imports: [ThyIcon, NgClass]
})
export class ThyButton {
    private elementRef = inject(ElementRef);
    private renderer = inject(Renderer2);
    private destroyRef = inject(DestroyRef);

    private _originalText?: string;

    private get nativeElement(): HTMLElement {
        return this.elementRef.nativeElement;
    }

    private hostRenderer = useHostRenderer();

    /**
     * 按钮外观
     * @type fill | outline | link
     * @default fill
     */
    readonly thyAppearance = input<ThyButtonAppearance>('fill');

    /**
     * 按钮颜色
     * @type default | primary | info | warning | danger | success
     * @default default
     */
    readonly thyButton = input<ThyButtonColor>();

    /**
     * 按钮颜色，一般使用`thyButton`指令写法；通过`thy-button`组件使用时，使用该参数控制颜色
     * @type default | primary | info | warning | danger | success
     * @default default
     */
    readonly thyColor = input<ThyButtonColor>();

    /**
     * 按钮颜色（已废弃，将在 v23 彻底移除），请使用 thyColor
     * @deprecated please use thyColor, will be removed in v23
     * @type default | primary | info | warning | danger | success
     * @default default
     */
    readonly thyType = input<ThyButtonType>();

    /**
     * 加载状态
     * @default false
     */
    readonly thyLoading = input<boolean, ThyBooleanInput>(false, {
        transform: value => {
            if (!this.thyLoading() && value) {
                const textElement = this.nativeElement?.querySelector('span');
                this._originalText = textElement ? textElement.innerText : '';
            }
            return coerceBooleanProperty(value);
        }
    });

    /**
     * 加载状态时显示的文案
     */
    readonly thyLoadingText = input<string>();

    /**
     * 按钮大小
     * @type xs | sm | md | lg
     * @default md
     */
    readonly thySize = input<ThyButtonSize, ThyButtonSize | null | undefined>('md', {
        transform: value => value ?? 'md'
    });

    /**
     * 按钮中显示的图标，支持SVG图标名称，比如`angle-left`，也支持传之前的 wtf 字体，比如: wtf-plus
     */
    readonly thyIcon = input<string>();

    /**
     * 按钮整块展示
     * @default false
     */
    readonly thyBlock = input<boolean, ThyBooleanInput>(false, { transform: coerceBooleanProperty });

    /**
     * 是否禁用。用于 `thy-button` 组件；指令写法请使用原生 `disabled`
     * @default false
     */
    readonly thyDisabled = input<boolean, ThyBooleanInput>(false, { transform: coerceBooleanProperty });

    private isWtfIcon = computed(() => {
        const icon = this.thyIcon();
        return icon && icon.includes('wtf');
    });

    protected svgIconName = computed(() => {
        if (!this.isWtfIcon()) {
            return this.thyIcon();
        }
        return null;
    });

    protected iconClass = computed<string[] | null>(() => {
        const icon = this.thyIcon();
        if (this.isWtfIcon()) {
            const classes = icon!.split(' ');
            if (classes.length === 1) {
                classes.unshift('wtf');
            }
            return classes;
        }
        return null;
    });

    private readonly type = computed(() => {
        return this.thyButton() || this.thyColor() || this.thyType() || 'default';
    });

    private parent = inject(THY_BUTTON_GROUP, { optional: true });

    private readonly appearance = computed(() => this.parent?.thyAppearance() || this.thyAppearance() || 'fill');

    private readonly size = computed(() => this.parent?.thySize() || this.thySize() || 'md');

    private setButtonText() {
        const text = this.thyLoading() ? this.thyLoadingText() : this._originalText;
        const spanElement = this.nativeElement.querySelector('span');
        const textNode = spanElement?.firstChild;
        if (spanElement && textNode && text) {
            this.renderer.setValue(textNode, text);
        }
    }

    private buildAppearanceClasses(appearance: ThyButtonAppearance, type: string): string[] {
        if (appearance === 'fill') {
            return [`btn-${type}`];
        }
        return [`btn-${appearance}-${type}`];
    }

    private updateClasses() {
        const type = this.type();
        if (!type) {
            return;
        }

        const classNames: string[] = [...this.buildAppearanceClasses(this.appearance(), type)];

        const size = this.size();
        if (size) {
            classNames.push(`btn-${size}`);
        }
        const loading = this.thyLoading();
        if (loading) {
            classNames.push('loading');
        }
        this.hostRenderer.updateClass(classNames);
    }

    constructor() {
        this.preventClickWhenUnavailable();

        effect(() => {
            this.updateClasses();
        });

        effect(() => {
            this.setButtonText();
        });

        afterNextRender(() => {
            if (assertIconOnly(this.nativeElement)) {
                this.hostRenderer.addClass(iconOnlyClass);
            } else {
                this.hostRenderer.removeClass(iconOnlyClass);
            }
            this.wrapSpanForText(this.nativeElement.childNodes);
        });
    }

    private preventClickWhenUnavailable(): void {
        const onClick = (event: Event) => {
            if (this.thyDisabled() || this.thyLoading()) {
                event.preventDefault();
                event.stopImmediatePropagation();
            }
        };
        this.nativeElement.addEventListener('click', onClick, true);
        this.destroyRef.onDestroy(() => this.nativeElement.removeEventListener('click', onClick, true));
    }

    private wrapSpanForText(nodes: NodeList): void {
        nodes.forEach(node => {
            if (node.nodeName === '#text') {
                const span = this.renderer.createElement('span');
                const parent = this.renderer.parentNode(node);
                this.renderer.addClass(span, 'thy-btn-wrap-span');
                this.renderer.insertBefore(parent, span, node);
                this.renderer.appendChild(span, node);
            }
        });
    }
}
