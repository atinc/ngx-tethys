import {
    Component,
    Input,
    HostBinding,
    ChangeDetectionStrategy,
    ElementRef,
    ViewEncapsulation,
    ViewChildren,
    QueryList
} from '@angular/core';
import { ThyProgressTypes, ThyStackedValue } from './interfaces';
import { UpdateHostClassService } from '../shared';
import { THY_PROGRESS_COMPONENT, ThyProgressBarComponent } from './bar/progress-bar.component';

@Component({
    selector: 'thy-progress',
    templateUrl: './progress.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        UpdateHostClassService,
        {
            provide: THY_PROGRESS_COMPONENT,
            useExisting: ThyProgressComponent
        }
    ]
})
export class ThyProgressComponent {
    value: number | ThyStackedValue[];

    bars: ThyProgressBarComponent[] = [];

    @HostBinding('attr.max') max = 100;

    @HostBinding(`class.progress-stacked`) isStacked = false;

    @HostBinding(`class.progress`) isProgress = true;

    @ViewChildren(ThyProgressBarComponent)
    set barsQueryList(value: QueryList<ThyProgressBarComponent>) {
        this.bars = value.toArray();
    }

    @Input() thyType: ThyProgressTypes;

    @Input() set thyValue(value: number | ThyStackedValue[]) {
        this.isStacked = Array.isArray(value);
        this.value = value;

        // 自动求和计算 max
        if (this.isStacked) {
            this.thyMax = (value as ThyStackedValue[]).reduce((total, item) => {
                return total + item.value;
            }, 0);
        }
    }

    @Input() set thySize(size: string) {
        this.updateHostClassService.updateClass(size ? [`progress-${size}`] : []);
    }

    @Input() set thyMax(max: number) {
        this.max = max;
        this.bars.forEach(bar => {
            bar.recalculatePercentage();
        });
    }

    constructor(private updateHostClassService: UpdateHostClassService, elementRef: ElementRef) {
        this.updateHostClassService.initializeElement(elementRef);
    }
}
