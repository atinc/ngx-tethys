import {
    Component,
    HostBinding,
    ContentChildren,
    QueryList,
    AfterContentInit,
    OnDestroy,
    OnInit,
    ChangeDetectorRef,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    inject,
    input,
    effect
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ThyTimelineItem } from './timeline-item.component';
import { ThyTimelineService } from './timeline.service';
import { Subject } from 'rxjs';
import { NgTemplateOutlet } from '@angular/common';
import { coerceBooleanProperty } from 'ngx-tethys/util';
import { ThyTimeMode } from './timeline.type';

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
                <ng-template [ngTemplateOutlet]="item.template"></ng-template>
            }
            <ng-template>
                <ng-content></ng-content>
            </ng-template>
        </ng-container>
    `,
    imports: [NgTemplateOutlet]
})
export class ThyTimeline implements OnInit, AfterContentInit, OnDestroy {
    private cdr = inject(ChangeDetectorRef);
    private timelineService = inject(ThyTimelineService);

    /**
     * 节点排序是否倒序
     * @default false
     */
    readonly thyReverse = input<boolean, boolean | string | number>(undefined, { transform: coerceBooleanProperty });

    /**
     * 改变时间轴和内容的相对位置
     * @type left | right | center
     * @default left
     */
    readonly thyMode = input<ThyTimeMode>(undefined);

    /**
     * 时间轴的方向
     * @type horizontal | vertical
     */
    readonly thyDirection = input<ThyTimeDirection>('vertical');

    public timelineItems: ThyTimelineItem[] = [];

    private destroy$ = new Subject<void>();

    @HostBinding(`class.thy-timeline`) isTimeline = true;
    @HostBinding(`class.thy-timeline-right`) rightTimeline = false;
    @HostBinding(`class.thy-timeline-center`) centerTimeline = false;
    @HostBinding(`class.thy-timeline-template`) templateTimeline = false;
    @HostBinding(`class.thy-timeline-horizontal`) horizontal = false;

    @ContentChildren(ThyTimelineItem)
    listOfItems: QueryList<ThyTimelineItem>;

    constructor() {
        effect(() => {
            const thyMode = this.thyMode();
            if (thyMode && !this.horizontal) {
                if (thyMode === 'right') {
                    this.rightTimeline = !this.templateTimeline;
                    this.centerTimeline = false;
                } else if (thyMode === 'center') {
                    this.centerTimeline = true;
                    this.rightTimeline = false;
                } else {
                    this.rightTimeline = false;
                    this.centerTimeline = false;
                }
            }
            if (!this.horizontal) {
                this.updateChildren();
            }
        });

        effect(() => {
            const thyReverse = this.thyReverse();
            this.updateChildren();
        });
    }

    ngOnInit() {
        this.horizontal = this.thyDirection() === 'horizontal' ? true : false;
        this.timelineService.check$.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.cdr.markForCheck();
        });
    }

    ngAfterContentInit() {
        this.updateChildren();
        this.listOfItems.changes.subscribe(() => {
            this.updateChildren();
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private updateChildren(): void {
        if (this.listOfItems && this.listOfItems.length) {
            const length = this.listOfItems.length;
            this.listOfItems.forEach((item, index) => {
                item.isLast = !this.thyReverse() ? index === length - 1 : index === 0;
                item.isFirst = this.thyReverse() ? index === length - 1 : index === 0;
                item.reverse = this.thyReverse();
                if (!this.horizontal) {
                    item.position = getTimelineItemPosition(index, this.thyMode());
                }
                if (item.description || (item.thyPosition() && !this.horizontal)) {
                    this.templateTimeline = true;
                }
                item.detectChanges();
            });
            this.timelineItems = this.thyReverse() ? this.listOfItems.toArray().reverse() : this.listOfItems.toArray();
        }
        this.cdr.markForCheck();
    }
}

function getTimelineItemPosition(index: number, mode: ThyTimeMode): ThyTimeMode | undefined {
    return mode === 'left' ? 'left' : mode === 'right' ? 'right' : mode === 'center' && index % 2 === 0 ? 'left' : 'right';
}
