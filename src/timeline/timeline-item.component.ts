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
import { thyTimeMode, thyTimeModes } from './timeline.component';
import { TimelineService } from './timeline.service';

export type thyColor = 'primary' | 'success' | 'warning' | 'danger';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'thy-timeline-item',
    templateUrl: './timeline-item.component.html',
    exportAs: 'ThyTimelineItem'
})
export class ThyTimelineItemComponent implements OnInit, OnChanges {
    @ViewChild('template', { static: false }) template: TemplateRef<void>;

    _color: thyColor = 'primary';

    _isLast = false;

    _isFirst = false;

    _position: thyTimeMode;

    _reverse: Boolean = false;

    @Input()
    set thyColor(value: thyColor) {
        if (value) {
            this._color = value;
        }
    }

    @Input() thyPosition: thyTimeMode;

    @ContentChild('thyDot', { static: false }) thyDot: TemplateRef<any>;

    @ContentChild('thyOtherSideTemplate', { static: false }) thyOtherSideTemplate: TemplateRef<any>;

    constructor(private cdr: ChangeDetectorRef, private timelineService: TimelineService) {}

    ngOnChanges(changes: SimpleChanges): void {
        this.timelineService.markForCheck();
    }

    detectChanges(): void {
        this.cdr.detectChanges();
    }

    ngOnInit() {}
}
