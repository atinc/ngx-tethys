import { Component, ElementRef, HostBinding, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { InputBoolean, UpdateHostClassService } from 'ngx-tethys/core';
import { coerceBooleanProperty } from 'ngx-tethys/util';

const badgeMutexTypes = ['thy-badge-count', 'thy-badge-dot', 'thy-badge-hollow'];
const BadgeMutexTheme = ['thy-badge-primary', 'thy-badge-warning', 'thy-badge-danger', 'thy-badge-secondary'];
const BadgeMutexSize = ['thy-badge-lg', 'thy-badge-sm'];

/**
 * 徽标组件，支持组件`thy-badge`和`thyBadge`指令两种使用方式
 */
@Component({
    selector: 'thy-badge,[thyBadge]',
    templateUrl: './badge.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UpdateHostClassService]
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
        'thy-badge-sup': true
    };

    st: {
        value: number | string;
        isValueOfString: boolean;
        isSetValue: boolean;
        isValueKeepShow: boolean;
        max: {
            is: boolean;
            value: number;
        };
        isElement: boolean;
        isSup: boolean;
        isShowBadge: boolean;
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
        isShowBadge: true
    };

    public textColor: string;

    public backgroundColor: string;

    constructor(private elementRef: ElementRef) {
        this.nativeElement = this.elementRef.nativeElement;
        this.st.isElement = this.nativeElement.localName === 'thy-badge';
    }

    @HostBinding('class.thy-badge-container') containerClassName = true;

    /**
     * 徽标类型, 类型为 'primary' | 'danger' | 'warning' | 'secondary'
     */
    @Input()
    set thyType(value: string) {
        this.resetBadgeClassNameMap(BadgeMutexTheme);
        switch (value) {
            case 'danger':
                this.badgeClassNameMap['thy-badge-danger'] = true;
                break;
            case 'primary':
                this.badgeClassNameMap['thy-badge-primary'] = true;
                break;
            case 'warning':
                this.badgeClassNameMap['thy-badge-warning'] = true;
                break;
            case 'secondary':
                this.badgeClassNameMap['thy-badge-secondary'] = true;
                break;
            default:
                this.badgeClassNameMap['thy-badge-danger'] = true;
                break;
        }
        if (this._initialized) {
            this.combineBadgeClassName();
        }
    }

    /**
     * 徽标内容数字
     */
    @Input()
    set thyCount(value: number) {
        this.st.value = value;
        this.st.isSetValue = true;
        if (this._initialized) {
            this.combineBadgeDisplayContent();
            this.combineBadgeClassName();
        }
    }

    /**
     * 徽标内容文本
     */
    @Input()
    set thyContent(value: string) {
        this.st.value = value;
        this.st.isValueOfString = true;
        this.st.isSetValue = true;
        if (this._initialized) {
            this.combineBadgeDisplayContent();
            this.combineBadgeClassName();
        }
    }

    /**
     * 已废弃，徽标内容文本，命名错误，请使用 thyContent
     * @deprecated
     */
    @Input()
    set thyContext(value: string) {
        this.thyContent = value;
    }

    /**
     * 徽标显示的最大值, 与 thyCount 一起使用,thyCount 超过了 thyMaxCount 设置的值时，徽标内容为 thyMaxCount+
     */
    @Input()
    set thyMaxCount(value: number) {
        this.st.max.is = true;
        this.st.max.value = value;
        if (this._initialized) {
            this.combineBadgeDisplayContent();
            this.combineBadgeClassName();
        }
    }

    /**
     * 徽标显示的大小，分别为 `sm` | `md` | `lg`
     * @default md
     */
    @Input()
    set thySize(value: string) {
        this.resetBadgeClassNameMap(BadgeMutexSize);
        switch (value) {
            case 'lg':
                this.badgeClassNameMap['thy-badge-lg'] = true;
                break;
            case 'sm':
                this.badgeClassNameMap['thy-badge-sm'] = true;
                break;
        }
        if (this._initialized) {
            this.combineBadgeClassName();
        }
    }

    /**
     * 已废弃，徽标是一个实心点，已经被废弃
     * @default md
     */
    @Input()
    set thyIsDot(value: boolean) {
        this.resetBadgeClassNameMap(badgeMutexTypes);
        this.badgeClassNameMap['thy-badge-dot'] = coerceBooleanProperty(value);
        if (this._initialized) {
            this.combineBadgeClassName();
        }
    }

    /**
     * 已废弃，徽标是一个空心点，
     */
    @Input()
    set thyIsHollow(value: boolean) {
        this.resetBadgeClassNameMap(badgeMutexTypes);
        this.badgeClassNameMap['thy-badge-hollow'] = coerceBooleanProperty(value);
        if (this._initialized) {
            this.combineBadgeClassName();
        }
    }

    /**
     * thyCount 为 0 时，强制显示数字 0，默认不显示
     */
    @Input()
    set thyKeepShow(value: boolean) {
        this.st.isValueKeepShow = coerceBooleanProperty(value);
        if (this._initialized) {
            this.combineBadgeDisplayContent();
        }
    }

    /**
     * 设置徽标字体的颜色
     */
    @Input()
    set thyTextColor(value: string) {
        this.textColor = value;
    }

    /**
     * 设置徽标的背景颜色
     */
    @Input()
    set thyBackgroundColor(value: string) {
        this.backgroundColor = value;
        this.resetBadgeClassNameMap(BadgeMutexTheme);
    }

    ngOnInit() {
        let childNodeCount = 0;
        this.nativeElement.childNodes.forEach((n: HTMLElement) => {
            if (['#comment'].indexOf(n.nodeName) < 0) {
                childNodeCount++;
            }
        });
        this.st.isSup = childNodeCount > 0;

        this.combineBadgeClassName();

        if (this.st.isSetValue) {
            this.combineBadgeDisplayContent();
        }

        this._initialized = true;
    }

    private combineBadgeClassName() {
        this.badgeClassNameMap['thy-badge-sup'] = this.st.isSup;

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
        this.displayContent = this.st.value as string;
        if (this.st.value && this.st.max.is && this.st.value > this.st.max.value) {
            this.displayContent = `${this.st.max.value}+`;
        }

        if (!this.st.value && !this.st.isValueKeepShow) {
            this.st.isShowBadge = false;
        } else {
            this.st.isShowBadge = true;
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
