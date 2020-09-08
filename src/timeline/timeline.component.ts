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
import { ThyTimelineItemComponent } from './timeline-item.component';
import { TimelineService } from './timeline.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export type thyTimeMode = 'left' | 'right' | 'center' | 'custom';

export enum thyTimeModes {
    left = 'left',
    right = 'right',
    center = 'center',
    custom = 'custom'
}
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    selector: 'thy-timeline',
    providers: [TimelineService],
    template: `
        <ng-container>
            <ng-container *ngFor="let item of _timelineItems">
                <ng-template [ngTemplateOutlet]="item.template"></ng-template>
            </ng-container>
            <ng-content></ng-content>
        </ng-container>
    `
})
export class ThyTimelineComponent implements AfterContentInit, OnChanges, OnInit, OnDestroy {
    @Input() thyReverse: Boolean;

    @Input() thyMode: thyTimeMode;

    _timelineItems: ThyTimelineItemComponent[] = [];
    @HostBinding(`class.thy-timeline`) _isTimeline = true;
    @HostBinding(`class.thy-timeline-right`) _rightTimeline = false;
    @HostBinding(`class.thy-timeline-center`) _centerTimeline = false;
    @HostBinding(`class.thy-timeline-template`) _templateTimeline = false;

    @ContentChildren(ThyTimelineItemComponent)
    listOfItems: QueryList<ThyTimelineItemComponent>;

    private destroy$ = new Subject<void>();

    constructor(private cdr: ChangeDetectorRef, private timelineService: TimelineService) {}

    ngOnChanges(changes: SimpleChanges): void {
        const { thyMode, thyReverse } = changes;
        if (thyMode) {
            if (thyMode.currentValue === 'right') {
                this._rightTimeline = !this._templateTimeline;
                this._centerTimeline = false;
            } else if (thyMode.currentValue === 'center') {
                this._centerTimeline = true;
                this._rightTimeline = false;
            } else {
                this._rightTimeline = false;
                this._centerTimeline = false;
            }
        }
        if (simpleChangeActivated(thyMode) || simpleChangeActivated(thyReverse)) {
            this.updateChildren();
        }
    }

    ngOnInit(): void {
        this.timelineService.check$.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.cdr.markForCheck();
        });
    }

    ngAfterContentInit() {
        this.updateChildren();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private updateChildren(): void {
        if (this.listOfItems && this.listOfItems.length) {
            const length = this.listOfItems.length;
            this.listOfItems.forEach((item, index) => {
                item._isLast = !this.thyReverse ? index === length - 1 : index === 0;
                item._isFirst = this.thyReverse ? index === length - 1 : index === 0;
                item._position = getTimelineItemPosition(index, this.thyMode);
                item._reverse = this.thyReverse;
                if (item.thyOtherSideTemplate) {
                    this._templateTimeline = true;
                }
                item.detectChanges();
            });
            this._timelineItems = this.thyReverse ? this.listOfItems.toArray().reverse() : this.listOfItems.toArray();
        }
        this.cdr.markForCheck();
    }
}
function simpleChangeActivated(simpleChange?: SimpleChange): boolean {
    return !!(simpleChange && (simpleChange.previousValue !== simpleChange.currentValue || simpleChange.isFirstChange()));
}

function getTimelineItemPosition(index: number, mode: thyTimeMode): thyTimeMode | undefined {
    return mode === 'custom'
        ? undefined
        : mode === 'left'
        ? 'left'
        : mode === 'right'
        ? 'right'
        : mode === 'center' && index % 2 === 0
        ? 'left'
        : 'right';
}
