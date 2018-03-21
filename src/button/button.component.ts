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

    private classNames: string[] = [];

    private _originalText: string;

    private _type: string;

    private _loading: boolean;

    private _loadingText: string;

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
            console.log(`button type (${this._type}) is not support`);
            classNames = ['btn'];
            classNames.push(`btn-${this._type}`);
        }
        this.classNames.forEach(className => {
            this.renderer.removeClass(this.nativeElement, className);
        });
        this.classNames = classNames;
        this.classNames.forEach((className) => {
            this.renderer.addClass(this.nativeElement, className);
        });
    }

    constructor(private elementRef: ElementRef, private renderer: Renderer2) {
        this.nativeElement = this.elementRef.nativeElement;
        this.nativeElement = this.elementRef.nativeElement;
    }

    ngAfterContentInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
    }
}
