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
import { ThyButtonSize } from 'ngx-tethys/types';
import { assertIconOnly, coerceBooleanProperty, ThyBooleanInput } from 'ngx-tethys/util';

export type ThyButtonType =
    | 'primary'
    | 'secondary'
    | 'info'
    | 'outline-primary'
    | 'outline-default'
    | 'danger'
    | 'link'
    | 'link-secondary'
    | 'warning'
    | 'outline-warning'
    | 'success'
    | 'outline-success'
    | 'outline-info'
    | 'outline-danger'
    | 'link-danger-weak'
    | 'link-danger'
    | 'link-success';

const btnTypeClassesMap: Record<string, string[]> = {
    primary: ['btn-primary'],
    secondary: ['btn-primary', 'btn-md'],
    info: ['btn-info'],
    warning: ['btn-warning'],
    danger: ['btn-danger'],
    'outline-primary': ['btn-outline-primary'],
    'outline-default': ['btn-outline-default'],
    link: ['btn-link'], // 链接按钮
    'link-info': ['btn-link', 'btn-link-info'], // 幽灵链接按钮
    'link-secondary': ['btn-link', 'btn-link-primary-weak'], // 幽灵链接按钮
    'link-danger-weak': ['btn-link', 'btn-link-danger-weak'], // 幽灵危险按钮
    'link-danger': ['btn-link', 'btn-link-danger'], // 危险按钮
    'link-success': ['btn-link', 'btn-link-success'] // 成功按钮
};

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
     * 按钮类型，支持添加前缀`outline-`实现线框按钮，支持添加前缀`link-`实现按钮链接
     * @type primary | info | warning | danger | success
     * @default primary
     */
    readonly thyButton = input<ThyButtonType>();

    /**
     * 和`thyButton`参数一样，一般使用`thyButton`，为了减少参数输入, 当通过`thy-button`使用时，只能使用该参数控制类型
     * @default primary
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
    readonly thySize = input<ThyButtonSize>('md');

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

    private readonly buttonType = computed<ThyButtonType>(() => {
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

    private updateClasses() {
        const type = this.type();
        if (!type) {
            return;
        }

        let classNames: string[] = [];
        if (btnTypeClassesMap[type]) {
            classNames = [...btnTypeClassesMap[type]];
        } else {
            if (type) {
                classNames.push(`btn-${type}`);
            }
        }

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
