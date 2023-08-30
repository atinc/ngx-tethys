import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnInit,
    Renderer2,
    ViewEncapsulation,
    AfterViewInit
} from '@angular/core';

import { InputBoolean } from 'ngx-tethys/core';
import { assertIconOnly } from 'ngx-tethys/util';
import { useHostRenderer } from '@tethys/cdk/dom';
import { ThyIconComponent } from 'ngx-tethys/icon';
import { NgIf, NgClass } from '@angular/common';

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

const btnTypeClassesMap = {
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
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-btn btn'
    },
    standalone: true,
    imports: [NgIf, ThyIconComponent, NgClass]
})
export class ThyButtonComponent implements OnInit, AfterViewInit {
    private _initialized = false;

    private _originalText: string;

    private _type: string;

    private _size: string;

    private _icon: string;

    private _loading: boolean;

    private _loadingText: string;

    // 圆角方形
    _isRadiusSquare = false;

    iconClass: string[];

    svgIconName: string;

    private get nativeElement(): HTMLElement {
        return this.elementRef.nativeElement;
    }

    private hostRenderer = useHostRenderer();

    /**
     * 按钮类型，支持添加前缀`outline-`实现线框按钮，支持添加前缀`link-`实现按钮链接
     * @type primary | info | warning | danger | success
     * @default primary
     */
    @Input()
    set thyButton(value: ThyButtonType) {
        this.setBtnType(value);
    }

    /**
     * 和`thyButton`参数一样，一般使用`thyButton`，为了减少参数输入, 当通过`thy-button`使用时，只能使用该参数控制类型
     * @default primary
     */
    @Input()
    set thyType(value: ThyButtonType) {
        this.setBtnType(value);
    }

    /**
     * 加载状态
     * @default false
     */
    @Input()
    @InputBoolean()
    set thyLoading(value: boolean) {
        if (!this._loading && value) {
            this._loading = value;
            const textElement = this.nativeElement.querySelector('span');
            this._originalText = textElement ? textElement.innerText : '';
            this.setLoadingStatus();
        } else {
            this._loading = value;
            this.setLoadingStatus();
        }
    }

    /**
     * 加载状态时显示的文案
     */
    @Input()
    set thyLoadingText(value: string) {
        if (this._loadingText !== value) {
            this._loadingText = value;
            if (this._loading) {
                this.setLoadingText(this._loadingText);
            }
        }
    }

    /**
     * 按钮大小
     * @type xs | sm | md | default | lg
     * @default default
     */
    @Input()
    set thySize(size: string) {
        this._size = size;
        if (this._initialized) {
            this.updateClasses();
        }
    }

    /**
     * 按钮中显示的图标，支持SVG图标名称，比如`angle-left`，也支持传之前的 wtf 字体，比如: wtf-plus
     */
    @Input()
    set thyIcon(icon: string) {
        this._icon = icon;
        if (this._icon) {
            if (icon.includes('wtf')) {
                const classes = this._icon.split(' ');
                if (classes.length === 1) {
                    classes.unshift('wtf');
                }
                this.iconClass = classes;
                this.svgIconName = null;
            } else {
                this.svgIconName = icon;
            }
        } else {
            this.iconClass = null;
            this.svgIconName = null;
        }
    }

    /**
     * 按钮整块展示
     * @default false
     */
    @HostBinding(`class.btn-block`)
    @Input()
    @InputBoolean()
    thyBlock: boolean;

    private setBtnType(value: ThyButtonType) {
        if (value) {
            if (value.includes('-square')) {
                this._type = value.replace('-square', '');
                this._isRadiusSquare = true;
            } else {
                this._type = value;
            }

            if (this._initialized) {
                this.updateClasses();
            }
        }
    }

    private setLoadingText(text: string) {
        const spanElement = this.nativeElement.querySelector('span');
        if (spanElement) {
            this.renderer.setProperty(spanElement, 'innerText', text);
        }
    }

    private setLoadingStatus() {
        const innerText = this._loading ? this._loadingText : this._originalText;
        this.updateClasses();
        if (innerText) {
            this.setLoadingText(innerText);
        }
    }

    private updateClasses() {
        let classNames: string[] = [];
        if (btnTypeClassesMap[this._type]) {
            classNames = [...btnTypeClassesMap[this._type]];
        } else {
            if (this._type) {
                classNames.push(`btn-${this._type}`);
            }
        }
        if (this._size) {
            classNames.push(`btn-${this._size}`);
        }
        if (this._isRadiusSquare) {
            classNames.push('btn-square');
        }
        if (this._loading) {
            classNames.push('loading');
        }
        this.hostRenderer.updateClass(classNames);
    }

    constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

    ngOnInit() {
        this.updateClasses();
        this._initialized = true;
    }

    ngAfterViewInit() {
        if (!assertIconOnly(this.nativeElement)) {
            this.hostRenderer.removeClass(iconOnlyClass);
        } else {
            this.hostRenderer.addClass(iconOnlyClass);
        }
        this.wrapSpanForText(this.nativeElement.childNodes);
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
