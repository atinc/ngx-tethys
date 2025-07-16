import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { useHostRenderer } from '@tethys/cdk/dom';
import { ThyIcon } from 'ngx-tethys/icon';
import { coerceBooleanProperty } from 'ngx-tethys/util';

export type ThyButtonIconShape = '' | 'circle-dashed' | 'circle-solid' | 'circle-thick-dashed' | 'circle-thick-solid' | 'self-icon';

const sizeClassesMap = {
    lg: ['btn-icon-lg'],
    md: ['btn-icon-md'],
    sm: ['btn-icon-sm'],
    xs: ['btn-icon-xs']
};

const shapeClassesMap = {
    'circle-dashed': ['btn-icon-circle', 'circle-dashed'],
    'circle-solid': ['btn-icon-circle', 'circle-solid'],
    'circle-thick-dashed': ['btn-icon-circle', 'circle-dashed', 'border-thick'],
    'circle-thick-solid': ['btn-icon-circle', 'circle-solid', 'border-thick'],
    'self-icon': ['btn-icon-self-circle']
};

const themeClassesMap: any = {
    'danger-weak': ['btn-icon-danger-weak']
};

/**
 * 操作按钮图标，支持`thy-button-icon`组件和`thyButtonIcon`指令两种形式
 * @name thy-button-icon,[thy-button-icon],[thyButtonIcon]
 * @order 20
 */
@Component({
    selector: 'thy-button-icon,[thy-button-icon],[thyButtonIcon]',
    templateUrl: './button-icon.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ThyIcon, NgClass]
})
export class ThyButtonIcon implements OnInit {
    /**
     * 大小
     * @type xs | sm | md | lg
     * @default 36px
     */
    @Input()
    set thySize(size: string) {
        this.size = size;
        this.setClasses();
    }

    /**
     * 图标, 和`thyButtonIcon`相同，当使用`thy-button-icon`时，只能使用 thyIcon 设置图标
     */
    @Input()
    set thyIcon(icon: string) {
        this.setIconClass(icon);
    }

    /**
     * 图标按钮的图标
     */
    @Input()
    set thyButtonIcon(icon: string) {
        this.setIconClass(icon);
    }

    /**
     * 展示的形状，默认只显示字体图标图标，circle-dashed, circle-solid 展示成虚线,实线边框圆形图标, circle-thick-dashed, circle-thick-solid 边框加粗
     */
    @Input()
    set thyShape(value: ThyButtonIconShape) {
        this.shape = value;
        this.setClasses();
    }

    /**
     * 亮色，颜色更浅，适合左侧导航顶部的按钮
     * @default false
     */
    @Input({ transform: coerceBooleanProperty })
    set thyLight(value: boolean) {
        this._isLighted = value;
    }

    /**
     * 设置为选中状态
     * @default false
     */
    @Input({ transform: coerceBooleanProperty })
    set thyActive(value: boolean) {
        this._isActive = value;
    }

    /**
     * 按钮展示类型，默认图标移上去显示主色， danger-weak 鼠标移上去显示 danger 红色
     */
    @Input()
    set thyTheme(value: string) {
        this.theme = value;
        this.setClasses();
    }

    constructor() {}

    private initialized = false;

    private shape: ThyButtonIconShape;

    private size: string;

    private hostRenderer = useHostRenderer();

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
        const classes = this.size && this.size in sizeClassesMap ? [...sizeClassesMap[this.size as keyof typeof sizeClassesMap]] : [];
        if (this.shape && this.shape in shapeClassesMap) {
            shapeClassesMap[this.shape].forEach((className: string) => {
                classes.push(className);
            });
        }
        if (this.theme && this.theme in themeClassesMap) {
            themeClassesMap[this.theme].forEach((className: string) => {
                classes.push(className);
            });
        }
        this.hostRenderer.updateClass(classes);
    }

    ngOnInit() {
        this.setClasses(true);
        this.initialized = true;
    }
}
