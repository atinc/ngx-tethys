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

export type thyColor = 'primary' | 'success' | 'warning' | 'danger';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'thy-timeline-item',
    templateUrl: './timeline-item.component.html',
    exportAs: 'ThyTimelineItem'
})
export class ThyTimelineItemComponent implements OnInit {
    @ViewChild('template', { static: false }) template: TemplateRef<void>;

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

    @ContentChild('thyDot', { static: false }) thyDot: TemplateRef<any>;

    @ContentChild('thyOtherSideTemplate', { static: false }) thyOtherSideTemplate: TemplateRef<any>;

    constructor(private cdr: ChangeDetectorRef) {}

    detectChanges(): void {
        this.cdr.detectChanges();
    }

    ngOnInit() {}
}
