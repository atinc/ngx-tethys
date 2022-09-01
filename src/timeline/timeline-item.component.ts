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
import { SafeAny } from 'ngx-tethys/types';
import { ThyTimeMode } from './timeline.component';
import { ThyTimelineService } from './timeline.service';

export type thyColor = 'primary' | 'success' | 'warning' | 'danger' | 'info';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'thy-timeline-item',
    templateUrl: './timeline-item.component.html',
    exportAs: 'ThyTimelineItem'
})
export class ThyTimelineItemComponent implements OnInit, OnChanges {
    @ViewChild('timelineItem', { static: false }) template: TemplateRef<void>;

    @HostBinding('class') className: string;

    public color: thyColor = 'primary';

    public isLast = false;

    public isFirst = false;

    public position: ThyTimeMode;

    public reverse: Boolean = false;

    @Input()
    set thyColor(value: thyColor) {
        if (value) {
            this.color = value;
        }
    }

    @Input() thyPosition: ThyTimeMode;

    @ContentChild('dot', { static: false }) dot: TemplateRef<SafeAny>;

    @ContentChild('description', { static: false }) description: TemplateRef<SafeAny>;

    constructor(private cdr: ChangeDetectorRef, private timelineService: ThyTimelineService) {}

    detectChanges(): void {
        this.cdr.detectChanges();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.timelineService.markForCheck();
    }

    ngOnInit() {}
}
