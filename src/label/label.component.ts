import { Component, ElementRef, Renderer2, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { inputValueToBoolean } from '../util/helpers';

export type ThyLabelType = 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger';

const labelTypeClassesMap: any = {
    'default': ['label', 'label-default'],
    'primary': ['label', 'label-primary'],
    'success': ['label', 'label-success'],
    'info': ['label', 'label-info'],
    'warning': ['label', 'label-warning'],
    'danger': ['label', 'label-danger']
};

@Component({
    selector: '[thyLabel]',
    templateUrl: './label.component.html'
})
export class ThyLabelComponent {

    @HostBinding('class.label-has-hover') _thyHasHover = false;

    private nativeElement: any;

    private _typeClassNames: string[] = [];

    private _labelClass?: string;

    private _color?: string;

    private _type?: string;

    private _labelType?: string;

    private _icon: string;

    public beforeIconClass: any;

    public afterIconClass: any;

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

    // 字体前缀，默认 wtf
    @Input() thyIconPrefix: string;

    @Input()
    set thyBeforeIcon(icon: string) {
        this._icon = icon;
        if (this._icon) {
            const iconPrefix = this.thyIconPrefix || 'wtf';
            this.beforeIconClass = [iconPrefix, `${this._icon}`];
        } else {
            this.beforeIconClass = null;
        }
    }

    @Input()
    set thyAfterIcon(icon: string) {
        this._icon = icon;
        if (this._icon) {
            const iconPrefix = this.thyIconPrefix || 'wtf';
            this.afterIconClass = [iconPrefix, `${this._icon}`];
        } else {
            this.afterIconClass = null;
        }
    }

    private _setClassesByType() {
        let classNames: string[] = null;
        if (labelTypeClassesMap[this._type]) {
            classNames = labelTypeClassesMap[this._type];
        } else {
            classNames = ['label'];
            classNames.push(`label-${this._type}`);
        }
        if (this._labelType) {
            classNames.push(`label-${this._labelType}`);
        }
        // remove old classes
        this._typeClassNames.forEach(className => {
            this._removeClass(className);
        });
        // add new classes
        this._typeClassNames = classNames;
        this._typeClassNames.forEach((className) => {
            this._addClass(className);
        });
    }

    private _setLabelCustomColor() {
        if (this._color) {
            this.el.nativeElement.style.backgroundColor = this._color;
        }
    }

    private _addClass(className: string) {
        this.renderer.addClass(this.nativeElement, className);
    }

    private _removeClass(className: string) {
        this.renderer.removeClass(this.nativeElement, className);
    }

    remove() {
        alert('delete success');
    }
}
