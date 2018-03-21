import { Component, Directive, Input, ElementRef, Renderer2 } from '@angular/core';
import { AfterContentInit, OnChanges, SimpleChanges } from '@angular/core';
import { inputValueToBoolean } from '../util/helpers';


export type ThyButtonType = 'primary' | 'secondary' | 'outline-primary' | 'outline-default' | 'danger';

const btnTypeClassesMap = {
    'primary': ['btn', 'btn-primary'],
    'secondary': ['btn', 'btn-primary', 'btn-md'],
    'outline-primary': ['btn', 'btn-outline-primary'],
    'outline-default': ['btn', 'btn-outline-default'],
    'danger': ['btn', 'btn-danger']
};

@Component({
    selector: '[thyButton]',
    templateUrl: './button.component.html'
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
    }

    @Input()
    set btnType(value: ThyButtonType) {
        this._type = value;
    }

    @Input()
    set btnLoading(value: boolean) {
        const newLoading = inputValueToBoolean(value);
        // if(this._loading)
        // this.setLoadingStatus();
    }

    @Input()
    set btnLoadingText(value: string) {
        if(this._loadingText !== value){

        }
        this._loadingText = value;
        // this.setLoadingStatus();
    }

    constructor(private elementRef: ElementRef, private renderer: Renderer2) {
        this.nativeElement = this.elementRef.nativeElement;
        this.nativeElement = this.elementRef.nativeElement;
    }

    private setLoadingStatus() {
        if (this._loading) {
            // classNames.push('disabled');
            this.renderer.setProperty(this.nativeElement, 'disabled', true);
            if (this._loadingText) {
                this.renderer.setProperty(this.nativeElement, 'innerText', this._loadingText);
            }
        } else {
            this.renderer.setProperty(this.nativeElement, 'disabled', false);
            if (this._originalText) {
                this.renderer.setProperty(this.nativeElement, 'innerText', this._originalText);
            }
        }
    }

    setClassesByType() {
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

    ngAfterContentInit() {
        this.setClassesByType();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['btnLoading'] && !changes['btnLoading'].firstChange) {
            if (this._loading) {
                this._originalText = this.nativeElement.innerText;
            }
            this.setLoadingStatus();
        }

        if (changes['btnLoadingText'] && !changes['btnLoadingText'].firstChange) {
            if (this._loading) {
                this.renderer.setProperty(this.nativeElement, 'innerText', this._loadingText);
            }
        }
    }
}
