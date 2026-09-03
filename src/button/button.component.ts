import {
    afterNextRender,
    ChangeDetectionStrategy,
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

export type ThyButtonAppearance = 'fill' | 'outline' | 'link';

export type ThyButtonType = 'primary' | 'default' | 'info' | 'warning' | 'danger' | 'success';

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
    changeDetection: ChangeDetectionStrategy.OnPush,
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
     * 按钮类型（颜色）
     * @type primary | default | info | warning | danger | success
     * @default primary
     */
    readonly thyButton = input<ThyButtonType | string>();

    /**
     * 和`thyButton`参数一样，一般使用`thyButton`，为了减少参数输入, 当通过`thy-button`使用时，只能使用该参数控制类型
     * @default primary
     */
    readonly thyType = input<ThyButtonType | string>();

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
     * @type xs | sm | md | default | lg
     * @default default
     */
    readonly thySize = input<string>();

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

    private readonly buttonType = computed(() => {
        return this.thyButton() || this.thyType() || 'primary';
    });

    protected isRadiusSquare = computed(() => {
        const type = this.buttonType();
        return !!type?.includes('-square');
    });

    protected type = computed(() => {
        const type = this.buttonType();
        if (this.isRadiusSquare()) {
            return type?.replace('-square', '');
        } else {
            return type;
        }
    });

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

        const appearance = this.thyAppearance() || 'fill';
        const classNames: string[] = [...this.buildAppearanceClasses(appearance, type)];

        const size = this.thySize();
        if (size) {
            classNames.push(`btn-${size}`);
        }
        if (this.isRadiusSquare()) {
            classNames.push('btn-square');
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
