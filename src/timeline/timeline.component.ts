import {
    Component,
    Input,
    HostBinding,
    ContentChildren,
    QueryList,
    AfterContentInit,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    SimpleChange,
    ChangeDetectorRef,
    ViewEncapsulation,
    ChangeDetectionStrategy
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ThyTimelineItemComponent } from './timeline-item.component';
import { ThyTimelineService } from './timeline.service';
import { Subject } from 'rxjs';
import { InputBoolean } from 'ngx-tethys/core';
import { NgFor, NgTemplateOutlet } from '@angular/common';

export type ThyTimeMode = 'left' | 'right' | 'center';

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
            <ng-container *ngFor="let item of timelineItems">
                <ng-template [ngTemplateOutlet]="item.template"></ng-template>
            </ng-container>
            <ng-template>
                <ng-content></ng-content>
            </ng-template>
        </ng-container>
    `,
    standalone: true,
    imports: [NgFor, NgTemplateOutlet]
})
export class ThyTimelineComponent implements OnInit, AfterContentInit, OnChanges, OnDestroy {
    /**
     * 节点排序是否倒序
     * @default false
     */
    @Input() @InputBoolean() thyReverse: boolean;

    /**
     * 改变时间轴和内容的相对位置
     * @type left | right | center
     * @default left
     */
    @Input() thyMode: ThyTimeMode;

    /**
     * 时间轴的方向
     * @type horizontal | vertical
     */
    @Input() thyDirection: ThyTimeDirection = 'vertical';

    public timelineItems: ThyTimelineItemComponent[] = [];

    private destroy$ = new Subject<void>();

    @HostBinding(`class.thy-timeline`) isTimeline = true;
    @HostBinding(`class.thy-timeline-right`) rightTimeline = false;
    @HostBinding(`class.thy-timeline-center`) centerTimeline = false;
    @HostBinding(`class.thy-timeline-template`) templateTimeline = false;
    @HostBinding(`class.thy-timeline-horizontal`) horizontal = false;

    @ContentChildren(ThyTimelineItemComponent)
    listOfItems: QueryList<ThyTimelineItemComponent>;

    constructor(private cdr: ChangeDetectorRef, private timelineService: ThyTimelineService) {}

    ngOnChanges(changes: SimpleChanges): void {
        const { thyMode, thyReverse } = changes;
        if (thyMode && !this.horizontal) {
            if (thyMode.currentValue === 'right') {
                this.rightTimeline = !this.templateTimeline;
                this.centerTimeline = false;
            } else if (thyMode.currentValue === 'center') {
                this.centerTimeline = true;
                this.rightTimeline = false;
            } else {
                this.rightTimeline = false;
                this.centerTimeline = false;
            }
        }
        if ((simpleChangeActivated(thyMode) && !this.horizontal) || simpleChangeActivated(thyReverse)) {
            this.updateChildren();
        }
    }

    ngOnInit() {
        this.horizontal = this.thyDirection === 'horizontal' ? true : false;
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
                item.isLast = !this.thyReverse ? index === length - 1 : index === 0;
                item.isFirst = this.thyReverse ? index === length - 1 : index === 0;
                item.reverse = this.thyReverse;
                if (!this.horizontal) {
                    item.position = getTimelineItemPosition(index, this.thyMode);
                }
                if (item.description || (item.thyPosition && !this.horizontal)) {
                    this.templateTimeline = true;
                }
                item.detectChanges();
            });
            this.timelineItems = this.thyReverse ? this.listOfItems.toArray().reverse() : this.listOfItems.toArray();
        }
        this.cdr.markForCheck();
    }
}
function simpleChangeActivated(simpleChange?: SimpleChange): boolean {
    return !!(simpleChange && (simpleChange.previousValue !== simpleChange.currentValue || simpleChange.isFirstChange()));
}

function getTimelineItemPosition(index: number, mode: ThyTimeMode): ThyTimeMode | undefined {
    return mode === 'left' ? 'left' : mode === 'right' ? 'right' : mode === 'center' && index % 2 === 0 ? 'left' : 'right';
}
