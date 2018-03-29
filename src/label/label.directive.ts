import { Directive, ElementRef, Renderer2, Input } from '@angular/core';

export type ThyLabelType = 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger';

const labelTypeClassesMap: any = {
    'default': ['label', 'label-default'],
    'primary': ['label', 'label-primary'],
    'success': ['label', 'label-success'],
    'info': ['label', 'label-info'],
    'warning': ['label', 'label-warning'],
    'danger': ['label', 'label-danger']
};

@Directive({
    selector: '[thyLabel]',
})
export class ThyLabelDirective {

    private nativeElement: any;
    private _typeClassNames: string[] = [];
    private _labelClass?: string;
    private _color?: string;
    private _type?: string;


    constructor(private el: ElementRef, private renderer: Renderer2) {
        this.nativeElement = this.el.nativeElement;
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

    private _setClassesByType() {
        let classNames: string[] = null;
        if (labelTypeClassesMap[this._type]) {
            classNames = labelTypeClassesMap[this._type];
        } else {
            classNames = ['label'];
            classNames.push(`label-${this._type}`);
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
}
