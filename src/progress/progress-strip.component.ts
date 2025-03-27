import { Component, HostBinding, InjectionToken, Input, TemplateRef, ViewEncapsulation, numberAttribute, inject } from '@angular/core';
import { useHostRenderer } from '@tethys/cdk/dom';
import { ThyProgressType } from './interfaces';
import { NgStyle } from '@angular/common';

export interface ThyParentProgress {
    max: number;
    bars: ThyProgressStrip[];
}
export const THY_PROGRESS_COMPONENT = new InjectionToken<ThyParentProgress>('THY_PROGRESS_COMPONENT');

/**
 * @private
 */
@Component({
    selector: 'thy-progress-bar',
    templateUrl: './progress-strip.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [NgStyle]
})
export class ThyProgressStrip {
    private progress = inject(THY_PROGRESS_COMPONENT);

    private value: number;

    private hostRenderer = useHostRenderer();

    color: string;

    @HostBinding(`class.progress-bar`) isProgressBar = true;

    @HostBinding('style.width.%') percent = 0;

    @Input() thyTips: string | TemplateRef<HTMLElement>;

    @Input() set thyType(type: ThyProgressType) {
        this.hostRenderer.updateClass(type ? [`progress-bar-${type}`] : []);
    }

    @Input({ transform: numberAttribute })
    set thyValue(value: number) {
        if (!value && value !== 0) {
            return;
        }
        this.value = value;
        this.recalculatePercentage();
    }

    @Input() set thyColor(color: string) {
        this.color = color || '';
    }

    recalculatePercentage(): void {
        this.percent = +((this.value / this.progress.max) * 100).toFixed(2);
    }
}
