import {
    Component,
    Input,
    HostBinding,
    OnInit,
    OnChanges,
    ContentChild,
    TemplateRef,
    ViewChild,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    SimpleChanges
} from '@angular/core';
import { thyTimeMode } from './timeline.component';
import { ThyTimelineService } from './timeline.service';

export type thyColor = 'primary' | 'success' | 'warning' | 'danger';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'thy-timeline-item',
    templateUrl: './timeline-item.component.html',
    exportAs: 'ThyTimelineItem'
})
export class ThyTimelineItemComponent implements OnInit, OnChanges {
    @ViewChild('timelineItem', { static: false }) template: TemplateRef<void>;

    public color: thyColor = 'primary';

    public isLast = false;

    public isFirst = false;

    public position: thyTimeMode;

    public reverse: Boolean = false;

    @Input()
    set thyColor(value: thyColor) {
        if (value) {
            this.color = value;
        }
    }

    @Input() thyPosition: thyTimeMode;

    @ContentChild('dot', { static: false }) dot: TemplateRef<any>;

    @ContentChild('description', { static: false }) description: TemplateRef<any>;

    constructor(private cdr: ChangeDetectorRef, private timelineService: ThyTimelineService) {}

    detectChanges(): void {
        this.cdr.detectChanges();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.timelineService.markForCheck();
    }

    ngOnInit() {}
}
