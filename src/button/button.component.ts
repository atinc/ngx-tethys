import { Component, Directive, Input, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';
import { AfterContentInit, OnChanges, OnInit } from '@angular/core';
import { inputValueToBoolean, isUndefined } from '../util/helpers';
import { UpdateHostClassService } from '../shared';

export type ThyButtonType = 'primary' | 'secondary' | 'outline-primary' | 'outline-default' | 'danger';

const btnTypeClassesMap: any = {
    'primary': ['btn', 'btn-primary'],
    'secondary': ['btn', 'btn-primary', 'btn-md'],
    'outline-primary': ['btn', 'btn-outline-primary'],
    'outline-default': ['btn', 'btn-outline-default'],
    'danger': ['btn', 'btn-danger'],
    'link': ['btn', 'btn-link'], // 链接按钮
    'link-secondary': ['btn', 'btn-link', 'btn-link-default'] // 幽灵链接按钮
};

@Component({
    selector: '[thyButton]',
    templateUrl: './button.component.html',
    providers: [
        UpdateHostClassService
    ],
    encapsulation: ViewEncapsulation.None
})
export class ThyButtonComponent implements OnInit {

    private _nativeElement: any;

    private _initialized = false;

    private _originalText: string;

    private _type: string;

    private _size: string;

    private _icon: string;

    private _loading: boolean;

    private _loadingText: string;

    public iconClass: any;

    @Input()
    set thyButton(value: ThyButtonType) {
        this._type = value;
        if (this._initialized) {
            this._setClasses();
        }
    }

    @Input()
    set thyType(value: ThyButtonType) {
        this._type = value;
        if (this._initialized) {
            this._setClasses();
        }
    }

    @Input()
    set thyLoading(value: boolean) {
        const newLoading = inputValueToBoolean(value);
        // from false to true
        if (!this._loading && newLoading) {
            this._loading = newLoading;
            this._originalText = this._nativeElement.innerText;
            this._setLoadingStatus();
        } else {
            this._loading = newLoading;
            this._setLoadingStatus();
        }
    }

    @Input()
    set thyLoadingText(value: string) {
        if (this._loadingText !== value) {
            this._loadingText = value;
            if (this._loading) {
                this.renderer.setProperty(this._nativeElement, 'innerText', this._loadingText);
            }
        }
    }

    @Input()
    set thySize(size: string) {
        this._size = size;
        if (this._initialized) {
            this._setClasses();
        }
    }

    // 字体前缀，默认 wtf
    @Input() thyIconPrefix: string;

    @Input()
    set thyIcon(icon: string) {
        this._icon = icon;
        if (this._icon) {
            const btnIconPrefix = this.thyIconPrefix || 'wtf';
            this.iconClass = [btnIconPrefix, `${this._icon}`];
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
        this.renderer.setProperty(this._nativeElement, 'disabled', disabled);
        if (innerText) {
            this.renderer.setProperty(this._nativeElement, 'innerText', innerText);
        }
    }

    private _setClasses() {
        let classNames: string[] = null;
        if (btnTypeClassesMap[this._type]) {
            classNames = [...btnTypeClassesMap[this._type]];
        } else {
            classNames = ['btn'];
            if (this._type) {
                classNames.push(`btn-${this._type}`);
            }
            //console.error(`button type (${this._type}) is not support`);
        }
        if (this._size) {
            classNames.push(`btn-${this._size}`);
        }
        this.updateHostClassService.updateClass(classNames);
    }

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2,
        private updateHostClassService: UpdateHostClassService
    ) {
        this._nativeElement = this.elementRef.nativeElement;
        this.updateHostClassService.initializeElement(this._nativeElement);
    }

    ngOnInit() {
        this._setClasses();
        this._initialized = true;
    }
}
