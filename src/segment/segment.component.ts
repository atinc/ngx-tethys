import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    DestroyRef,
    EventEmitter,
    HostBinding,
    Input,
    Output,
    QueryList,
    ViewEncapsulation,
    booleanAttribute,
    numberAttribute
} from '@angular/core';
import { ThumbAnimationProps } from 'ngx-tethys/core';
import { thumbMotion } from 'ngx-tethys/core';
import { ThySegmentItem } from './segment-item.component';
import { IThySegmentComponent, THY_SEGMENTED_COMPONENT } from './segment.token';
import { ThySegmentEvent } from './types';
import { AnimationEvent } from '@angular/animations';
import { NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
            useExisting: ThySegment
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
export class ThySegment implements IThySegmentComponent, AfterContentInit {
    /**
     * @internal
     */
    @ContentChildren(ThySegmentItem) options!: QueryList<ThySegmentItem>;

    /**
     * 大小
     * @type xs | sm | md | default
     */
    @Input() thySize: ThySegmentSize = 'default';

    /**
     * 模式
     * @type block | inline
     */
    @Input() thyMode: ThySegmentMode = 'block';

    /**
     * 是否禁用分段控制器
     */
    @Input({ transform: booleanAttribute })
    @HostBinding(`class.disabled`)
    thyDisabled = false;

    /**
     * 选中选项的索引
     */
    @Input({ transform: numberAttribute })
    set thyActiveIndex(value: number) {
        this.newActiveIndex = value;
        if (value < 0 || value === this.activeIndex) {
            return;
        }
        setTimeout(() => {
            const selectedItem = this.options?.get(this.activeIndex);
            if (selectedItem) {
                selectedItem.unselect();
                this.changeSelectedItem(this.options.get(value));
            } else {
                this.activeIndex = value;
            }
        });
    }

    /**
     * 选项被选中的回调事件
     */
    @Output() readonly thySelectChange = new EventEmitter<ThySegmentEvent>();

    public selectedItem: ThySegmentItem;

    private newActiveIndex: number;

    private activeIndex = 0;

    public animationState: null | { value: string; params: ThumbAnimationProps } = null;

    public transitionedTo: any = null;

    constructor(private cdr: ChangeDetectorRef, private destroyRef: DestroyRef) {}

    ngAfterContentInit(): void {
        this.selectedItem = this.options.get(this.newActiveIndex) || this.options.get(0);
        this.selectedItem?.select();

        this.options.changes.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
            this.options.forEach(item => {
                item.unselect();
            });
            this.selectedItem = this.options.get(this.newActiveIndex) || this.options.get(0);
            this.selectedItem?.select();
            this.cdr.detectChanges();
        });
    }

    public changeSelectedItem(item: ThySegmentItem, event?: Event): void {
        this.animationState = {
            value: 'from',
            params: getThumbAnimationProps(this.options?.get(this.activeIndex)?.elementRef.nativeElement!)
        };
        this.selectedItem = null;
        this.cdr.detectChanges();

        this.animationState = {
            value: 'to',
            params: getThumbAnimationProps(item.elementRef.nativeElement!)
        };
        this.transitionedTo = item;
        this.activeIndex = this.options?.toArray().findIndex(option => {
            return option.thyValue === item?.thyValue;
        });
        this.thySelectChange.emit({ event: event, value: item.thyValue, activeIndex: this.activeIndex });
        this.cdr.detectChanges();
    }

    public handleThumbAnimationDone(event: AnimationEvent): void {
        if (event.fromState === 'from') {
            this.selectedItem = this.transitionedTo;
            this.selectedItem?.select();
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
