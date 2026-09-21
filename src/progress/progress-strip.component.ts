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
import { ThyProgressColor } from './interfaces';
import { NgStyle } from '@angular/common';

export interface ThyParentProgress {
    readonly max: Signal<number>;
    readonly bars: Signal<readonly ThyProgressStrip[]>;
}
export const THY_PROGRESS_COMPONENT = new InjectionToken<ThyParentProgress>('THY_PROGRESS_COMPONENT');

export function isProgressThemeColor(color?: string): color is ThyProgressColor {
    return color === 'primary' || color === 'success' || color === 'info' || color === 'warning' || color === 'danger';
}

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

    readonly thyValue = input(0, {
        transform: numberAttribute
    });

    readonly thyColor = input<ThyProgressColor | string>();

    protected readonly percent = computed(() => {
        const value = this.thyValue();
        if (!value && value !== 0) {
            return 0;
        }
        return +((value / this.progress.max()) * 100).toFixed(2);
    });

    protected readonly barInnerStyle = computed(() => {
        const color = this.thyColor();
        if (color && !isProgressThemeColor(color)) {
            return { 'background-color': color };
        }
        return null;
    });

    constructor() {
        effect(() => {
            const color = this.thyColor();
            this.hostRenderer.updateClass(isProgressThemeColor(color) ? [`progress-bar-${color}`] : []);
        });
    }
}
