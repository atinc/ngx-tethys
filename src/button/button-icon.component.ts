import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit, ViewEncapsulation, computed, effect, input } from '@angular/core';
import { useHostRenderer } from '@tethys/cdk/dom';
import { ThyIcon } from 'ngx-tethys/icon';
import { coerceBooleanProperty, ThyBooleanInput } from 'ngx-tethys/util';

export type ThyButtonIconShape = '' | 'circle-dashed' | 'circle-solid' | 'circle-thick-dashed' | 'circle-thick-solid' | 'self-icon';

const sizeClassesMap: Record<string, string[]> = {
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
    host: {
        class: 'btn btn-icon',
        '[class.btn-icon-light]': 'thyLight()',
        '[class.btn-icon-active]': 'thyActive()'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ThyIcon, NgClass]
})
export class ThyButtonIcon {
    /**
     * 大小
     * @type xs | sm | md | lg
     * @default 36px
     */
    readonly thySize = input<string>();

    /**
     * 图标, 和`thyButtonIcon`相同，当使用`thy-button-icon`时，只能使用 thyIcon 设置图标
     */
    readonly thyIcon = input<string>();

    /**
     * 图标按钮的图标
     */
    readonly thyButtonIcon = input<string>();

    /**
     * 展示的形状，默认只显示字体图标图标，circle-dashed, circle-solid 展示成虚线,实线边框圆形图标, circle-thick-dashed, circle-thick-solid 边框加粗
     */
    readonly thyShape = input<ThyButtonIconShape>();

    /**
     * 亮色，颜色更浅，适合左侧导航顶部的按钮
     * @default false
     */
    readonly thyLight = input<boolean, ThyBooleanInput>(false, { transform: coerceBooleanProperty });

    /**
     * 设置为选中状态
     * @default false
     */
    readonly thyActive = input<boolean, ThyBooleanInput>(false, { transform: coerceBooleanProperty });

    /**
     * 按钮展示类型，默认图标移上去显示主色， danger-weak 鼠标移上去显示 danger 红色
     */
    readonly thyTheme = input<string>();

    readonly thyColor = input<string>();

    constructor() {
        effect(() => {
            this.setClasses();
        });

        effect(() => {
            console.log(this.iconClasses(), this.svgIconName(), this.isWtfIcon());
        });
    }

    private hostRenderer = useHostRenderer();

    private icon = computed(() => {
        return this.thyButtonIcon() || this.thyIcon();
    });

    private isWtfIcon = computed(() => {
        const icon = this.icon();
        return icon && icon.includes('wtf');
    });

    protected svgIconName = computed(() => {
        if (!this.isWtfIcon()) {
            return this.icon();
        }
        return null;
    });

    protected iconClasses = computed<string[]>(() => {
        const icon = this.icon();
        if (this.isWtfIcon()) {
            const classes = icon.split(' ');
            if (classes.length === 1) {
                classes.unshift('wtf');
            }
            return classes;
        }
        return null;
    });

    private setClasses() {
        const size = this.thySize();
        const shape = this.thyShape();
        const theme = this.thyTheme();
        const classes = sizeClassesMap[size] ? [...sizeClassesMap[size]] : [];
        if (shape && shapeClassesMap[shape]) {
            shapeClassesMap[shape].forEach((className: string) => {
                classes.push(className);
            });
        }
        if (theme && themeClassesMap[theme]) {
            themeClassesMap[theme].forEach((className: string) => {
                classes.push(className);
            });
        }
        this.hostRenderer.updateClass(classes);
    }
}
