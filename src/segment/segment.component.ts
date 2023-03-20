import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    EventEmitter,
    HostBinding,
    Input,
    Output,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import { InputBoolean, InputNumber, ThumbAnimationProps } from 'ngx-tethys/core';
import { thumbMotion } from 'ngx-tethys/core';
import { ThySegmentItemComponent } from './segment-item.component';
import { IThySegmentComponent, THY_SEGMENTED_COMPONENT } from './segment.token';
import { ThySegmentEvent } from './types';
import { AnimationEvent } from '@angular/animations';
import { NgIf } from '@angular/common';

export type ThySegmentSize = 'xs' | 'sm' | 'md' | 'default';

export type ThySegmentMode = 'block' | 'inline';

/**
 * 分段控制器组件
 * @name thy-segment
 */
@Component({
    selector: 'thy-segment',
    templateUrl: './segment.component.html',
    exportAs: 'thySegment',
    animations: [thumbMotion],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: THY_SEGMENTED_COMPONENT,
            useExisting: ThySegmentComponent
        }
    ],
    host: {
        class: 'thy-segment',
        '[class.thy-segment-xs]': `thySize === 'xs'`,
        '[class.thy-segment-sm]': `thySize === 'sm'`,
        '[class.thy-segment-md]': `thySize === 'md'`,
        '[class.thy-segment-default]': `!thySize || thySize === 'default'`,
        '[class.thy-segment-block]': `thyMode === 'block'`
    },
    standalone: true,
    imports: [NgIf]
})
export class ThySegmentComponent implements IThySegmentComponent, AfterContentInit {
    /**
     * @internal
     */
    @ContentChildren(ThySegmentItemComponent) options!: QueryList<ThySegmentItemComponent>;

    /**
     * 大小
     * @type xs | sm | md | default
     */
    @Input() thySize: ThySegmentSize = 'default';

    /**
     * 模式，分别为
     * @type block | inline
     */
    @Input() thyMode: ThySegmentMode = 'block';

    /**
     * 是否禁用分段控制器
     */
    @Input()
    @InputBoolean()
    @HostBinding(`class.disabled`)
    thyDisabled = false;

    /**
     * 默认选中的选项的索引
     */
    @Input() @InputNumber() thyActiveIndex: number = 0;

    /**
     * 选项被选中的回调事件
     */
    @Output() readonly thySelectChange = new EventEmitter<ThySegmentEvent>();

    public selectedItem: ThySegmentItemComponent;

    public animationState: null | { value: string; params: ThumbAnimationProps } = null;

    public transitionedTo: any = null;

    constructor(private cdr: ChangeDetectorRef) {}

    ngAfterContentInit(): void {
        this.selectedItem = this.options.get(this.thyActiveIndex || 0);
        this.selectedItem.select();
    }

    public changeSelectedItem(event: Event, item: ThySegmentItemComponent): void {
        this.thySelectChange.emit({ event: event, value: item.thyValue });

        this.animationState = {
            value: 'from',
            params: getThumbAnimationProps(this.selectedItem.elementRef.nativeElement!)
        };
        this.selectedItem = null;
        this.cdr.detectChanges();

        this.animationState = {
            value: 'to',
            params: getThumbAnimationProps(item.elementRef.nativeElement!)
        };
        this.transitionedTo = item;
        this.cdr.detectChanges();
    }

    public handleThumbAnimationDone(event: AnimationEvent): void {
        if (event.fromState === 'from') {
            this.selectedItem = this.transitionedTo;
            this.selectedItem.select();
            this.transitionedTo = null;
            this.animationState = null;
            this.cdr.detectChanges();
        }
    }
}

function getThumbAnimationProps(element: HTMLElement): ThumbAnimationProps {
    return {
        transform: element.offsetLeft,
        width: element.clientWidth
    };
}
