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
    Signal
} from '@angular/core';
import { useHostRenderer } from '@tethys/cdk/dom';
import { ThyProgressType } from './interfaces';
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
    host: {
        class: 'progress-bar',
        '[style.width.%]': 'percent()'
    }
})
export class ThyProgressStrip {
    private progress = inject(THY_PROGRESS_COMPONENT);

    private hostRenderer = useHostRenderer();

    readonly thyTips = input<string | TemplateRef<HTMLElement>>(undefined);

    readonly thyType = input<ThyProgressType>();

    readonly thyValue = input(0, {
        transform: numberAttribute
    });

    readonly thyColor = input<string>();

    protected readonly percent = computed(() => {
        const value = this.thyValue();
        if (!value && value !== 0) {
            return 0;
        }
        return +((value / this.progress.max()) * 100).toFixed(2);
    });

    constructor() {
        effect(() => {
            const type = this.thyType();
            this.hostRenderer.updateClass(type ? [`progress-bar-${type}`] : []);
        });
    }
}
