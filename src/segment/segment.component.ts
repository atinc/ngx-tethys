import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    ViewEncapsulation,
    numberAttribute,
    inject,
    input,
    signal,
    effect,
    output,
    contentChildren
} from '@angular/core';
import { ThumbAnimationProps, thumbMotion } from 'ngx-tethys/core';
import { ThySegmentItem } from './segment-item.component';
import { IThySegmentComponent, THY_SEGMENTED_COMPONENT } from './segment.token';
import { ThySegmentEvent } from './types';
import { AnimationEvent } from '@angular/animations';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { coerceBooleanProperty, isUndefined, isUndefinedOrNull } from 'ngx-tethys/util';

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
        '[class.thy-segment-xs]': `thySize() === 'xs'`,
        '[class.thy-segment-sm]': `thySize() === 'sm'`,
        '[class.thy-segment-md]': `thySize() === 'md'`,
        '[class.thy-segment-default]': `!thySize() || thySize() === 'default'`,
        '[class.thy-segment-block]': `thyMode() === 'block'`,
        '[class.disabled]': 'thyDisabled()'
    },
    imports: []
})
export class ThySegment implements IThySegmentComponent {
    private cdr = inject(ChangeDetectorRef);
    private destroyRef = inject(DestroyRef);

    /**
     * @internal
     */
    readonly options = contentChildren(ThySegmentItem);

    /**
     * 大小
     * @type xs | sm | md | default
     */
    readonly thySize = input<ThySegmentSize>('default');

    /**
     * 模式
     * @type block | inline
     */
    readonly thyMode = input<ThySegmentMode | string>('block');

    /**
     * 是否禁用分段控制器
     */
    readonly thyDisabled = input(false, { transform: coerceBooleanProperty });

    /**
     * 选中选项的索引
     */
    readonly thyActiveIndex = input(undefined, { transform: numberAttribute });

    /**
     * 选项被选中的回调事件
     */
    readonly thySelectChange = output<ThySegmentEvent>();

    public selectedItem: ThySegmentItem | null = null;

    private newActiveIndex?: number;

    private activeIndex?: number;

    public animationState = signal<{ value: string; params: ThumbAnimationProps } | null>(null);

    public transitionedTo: any = null;

    constructor() {
        effect(() => {
            const value = this.thyActiveIndex();
            this.newActiveIndex = value;
            if (isUndefinedOrNull(value) || value < 0 || value === this.activeIndex) {
                return;
            }
            setTimeout(() => {
                const options = this.options();
                const selectedItem = options?.[this.activeIndex!];
                if (selectedItem) {
                    selectedItem.unselect();
                    this.changeSelectedItem(options?.[value]);
                } else {
                    this.activeIndex = value;
                }
            });
        });

        effect(() => {
            const options = this.options();
            (options || []).forEach(item => {
                item.unselect();
            });
            this.selectedItem = (!isUndefinedOrNull(this.newActiveIndex) && options?.[this.newActiveIndex]) || options?.[0];
            this.selectedItem?.select();
        });
    }

    // @ts-ignore
    public changeSelectedItem(item: ThySegmentItem, event?: Event): void {
        const options = this.options();
        this.animationState.set({
            value: 'from',
            // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
            params: getThumbAnimationProps(options?.[this.activeIndex || 0]?.elementRef.nativeElement!)
        });
        this.selectedItem = null;
        this.cdr.detectChanges();

        this.animationState.set({
            value: 'to',
            params: getThumbAnimationProps(item.elementRef.nativeElement!)
        });
        this.transitionedTo = item;
        this.activeIndex = options.findIndex(option => {
            return option.thyValue() === item?.thyValue();
        });
        this.thySelectChange.emit({ event: event, value: item.thyValue(), activeIndex: this.activeIndex });
    }

    public handleThumbAnimationDone(event: AnimationEvent): void {
        if (event.fromState === 'from') {
            this.selectedItem = this.transitionedTo;
            this.selectedItem?.select();
            this.transitionedTo = null;
            this.animationState.set(null);
        }
    }
}

function getThumbAnimationProps(element: HTMLElement): ThumbAnimationProps {
    return {
        transform: element.offsetLeft,
        width: element.clientWidth
    };
}
