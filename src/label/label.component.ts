import { Component, ElementRef, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { coerceBooleanProperty } from 'ngx-tethys/util';
import { helpers } from 'ngx-tethys/util';
import { useHostRenderer } from '@tethys/cdk/dom';
import { ThyIconComponent } from 'ngx-tethys/icon';
import { NgIf, NgStyle, NgClass } from '@angular/common';

export type ThyLabelType = 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger';

export type ThyLabelTypeSize = 'sm' | 'default' | 'md' | 'lg' | 'xlg';

const labelTypeClassesMap = {
    default: ['thy-label', 'thy-label-default'],
    primary: ['thy-label', 'thy-label-primary'],
    success: ['thy-label', 'thy-label-success'],
    info: ['thy-label', 'thy-label-info'],
    warning: ['thy-label', 'thy-label-warning'],
    danger: ['thy-label', 'thy-label-danger']
};
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[thyLabel]',
    templateUrl: './label.component.html',
    standalone: true,
    imports: [NgIf, ThyIconComponent, NgStyle, NgClass]
})
export class ThyLabelComponent {
    @HostBinding('class.label-has-hover') _thyHasHover = false;

    @HostBinding('class.thy-label--sm') _classNameSM = false;

    @HostBinding('class.thy-label--md') _classNameDM = false;

    @HostBinding('class.thy-label--lg') _classNameLG = false;

    @HostBinding('class.thy-label--xlg') _classNameXLG = false;

    // 字体前缀，默认 wtf
    @Input() thyIconPrefix: string;

    /**
     * 标签大小
     * @type sm | default | md | lg | xlg
     * @default default
     */
    @Input('thySize')
    set thySize(value: string) {
        this._classNameSM = value === 'sm';
        this._classNameDM = value === 'md';
        this._classNameLG = value === 'lg';
        this._classNameXLG = value === 'xlg';
    }

    private nativeElement: HTMLElement;

    private _typeClassNames: string[] = [];

    private _labelClass?: string;

    private _type?: string;

    private _labelType?: string;

    private _icon: string;

    public beforeIconName: string;

    public beforeIconClass: string[];

    public afterIconName: string;

    public afterIconClass: string[];

    public _color?: string;

    public _backgroundOpacity?: number = 0.1;

    private hostRenderer = useHostRenderer();

    /**
     * 标签支持移除操作
     */
    @Output() thyOnRemove: EventEmitter<any> = new EventEmitter<any>();

    constructor(private el: ElementRef) {
        this.nativeElement = this.el.nativeElement;
    }

    /**
     * 标签是否支持鼠标滑过有效果，一般在标签有操作时使用
     * @default false
     */
    @Input('thyHasHover')
    set thyHasHover(value: string) {
        this._thyHasHover = coerceBooleanProperty(value);
    }

    /**
     * 标签的类型
     * @type default | primary | success | info | warning | danger | success | emboss-default | emboss-primary | emboss-warning | emboss-danger | outline
     */
    @Input()
    set thyLabel(value: ThyLabelType) {
        this._type = value;
        this._setClassesByType();
    }

    /**
     * 标签支持自定义颜色，需要与`thyLabel`属性同时使用
     */
    @Input()
    set thyLabelColor(color: string) {
        this._color = color;
        this._setLabelCustomColor();
    }

    /**
     * 标签支持自定义背景颜色透明度，配合`thyLabelColor`使用，范围为：0～1
     * @default 0.1
     */
    @Input()
    set thyBackgroundOpacity(opacity: number) {
        if (opacity && opacity > 0 && this._backgroundOpacity !== opacity) {
            this._backgroundOpacity = opacity;
            this._setLabelCustomColor();
        }
    }

    /**
     * 标签状态类型
     * @type state | pill
     * @default state
     */
    @Input()
    set thyLabelType(labelType: string) {
        this._labelType = labelType;
        this._setClassesByType();
    }

    /**
     * 标签支持在显示文案前添加图标
     */
    @Input()
    set thyBeforeIcon(icon: string) {
        this._icon = icon;
        if (this._icon) {
            if (this._icon.includes('wtf')) {
                const iconPrefix = this.thyIconPrefix || 'wtf';
                this.beforeIconClass = [iconPrefix, `${this._icon}`];
            } else {
                this.beforeIconName = `${this._icon}`;
            }
        } else {
            this.beforeIconClass = null;
            this.beforeIconName = null;
        }
    }

    /**
     * 标签支持在显示文案后添加图标
     */
    @Input()
    set thyAfterIcon(icon: string) {
        this._icon = icon;
        if (this._icon) {
            if (this._icon.includes('wtf')) {
                const iconPrefix = this.thyIconPrefix || 'wtf';
                this.afterIconClass = [iconPrefix, `${this._icon}`];
            } else {
                this.afterIconName = `${this._icon}`;
            }
        } else {
            this.afterIconClass = null;
            this.afterIconName = null;
        }
    }

    private _setClassesByType() {
        let classNames: string[] = null;
        if (labelTypeClassesMap[this._type]) {
            classNames = labelTypeClassesMap[this._type];
        } else {
            classNames = ['thy-label'];
            classNames.push(`thy-label-${this._type}`);
        }
        if (this._labelType) {
            classNames = [...classNames, `thy-label-${this._labelType}`];
        }
        // remove old classes
        this._typeClassNames.forEach(className => {
            this._removeClass(className);
        });
        // add new classes
        this._typeClassNames = classNames;
        this._typeClassNames.forEach(className => {
            this._addClass(className);
        });
    }

    private _setLabelCustomColor() {
        if (this._color) {
            if (this._type.indexOf('emboss') > -1) {
                if (this._type === 'emboss-status') {
                    this.el.nativeElement.style.color = '#333';
                } else {
                    this.el.nativeElement.style.color = this._color;
                }
                this.el.nativeElement.style.backgroundColor = helpers.hexToRgb(this._color, this._backgroundOpacity);
            } else if (this._type.indexOf('outline') > -1) {
                this.el.nativeElement.style.color = this._color;
                this.el.nativeElement.style.borderColor = this._color;
            } else {
                this.el.nativeElement.style.backgroundColor = this._color;
            }
        }
    }

    private _addClass(className: string) {
        this.hostRenderer.addClass(className);
    }

    private _removeClass(className: string) {
        this.hostRenderer.removeClass(className);
    }

    remove($event: Event) {
        this.thyOnRemove.emit($event);
    }
}
