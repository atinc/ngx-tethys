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

export type thyTimeMode = 'left' | 'right' | 'center';

export enum thyTimeModes {
    left = 'left',
    right = 'right',
    center = 'center'
}
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
            <ng-content></ng-content>
        </ng-container>
    `
})
export class ThyTimelineComponent implements OnInit, AfterContentInit, OnChanges, OnDestroy {
    @Input() thyReverse: Boolean;

    @Input() thyMode: thyTimeMode;

    public timelineItems: ThyTimelineItemComponent[] = [];

    private destroy$ = new Subject<void>();

    @HostBinding(`class.thy-timeline`) isTimeline = true;
    @HostBinding(`class.thy-timeline-right`) rightTimeline = false;
    @HostBinding(`class.thy-timeline-center`) centerTimeline = false;
    @HostBinding(`class.thy-timeline-template`) templateTimeline = false;

    @ContentChildren(ThyTimelineItemComponent)
    listOfItems: QueryList<ThyTimelineItemComponent>;

    constructor(private cdr: ChangeDetectorRef, private timelineService: ThyTimelineService) {}

    ngOnChanges(changes: SimpleChanges): void {
        const { thyMode, thyReverse } = changes;
        if (thyMode) {
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
        if (simpleChangeActivated(thyMode) || simpleChangeActivated(thyReverse)) {
            this.updateChildren();
        }
    }

    ngOnInit() {
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
                item.isLast = !this.thyReverse ? index === length - 1 : index === 0;
                item.isFirst = this.thyReverse ? index === length - 1 : index === 0;
                item.position = getTimelineItemPosition(index, this.thyMode);
                item.reverse = this.thyReverse;
                if (item.description || item.thyPosition) {
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

function getTimelineItemPosition(index: number, mode: thyTimeMode): thyTimeMode | undefined {
    return mode === 'left' ? 'left' : mode === 'right' ? 'right' : mode === 'center' && index % 2 === 0 ? 'left' : 'right';
}
