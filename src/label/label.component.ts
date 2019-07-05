import { Component, ElementRef, Renderer2, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { inputValueToBoolean } from '../util/helpers';
import { helpers } from '../util';

export type ThyLabelType = 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger';

const labelTypeClassesMap: any = {
    default: ['thy-label', 'thy-label-default'],
    primary: ['thy-label', 'thy-label-primary'],
    success: ['thy-label', 'thy-label-success'],
    info: ['thy-label', 'thy-label-info'],
    warning: ['thy-label', 'thy-label-warning'],
    danger: ['thy-label', 'thy-label-danger']
};
@Component({
    selector: '[thyLabel]',
    templateUrl: './label.component.html'
})
export class ThyLabelComponent {
    @HostBinding('class.label-has-hover') _thyHasHover = false;

    @HostBinding('class.thy-label--sm') _classNameSM = false;

    @HostBinding('class.thy-label--md') _classNameDM = false;

    @HostBinding('class.thy-label--lg') _classNameLG = false;

    // 字体前缀，默认 wtf
    @Input() thyIconPrefix: string;

    @Input('thySize')
    set thySize(value: string) {
        this._classNameSM = value === 'sm';
        this._classNameDM = value === 'md';
        this._classNameLG = value === 'lg';
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

    @Output() thyOnRemove: EventEmitter<any> = new EventEmitter<any>();

    constructor(private el: ElementRef, private renderer: Renderer2) {
        this.nativeElement = this.el.nativeElement;
    }

    @Input('thyHasHover')
    set thyHasHover(value: string) {
        this._thyHasHover = inputValueToBoolean(value);
    }

    @Input()
    set thyLabel(value: ThyLabelType) {
        this._type = value;
        this._setClassesByType();
    }

    @Input()
    set thyLabelColor(color: string) {
        this._color = color;
        this._setLabelCustomColor();
    }

    @Input()
    set thyLabelType(labelType: string) {
        this._labelType = labelType;
        this._setClassesByType();
    }

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
                this.el.nativeElement.style.backgroundColor = helpers.hexToRgb(this._color, 0.1);
            } else if (this._type.indexOf('outline') > -1) {
                this.el.nativeElement.style.color = this._color;
                this.el.nativeElement.style.borderColor = this._color;
            } else {
                this.el.nativeElement.style.backgroundColor = this._color;
            }
        }
    }

    private _addClass(className: string) {
        this.renderer.addClass(this.nativeElement, className);
    }

    private _removeClass(className: string) {
        this.renderer.removeClass(this.nativeElement, className);
    }

    remove() {
        this.thyOnRemove.emit();
    }
}
