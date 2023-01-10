import { UpdateHostClassService } from 'ngx-tethys/core';

import { Component, ElementRef, HostBinding, Inject, InjectionToken, Input, TemplateRef, ViewEncapsulation } from '@angular/core';

import { ThyProgressType } from './interfaces';

export interface ThyParentProgress {
    max: number;
    bars: ThyProgressStripComponent[];
}
export const THY_PROGRESS_COMPONENT = new InjectionToken<ThyParentProgress>('THY_PROGRESS_COMPONENT');

/**
 * @private
 */
@Component({
    selector: 'thy-progress-bar',
    templateUrl: './progress-strip.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [UpdateHostClassService]
})
export class ThyProgressStripComponent {
    private value: number;

    color: string;

    @HostBinding(`class.progress-bar`) isProgressBar = true;

    @HostBinding('style.width.%') percent = 0;

    @Input() thyTips: string | TemplateRef<HTMLElement>;

    @Input() set thyType(type: ThyProgressType) {
        this.updateHostClassService.updateClass(type ? [`progress-bar-${type}`] : []);
    }

    @Input() set thyValue(value: number) {
        if (!value && value !== 0) {
            return;
        }
        this.value = value;
        this.recalculatePercentage();
    }

    @Input() set thyColor(color: string) {
        this.color = color || '';
    }

    constructor(
        private updateHostClassService: UpdateHostClassService,
        elementRef: ElementRef,
        @Inject(THY_PROGRESS_COMPONENT) private progress: ThyParentProgress
    ) {
        updateHostClassService.initializeElement(elementRef.nativeElement);
    }

    recalculatePercentage(): void {
        this.percent = +((this.value / this.progress.max) * 100).toFixed(2);

        // if (this.progress && this.progress.bars) {
        //     const totalPercentage = this.progress.bars.reduce(function(total: number, bar): number {
        //         return total + bar.percent;
        //     }, 0);

        //     if (totalPercentage > 100) {
        //         this.percent -= totalPercentage - 100;
        //     }
        // }
    }
}
