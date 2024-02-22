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
import { NgIf, NgTemplateOutlet } from '@angular/common';

export type thyColor = 'primary' | 'success' | 'warning' | 'danger' | 'info';

/**
 * 时间轴节点组件
 * @name thy-timeline-item
 * @order 20
 */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'thy-timeline-item',
    templateUrl: './timeline-item.component.html',
    exportAs: 'ThyTimelineItem',
    standalone: true,
    imports: [NgIf, NgTemplateOutlet]
})
export class ThyTimelineItem implements OnInit, OnChanges {
    @ViewChild('timelineItem', { static: false }) template: TemplateRef<void>;

    @HostBinding('class') className: string;

    public color: thyColor = 'primary';

    public isLast = false;

    public isFirst = false;

    public position: ThyTimeMode;

    public reverse: Boolean = false;

    /**
     * 指定圆圈颜色
     * @type primary | success | warning | danger | info
     * @default primary
     */
    @Input()
    set thyColor(value: thyColor) {
        if (value) {
            this.color = value;
        }
    }

    /**
     * 自定义节点位置
     * @type left | right | center
     */
    @Input() thyPosition: ThyTimeMode;

    /**
     * 自定义时间轴点模板
     * @type TemplateRef
     */
    @ContentChild('dot', { static: false }) dot: TemplateRef<SafeAny>;

    /**
     * 自定义另一侧的模板
     * @type TemplateRef
     */
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
