import {
    Component,
    OnInit,
    ChangeDetectorRef,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    inject,
    input,
    effect,
    computed,
    signal,
    WritableSignal,
    contentChildren
} from '@angular/core';
import { ThyTimelineItem } from './timeline-item.component';
import { ThyTimelineService } from './timeline.service';
import { NgTemplateOutlet } from '@angular/common';
import { coerceBooleanProperty, ThyBooleanInput } from 'ngx-tethys/util';
import { ThyTimeMode } from './timeline.type';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export enum ThyTimeModes {
    left = 'left',
    right = 'right',
    center = 'center'
}

export type ThyTimeDirection = 'horizontal' | 'vertical';

/**
 * 时间轴组件
 * @name thy-timeline
 * @order 10
 */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    selector: 'thy-timeline',
    providers: [ThyTimelineService],
    template: `
        <ng-container>
            @for (item of timelineItems; track $index) {
                <ng-template [ngTemplateOutlet]="item.template()"></ng-template>
            }
            <ng-template>
                <ng-content></ng-content>
            </ng-template>
        </ng-container>
    `,
    host: {
        class: 'thy-timeline',
        '[class.thy-timeline-right]': `rightTimeline()`,
        '[class.thy-timeline-center]': `centerTimeline()`,
        '[class.thy-timeline-template]': `templateTimeline()`,
        '[class.thy-timeline-horizontal]': `horizontal()`
    },
    imports: [NgTemplateOutlet]
})
export class ThyTimeline implements OnInit {
    private cdr = inject(ChangeDetectorRef);

    private timelineService = inject(ThyTimelineService);

    /**
     * 节点排序是否倒序
     * @default false
     */
    readonly thyReverse = input<boolean, ThyBooleanInput>(false, { transform: coerceBooleanProperty });

    /**
     * 改变时间轴和内容的相对位置
     * @type left | right | center
     * @default left
     */
    readonly thyMode = input<ThyTimeMode>('left');

    /**
     * 时间轴的方向
     * @type horizontal | vertical
     */
    readonly thyDirection = input<ThyTimeDirection>('vertical');

    public timelineItems: ThyTimelineItem[] = [];

    public templateTimeline: WritableSignal<boolean> = signal(false);

    public horizontal = computed(() => {
        return this.thyDirection() === 'horizontal' ? true : false;
    });

    public rightTimeline = computed(() => {
        const thyMode = this.thyMode();
        const horizontal = this.horizontal();
        const templateTimeline = this.templateTimeline();
        if (thyMode && !horizontal) {
            if (thyMode === 'right') {
                return !templateTimeline;
            } else {
                return false;
            }
        }
    });

    public centerTimeline = computed(() => {
        const thyMode = this.thyMode();
        const horizontal = this.horizontal();
        if (thyMode && !horizontal) {
            return thyMode === 'center';
        }
    });

    readonly listOfItems = contentChildren(ThyTimelineItem);

    private takeUntilDestroyed = takeUntilDestroyed();

    constructor() {
        effect(() => {
            this.updateChildren();
        });
    }

    ngOnInit() {
        this.timelineService.check$.pipe(this.takeUntilDestroyed).subscribe(() => {
            this.cdr.markForCheck();
        });
    }

    private updateChildren(): void {
        const listOfItems = this.listOfItems();
        const thyReverse = this.thyReverse();
        if (listOfItems && listOfItems.length) {
            const length = listOfItems.length;
            listOfItems.forEach((item, index) => {
                item.isLast = !thyReverse ? index === length - 1 : index === 0;
                item.isFirst = thyReverse ? index === length - 1 : index === 0;
                item.reverse = thyReverse;
                if (!this.horizontal()) {
                    item.position = getTimelineItemPosition(index, this.thyMode());
                }
                if (item.description() || (item.thyPosition() && !this.horizontal())) {
                    this.templateTimeline.set(true);
                }
                item.detectChanges();
            });
            this.timelineItems = this.thyReverse() ? [...listOfItems].reverse() : [...listOfItems];
        }
        this.cdr.markForCheck();
    }
}

function getTimelineItemPosition(index: number, mode: ThyTimeMode): ThyTimeMode | undefined {
    return mode === 'left' ? 'left' : mode === 'right' ? 'right' : mode === 'center' && index % 2 === 0 ? 'left' : 'right';
}
