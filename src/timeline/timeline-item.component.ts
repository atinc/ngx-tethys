import {
    Component,
    HostBinding,
    OnInit,
    ContentChild,
    TemplateRef,
    ViewChild,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    inject,
    input,
    effect
} from '@angular/core';
import { SafeAny } from 'ngx-tethys/types';
import { ThyTimeMode } from './timeline.type';
import { ThyTimelineService } from './timeline.service';
import { NgTemplateOutlet } from '@angular/common';

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
    imports: [NgTemplateOutlet]
})
export class ThyTimelineItem implements OnInit {
    private cdr = inject(ChangeDetectorRef);
    private timelineService = inject(ThyTimelineService);

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
    readonly thyColor = input<thyColor>(undefined);

    /**
     * 自定义节点位置
     * @type left | right | center
     */
    readonly thyPosition = input<ThyTimeMode>(undefined);

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

    constructor() {
        effect(() => {
            const color = this.thyColor();
            if (color) {
                this.color = color;
            }
        });

        effect(() => {
            const position = this.thyPosition();
            const color = this.thyColor();
            this.timelineService.markForCheck();
        });
    }

    detectChanges(): void {
        this.cdr.detectChanges();
    }

    ngOnInit() {}
}
