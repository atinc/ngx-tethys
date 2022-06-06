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
import { ThySegmentedItemComponent } from './segmented-item.component';
import { IThySegmentedComponent, THY_SEGMENTED_COMPONENT } from './segmented.token';
import { ThySegmentedEvent } from './types';

export type ThySegmentedSize = 'xs' | 'sm' | 'md' | 'default';

export type ThySegmentedMode = 'block' | 'inline';

/**
 * 分段控制组件
 */
@Component({
    selector: 'thy-segmented',
    templateUrl: './segmented.component.html',
    exportAs: 'thySegmented',
    animations: [thumbMotion],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: THY_SEGMENTED_COMPONENT,
            useExisting: ThySegmentedComponent
        }
    ],
    host: {
        class: 'thy-segmented',
        '[class.thy-segmented-xs]': `thySize === 'xs'`,
        '[class.thy-segmented-sm]': `thySize === 'sm'`,
        '[class.thy-segmented-md]': `thySize === 'md'`,
        '[class.thy-segmented-default]': `!thySize || thySize === 'default'`,
        '[class.thy-segmented-block]': `thyMode === 'block'`
    }
})
export class ThySegmentedComponent implements IThySegmentedComponent, AfterContentInit {
    /**
     * @internal
     */
    @ContentChildren(ThySegmentedItemComponent) options!: QueryList<ThySegmentedItemComponent>;

    /**
     * 大小，分别为 'xs' | 'sm' | 'md' | 'default'
     * @default 'default'
     */
    @Input() thySize: ThySegmentedSize = 'default';

    /**
     * 模式，分别为 'block' | 'inline'
     * @default 'block'
     */
    @Input() thyMode: ThySegmentedMode = 'block';

    /**
     * 是否禁用分段控制器
     * @default false
     */
    @Input()
    @InputBoolean()
    @HostBinding(`class.disabled`)
    thyDisabled = false;

    /**
     * 默认选中的选项的索引
     * @default 0
     */
    @Input() @InputNumber() thyActiveIndex: number = 0;

    /**
     * 选项被选中的回调事件
     */
    @Output() readonly thySelectChange = new EventEmitter<ThySegmentedEvent>();

    public selectedItem: ThySegmentedItemComponent;

    public animationState: null | { value: string; params: ThumbAnimationProps } = null;

    public transitionedTo: any = null;

    constructor(private cdr: ChangeDetectorRef) {}

    ngAfterContentInit(): void {
        this.selectedItem = this.options.get(this.thyActiveIndex || 0);
        this.selectedItem.select();
    }

    public changeSelectedItem(event: Event, item: ThySegmentedItemComponent): void {
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

    public handleThumbAnimationDone(e: any): void {
        if (e.fromState === 'from') {
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
