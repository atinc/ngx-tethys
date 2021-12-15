import {
    Component,
    Input,
    HostBinding,
    ChangeDetectionStrategy,
    ElementRef,
    ViewEncapsulation,
    ViewChildren,
    QueryList,
    TemplateRef
} from '@angular/core';
import { ThyProgressTypes, ThyStackedValue } from './interfaces';
import { UpdateHostClassService } from 'ngx-tethys/core';
import { THY_PROGRESS_COMPONENT, ThyProgressBarComponent, ThyParentProgress } from './bar/progress-bar.component';

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
export class ThyProgressComponent implements ThyParentProgress {
    value: number | ThyStackedValue[];

    bars: ThyProgressBarComponent[] = [];

    computedThyMax: number;

    @HostBinding('attr.max') max = 100;

    @HostBinding(`class.progress-stacked`) isStacked = false;

    @HostBinding(`class.progress`) isProgress = true;

    @ViewChildren(ThyProgressBarComponent)
    set barsQueryList(value: QueryList<ThyProgressBarComponent>) {
        this.bars = value.toArray();
    }

    defaultValue: number;

    @Input() thyType: ThyProgressTypes;

    @Input() thyTips: string | TemplateRef<HTMLElement>;

    @Input() set thyValue(value: number | ThyStackedValue[]) {
        this.isStacked = Array.isArray(value);

        // 自动求和计算 max
        if (this.isStacked) {
            this.value = [...(value as ThyStackedValue[])];
            this.computedThyMax = this.value.reduce((total, item) => {
                return total + item.value;
            }, 0);
            if (this.max > this.computedThyMax) {
                this.isPushDefaultItem();
            } else {
                this.max = this.computedThyMax;
            }
        } else {
            this.value = value;
            this.defaultValue = 100 - (value as number);
        }
    }

    @Input() set thySize(size: string) {
        this.updateHostClassService.updateClass(size ? [`progress-${size}`] : []);
    }

    @Input() set thyMax(max: number) {
        this.max = max;
        if (this.max > this.computedThyMax) {
            this.isPushDefaultItem();
        }
        this.bars.forEach(bar => {
            bar.recalculatePercentage();
        });
    }

    constructor(private updateHostClassService: UpdateHostClassService, elementRef: ElementRef) {
        this.updateHostClassService.initializeElement(elementRef);
    }

    isPushDefaultItem() {
        if (Array.isArray(this.value)) {
            const defaultItem = this.value.find(value => value.type === 'default');
            if (defaultItem) {
                defaultItem.value = this.max - this.computedThyMax;
            } else {
                this.value.push({ value: this.max - this.computedThyMax, type: 'default', color: '#eee' });
            }
        }
    }
}
