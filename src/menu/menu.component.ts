import { Component, computed, input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { coerceBooleanProperty } from 'ngx-tethys/util';

export type ThyMenuVariant = 'compact' | 'loose';

/** @deprecated 注意：ThyMenuTheme 后续只支持 'light' | 'dark'。'compact' | 'loose' 将废弃，请使用 ThyMenuVariant */
export type ThyMenuTheme = 'compact' | 'loose' | 'light' | 'dark';

/**
 * 菜单组件
 * @name thy-menu,[thy-menu],[thyMenu]
 * @order 5
 */
@Component({
    selector: 'thy-menu,[thy-menu],[thyMenu]',
    templateUrl: './menu.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    host: {
        class: 'thy-menu',
        '[class.thy-menu-collapsed]': 'thyCollapsed()',
        '[class.thy-menu-theme-loose]': 'variant() === "loose"',
        '[class.thy-menu-theme-dark]': 'theme() === "dark"'
    }
})
export class ThyMenu implements OnInit {
    /**
     * 菜单形态
     * @type compact | loose
     * @default compact
     */
    readonly thyVariant = input<ThyMenuVariant, ThyMenuVariant>('compact', {
        transform: (value: ThyMenuVariant) => value || 'compact'
    });

    /**
     * 菜单主题
     * @type light | dark
     * @default light
     * @deprecated 注意：thyTheme 后续只支持传 'light' | 'dark'。'compact' | 'loose' 将废弃，请使用 ThyMenuVariant
     */
    readonly thyTheme = input<ThyMenuTheme, ThyMenuTheme>('light', {
        transform: (value: ThyMenuTheme) => {
            if (value === 'compact' || value === 'loose') {
                return 'light';
            }
            return value || 'light';
        }
    });

    /**
     * 是否收起
     */
    readonly thyCollapsed = input(false, { transform: coerceBooleanProperty });

    protected variant = computed(() => {
        if (this.thyVariant()) {
            return this.thyVariant();
        }

        // 兼容旧参数值
        const legacyTheme = this.thyTheme();
        if (legacyTheme === 'compact' || legacyTheme === 'loose') {
            return legacyTheme;
        }

        return 'compact';
    });

    protected theme = computed(() => {
        // 兼容旧参数值
        const legacyTheme = this.thyTheme();
        if (legacyTheme === 'dark' || legacyTheme === 'light') {
            return legacyTheme;
        }

        return 'light';
    });

    constructor() {}

    ngOnInit(): void {}
}
