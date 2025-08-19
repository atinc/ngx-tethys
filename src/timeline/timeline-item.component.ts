import {
    Component,
    OnInit,
    TemplateRef,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    inject,
    input,
    viewChild,
    contentChild
} from '@angular/core';
import { SafeAny } from 'ngx-tethys/types';
import { ThyTimeMode } from './timeline.type';
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

    readonly template = viewChild<TemplateRef<void>>('timelineItem');

    public isLast = false;

    public isFirst = false;

    public position: ThyTimeMode;

    public reverse: boolean = false;

    /**
     * 指定圆圈颜色
     * @type primary | success | warning | danger | info
     * @default primary
     */
    readonly thyColor = input<thyColor>('primary');

    /**
     * 自定义节点位置
     * @type left | right | center
     */
    readonly thyPosition = input<ThyTimeMode>(undefined);

    /**
     * 自定义时间轴点模板
     * @type TemplateRef
     */
    readonly dot = contentChild<TemplateRef<SafeAny>>('dot');

    /**
     * 自定义另一侧的模板
     * @type TemplateRef
     */
    readonly description = contentChild<TemplateRef<SafeAny>>('description');

    constructor() {}

    detectChanges(): void {
        this.cdr.detectChanges();
    }

    ngOnInit() {}
}
