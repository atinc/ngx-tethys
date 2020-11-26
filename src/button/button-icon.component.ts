import { Component, Directive, HostBinding, Input, ElementRef, Renderer2, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { AfterContentInit, OnChanges, OnInit } from '@angular/core';
import { coerceBooleanProperty, isUndefined } from 'ngx-tethys/util/helpers';
import { UpdateHostClassService } from 'ngx-tethys/shared';

export type IconShape = '' | 'dashed' | 'solid';

const sizeClassesMap: any = {
    lg: ['btn-icon-lg'],
    sm: ['btn-icon-sm'],
    xs: ['btn-icon-xs']
};

const shapeClassesMap: any = {
    'circle-dashed': ['btn-icon-circle', 'circle-dashed'],
    'circle-solid': ['btn-icon-circle', 'circle-solid'],
    'circle-thick-dashed': ['btn-icon-circle', 'circle-dashed', 'border-thick'],
    'circle-thick-solid': ['btn-icon-circle', 'circle-solid', 'border-thick'],
    'self-icon': ['btn-icon-self-circle']
};

const themeClassesMap: any = {
    'danger-weak': ['btn-icon-danger-weak']
};

@Component({
    selector: '[thy-button-icon],[thyButtonIcon]',
    templateUrl: './button-icon.component.html',
    providers: [UpdateHostClassService],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyButtonIconComponent implements OnInit {
    @Input()
    set thySize(size: string) {
        this.size = size;
        this.setClasses();
    }

    // 字体前缀，默认 wtf
    @Input()
    set thyIcon(icon: string) {
        this.setIconClass(icon);
    }

    @Input()
    set thyButtonIcon(icon: string) {
        this.setIconClass(icon);
    }

    @Input()
    set thyShape(value: IconShape) {
        this.shape = value;
        this.setClasses();
    }

    @Input()
    set thyLight(value: boolean) {
        this._isLighted = coerceBooleanProperty(value);
    }

    @Input()
    set thyActive(value: boolean) {
        this._isActive = coerceBooleanProperty(value);
    }

    @Input()
    set thyTheme(value: string) {
        this.theme = value;
        this.setClasses();
    }

    constructor(elementRef: ElementRef, private updateHostClassService: UpdateHostClassService) {
        this.updateHostClassService.initializeElement(elementRef.nativeElement);
    }
    private initialized = false;

    private shape: IconShape;

    private size: string;

    iconPrefix = 'wtf';

    iconClasses: string[];

    icon: string;

    theme: string;

    svgIconName: string;

    @HostBinding('class.btn') _isBtn = true;
    @HostBinding('class.btn-icon') _isBtnIcon = true;
    @HostBinding('class.btn-icon-light') _isLighted = false;
    @HostBinding('class.btn-icon-active') _isActive = false;

    @Input() thyColor: string;

    private setIconClass(icon: string) {
        if (icon) {
            if (icon.includes('wtf')) {
                const classes = icon.split(' ');
                if (classes.length === 1) {
                    classes.unshift('wtf');
                }
                this.iconClasses = classes;
                this.svgIconName = null;
            } else {
                this.svgIconName = icon;
            }
        } else {
            this.iconClasses = null;
            this.svgIconName = null;
        }
    }

    private setClasses(first = false) {
        // 设置样式判断是否已经初始化，未初始化直接返回，除非是初次调用
        // 只有 ngOnInit 调用会传入 first = true
        if (!first && !this.initialized) {
            return;
        }
        const classes = sizeClassesMap[this.size] ? [...sizeClassesMap[this.size]] : [];
        if (this.shape && shapeClassesMap[this.shape]) {
            shapeClassesMap[this.shape].forEach((className: string) => {
                classes.push(className);
            });
        }
        if (this.theme && themeClassesMap[this.theme]) {
            themeClassesMap[this.theme].forEach((className: string) => {
                classes.push(className);
            });
        }
        this.updateHostClassService.updateClass(classes);
    }

    ngOnInit() {
        this.setClasses(true);
        this.initialized = true;
    }
}
