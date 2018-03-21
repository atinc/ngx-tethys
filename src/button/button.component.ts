import { Component, Directive, Input, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';
import { AfterContentInit, OnChanges, SimpleChanges } from '@angular/core';
import { inputValueToBoolean, isUndefined } from '../util/helpers';


export type ThyButtonType = 'primary' | 'secondary' | 'outline-primary' | 'outline-default' | 'danger';

const btnTypeClassesMap: any = {
    'primary': ['btn', 'btn-primary'],
    'secondary': ['btn', 'btn-primary', 'btn-md'],
    'outline-primary': ['btn', 'btn-outline-primary'],
    'outline-default': ['btn', 'btn-outline-default'],
    'danger': ['btn', 'btn-danger']
};

@Component({
    selector: '[thyButton]',
    templateUrl: './button.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ThyButtonComponent implements AfterContentInit, OnChanges {

    private nativeElement: any;

    private _typeClassNames: string[] = [];

    private _originalText: string;

    private _type: string;

    private _size: string;

    private icon: string;

    private _loading: boolean;

    private _loadingText: string;

    public iconClass: any;

    @Input()
    set thyButton(value: ThyButtonType) {
        this._type = value;
        this._setClassesByType();
    }

    @Input()
    set btnType(value: ThyButtonType) {
        this._type = value;
        this._setClassesByType();
    }

    @Input()
    set btnLoading(value: boolean) {
        const newLoading = inputValueToBoolean(value);
        // from false to true
        if (!this._loading && newLoading) {
            this._loading = newLoading;
            this._originalText = this.nativeElement.innerText;
            this._setLoadingStatus();
        } else {
            this._loading = newLoading;
            this._setLoadingStatus();
        }
    }

    @Input()
    set btnLoadingText(value: string) {
        if (this._loadingText !== value) {
            this._loadingText = value;
            if (this._loading) {
                this.renderer.setProperty(this.nativeElement, 'innerText', this._loadingText);
            }
        }
    }

    @Input()
    set btnSize(size: string) {
        if (!isUndefined(size)) {
            if (this._size) {
                this.renderer.removeClass(this.nativeElement, `btn-${this._size}`);
            }
            this._size = size;
            this.renderer.addClass(this.nativeElement, `btn-${this._size}`);
        }
    }

    @Input() btnIconPrefix: string;

    @Input()
    set btnIcon(icon: string) {
        this.icon = icon;
        if (icon) {
            const btnIconPrefix = this.btnIconPrefix || 'wtf';
            this.iconClass = [btnIconPrefix, `${icon}`];
        } else {
            this.iconClass = null;
        }
    }

    private _setLoadingStatus() {
        let disabled = false;
        let innerText: string;
        if (this._loading) {
            disabled = true;
            innerText = this._loadingText ? this._loadingText : null;
        } else {
            disabled = false;
            innerText = this._originalText ? this._originalText : null;
        }
        this.renderer.setProperty(this.nativeElement, 'disabled', disabled);
        if (innerText) {
            this.renderer.setProperty(this.nativeElement, 'innerText', this._originalText);
        }
    }

    private _setClassesByType() {
        let classNames: string[] = null;
        if (btnTypeClassesMap[this._type]) {
            classNames = btnTypeClassesMap[this._type];
        } else {
            console.error(`button type (${this._type}) is not support`);
            classNames = ['btn'];
            classNames.push(`btn-${this._type}`);
        }
        // remove old classes
        this._typeClassNames.forEach(className => {
            this.renderer.removeClass(this.nativeElement, className);
        });
        // add new classes
        this._typeClassNames = classNames;
        this._typeClassNames.forEach((className) => {
            this.renderer.addClass(this.nativeElement, className);
        });
    }

    private _removeClass(className: string) {
        this.renderer.removeClass(this.nativeElement, className);
    }

    private _addClass(className: string) {
        this.renderer.addClass(this.nativeElement, className);
    }


    constructor(private elementRef: ElementRef, private renderer: Renderer2) {
        this.nativeElement = this.elementRef.nativeElement;
    }

    ngAfterContentInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
    }
}
