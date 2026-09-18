import {
    Component,
    InjectionToken,
    computed,
    TemplateRef,
    ViewEncapsulation,
    numberAttribute,
    inject,
    input,
    effect,
    Signal,
    ChangeDetectionStrategy
} from '@angular/core';
import { useHostRenderer } from '@tethys/cdk/dom';
import { ThyProgressColor, isProgressPresetColor } from './interfaces';
import { NgStyle } from '@angular/common';

export interface ThyParentProgress {
    readonly max: Signal<number>;
    readonly bars: Signal<readonly ThyProgressStrip[]>;
}
export const THY_PROGRESS_COMPONENT = new InjectionToken<ThyParentProgress>('THY_PROGRESS_COMPONENT');

/**
 * @private
 */
@Component({
    selector: 'thy-progress-bar',
    templateUrl: './progress-strip.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [NgStyle],
    changeDetection: ChangeDetectionStrategy.Eager,
    host: {
        class: 'progress-bar',
        '[style.width.%]': 'percent()'
    }
})
export class ThyProgressStrip {
    private progress = inject(THY_PROGRESS_COMPONENT);

    private hostRenderer = useHostRenderer();

    readonly thyTips = input<string | TemplateRef<HTMLElement> | undefined>(undefined);

    /**
     * 进度条颜色，支持主题色或任意合法 CSS 颜色值
     * @type primary | success | info | warning | danger | string
     */
    readonly thyColor = input<ThyProgressColor | string>();

    /**
     * 进度条类型（已废弃），请使用 thyColor
     * @deprecated please use thyColor
     */
    readonly thyType = input<ThyProgressColor>();

    readonly color = computed(() => this.thyColor() || this.thyType());

    readonly thyValue = input(0, {
        transform: numberAttribute
    });

    protected readonly customColorStyle = computed(() => {
        const color = this.color();
        return isProgressPresetColor(color) || !color ? null : { 'background-color': color };
    });

    protected readonly percent = computed(() => {
        const value = this.thyValue();
        if (!value && value !== 0) {
            return 0;
        }
        return +((value / this.progress.max()) * 100).toFixed(2);
    });

    constructor() {
        effect(() => {
            const color = this.color();
            this.hostRenderer.updateClass(isProgressPresetColor(color) ? [`progress-bar-${color}`] : []);
        });
    }
}
