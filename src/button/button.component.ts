import { InputBoolean, UpdateHostClassService } from 'ngx-tethys/core';
import { coerceBooleanProperty, warnDeprecation } from 'ngx-tethys/util';

import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';

export type ThyButtonType = 'primary' | 'secondary' | 'info' | 'outline-primary' | 'outline-default' | 'danger' | 'link' | 'link-secondary';

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

@Component({
    selector: 'thy-button,[thy-button],[thyButton]',
    templateUrl: './button.component.html',
    providers: [UpdateHostClassService],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'btn'
    }
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

    // 圆角方形
    _isRadiusSquare = false;

    iconClass: string[];

    svgIconName: string;

    @Input()
    set thyButton(value: ThyButtonType) {
        this.setBtnType(value);
    }

    @Input()
    set thyType(value: ThyButtonType) {
        this.setBtnType(value);
    }

    @Input()
    set thyLoading(value: boolean) {
        const newLoading = coerceBooleanProperty(value);
        // from false to true
        if (!this._loading && newLoading) {
            this._loading = newLoading;
            this._originalText = this._nativeElement.innerText;
            this.setLoadingStatus();
        } else {
            this._loading = newLoading;
            this.setLoadingStatus();
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
            this.updateClasses();
        }
    }

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

    @Input()
    set thySquare(value: boolean) {
        warnDeprecation(`The thyButton's property thySquare is deprecated, the default is already square.`);
        this._isRadiusSquare = coerceBooleanProperty(value);
    }

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

    private setLoadingStatus() {
        // let disabled = false;
        let innerText: string;
        if (this._loading) {
            // disabled = true;
            innerText = this._loadingText ? this._loadingText : null;
        } else {
            // disabled = false;
            innerText = this._originalText ? this._originalText : null;
        }
        // this.renderer.setProperty(this._nativeElement, 'disabled', disabled);
        this.updateClasses();
        if (innerText) {
            this.renderer.setProperty(this._nativeElement, 'innerText', innerText);
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
        if (this._icon) {
            classNames.push('btn-has-icon');
        }
        if (this._isRadiusSquare) {
            classNames.push('btn-square');
        }
        if (this._loading) {
            classNames.push('loading');
        }
        this.updateHostClassService.updateClass(classNames);
    }

    constructor(private elementRef: ElementRef, private renderer: Renderer2, private updateHostClassService: UpdateHostClassService) {
        this._nativeElement = this.elementRef.nativeElement;
        this.updateHostClassService.initializeElement(this._nativeElement);
    }

    ngOnInit() {
        this.updateClasses();
        this._initialized = true;
    }
}
