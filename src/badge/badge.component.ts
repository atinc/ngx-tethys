import { Component, Input, HostBinding, ElementRef, OnInit, ViewChild } from '@angular/core';
import { inputValueToBoolean } from '../util/helpers';

const BadgeMutexType = ['thy-badge-count', 'thy-badge-dot', 'thy-badge-hollow'];
const BadgeMutexTheme = ['thy-badge-primary', 'thy-badge-warning', 'thy-badge-danger', 'thy-badge-secondary'];
const BadgeMutexSize = ['thy-badge-lg', 'thy-badge-sm'];

@Component({
    selector: 'thy-badge,[thyBadge]',
    templateUrl: './badge.component.html',
})

export class ThyBadgeComponent implements OnInit {

    displayContent = '';

    badgeClassName = '';

    private nativeElement: any;

    private _initialized = false;

    private badgeClassNameMap = {
        'thy-badge-count': true,
        'thy-badge-dot': false,
        'thy-badge-hollow': false,
        'thy-badge-lg': false,
        'thy-badge-sm': false,
        'thy-badge-danger': true,
        'thy-badge-primary': false,
        'thy-badge-warning': false,
        'thy-badge-secondary': false,
        'thy-badge-sup': true,
        'thy-badge-multiple-words': false,
    };

    st:
        {
            value: number | string | any,
            isValueOfString: boolean,
            isSetValue: boolean,
            isValueKeepShow: boolean,
            max: {
                is: boolean,
                value: number
            },
            isElement: boolean,
            isSup: boolean,
            isShowBadge: boolean,
        } = {
            value: '',
            isValueOfString: false,
            isSetValue: false,
            isValueKeepShow: false,
            max: {
                is: false,
                value: null
            },
            isElement: false,
            isSup: false,
            isShowBadge: true,
        };

    constructor(
        private elementRef: ElementRef,
    ) {
        this.nativeElement = this.elementRef.nativeElement;
        this.st.isElement = this.nativeElement.localName === 'thy-badge';
    }

    @HostBinding('class.thy-badge-container') containerClassName = true;

    @Input()
    set thyType(value: string) {
        this.resetBadgeClassNameMap(BadgeMutexTheme);
        switch (value) {
            case 'danger': this.badgeClassNameMap['thy-badge-danger'] = true; break;
            case 'primary': this.badgeClassNameMap['thy-badge-primary'] = true; break;
            case 'warning': this.badgeClassNameMap['thy-badge-warning'] = true; break;
            case 'secondary': this.badgeClassNameMap['thy-badge-secondary'] = true; break;
            default: this.badgeClassNameMap['thy-badge-danger'] = true; break;
        }
        if (this._initialized) {
            this.combineBadgeClassName();
        }
    }

    @Input()
    set thyCount(value: number) {
        this.st.value = value;
        this.st.isSetValue = true;
        if (this._initialized) {
            this.combineBadgeDisplayContent();
            this.combineBadgeClassName();
        }
    }

    @Input()
    set thyContext(value: string) {
        this.st.value = value;
        this.st.isValueOfString = true;
        this.st.isSetValue = true;
        if (this._initialized) {
            this.combineBadgeDisplayContent();
            this.combineBadgeClassName();
        }
    }

    @Input()
    set thyMaxCount(value: number) {
        this.st.max.is = true;
        this.st.max.value = value;
        if (this._initialized) {
            this.combineBadgeDisplayContent();
            this.combineBadgeClassName();
        }
    }

    @Input()
    set thySize(value: string) {
        this.resetBadgeClassNameMap(BadgeMutexSize);
        switch (value) {
            case 'lg': this.badgeClassNameMap['thy-badge-lg'] = true; break;
            case 'sm': this.badgeClassNameMap['thy-badge-sm'] = true; break;
        }
        if (this._initialized) {
            this.combineBadgeClassName();
        }
    }

    @Input()
    set thyIsDot(value: boolean) {
        this.resetBadgeClassNameMap(BadgeMutexType);
        this.badgeClassNameMap['thy-badge-dot'] = inputValueToBoolean(value);
        if (this._initialized) {
            this.combineBadgeClassName();
        }
    }

    @Input()
    set thyIsHollow(value: boolean) {
        this.resetBadgeClassNameMap(BadgeMutexType);
        this.badgeClassNameMap['thy-badge-hollow'] = inputValueToBoolean(value);
        if (this._initialized) {
            this.combineBadgeClassName();
        }
    }

    @Input()
    set thyKeepShow(value: boolean) {
        this.st.isValueKeepShow = inputValueToBoolean(value);
        if (this._initialized) {
            this.combineBadgeDisplayContent();
        }
    }

    ngOnInit() {
        this.st.isSup = this.nativeElement.childNodes.length > 1;
        this.combineBadgeClassName();
        if (this.st.isSetValue) {
            this.combineBadgeDisplayContent();
        }
        this._initialized = true;
    }

    private combineBadgeClassName() {
        this.badgeClassNameMap['thy-badge-sup'] = this.st.isSup;
        this.explorationValueLength();

        const _badgeClassNames = [];
        for (const key in this.badgeClassNameMap) {
            if (this.badgeClassNameMap.hasOwnProperty(key)) {
                if (this.badgeClassNameMap[key]) {
                    _badgeClassNames.push(key);
                }
            }
        }
        this.badgeClassName = _badgeClassNames.join(' ');
    }

    private combineBadgeDisplayContent() {
        this.displayContent = this.st.value;
        if (this.st.value && this.st.max.is && (this.st.value > this.st.max.value)) {
            this.displayContent = `${this.st.max.value}+`;
        }

        if (!this.st.value && !this.st.isValueKeepShow) {
            this.st.isShowBadge = false;
        }
    }

    private explorationValueLength() {
        if (this.st.value && (this.st.value.toString().length > 1) && this.st.isSup) {
            this.badgeClassNameMap['thy-badge-multiple-words'] = true;
        }
    }

    private resetBadgeClassNameMap(mutexArray: any) {
        for (const key in this.badgeClassNameMap) {
            if (this.badgeClassNameMap.hasOwnProperty(key)) {
                if (mutexArray.includes(key)) {
                    this.badgeClassNameMap[key] = false;
                }
            }
        }
    }


}
