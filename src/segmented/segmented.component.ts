import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    Output,
    QueryList,
    TemplateRef,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputBoolean, InputNumber, ThumbAnimationProps } from 'ngx-tethys/core';
import { thumbMotion } from 'ngx-tethys/core';
import { isNumber } from 'ngx-tethys/util';
import { noop } from 'rxjs';
import { ThySegmentedEvent, thySegmentedOption, thySegmentedCustomOption } from './types';

export type ThySegmentedSize = 'xs' | 'sm' | 'md' | 'default';

export type ThySegmentedMode = 'block' | 'adaptive';

@Component({
    selector: 'thy-segmented',
    templateUrl: './segmented.component.html',
    exportAs: 'thySegmented',
    animations: [thumbMotion],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThySegmentedComponent),
            multi: true
        }
    ],
    host: {
        class: 'thy-segmented',
        '[class.thy-segmented-xs]': `thySize === 'xs'`,
        '[class.thy-segmented-sm]': `thySize === 'sm'`,
        '[class.thy-segmented-md]': `thySize === 'md'`,
        '[class.thy-segmented-default]': `!thySize || thySize === 'default'`,
        '[class.thy-segmented-block]': `thyMode === 'block'`,
        '[class.thy-segmented-disabled]': '!!thyDisabled'
    }
})
export class ThySegmentedComponent implements ControlValueAccessor {
    @ViewChildren('itemLabels', { read: ElementRef }) listOfOptions!: QueryList<ElementRef>;

    /**
     * 分段控制器的选项
     * @default []
     */
    @Input() set thyOptions(customOptions: thySegmentedCustomOption[]) {
        this.normalizedOptions = normalizeOptions(customOptions);
    }

    /**
     * 大小，分别为 'xs' | 'sm' | 'md' | 'default'
     * @default 'default'
     */
    @Input() thySize: ThySegmentedSize = 'default';

    /**
     * 模式，分别为 'block' | 'adaptive'
     * @default 'block'
     */
    @Input() thyMode: ThySegmentedMode = 'block';

    /**
     * 是否属于禁用状态
     * @default false
     */
    @Input() @InputBoolean() thyDisabled = false;

    /**
     * 当前激活的选项的索引
     * @default 0
     */
    @Input() @InputNumber() set thyActive(index: number) {
        if (isNumber(index) && index > -1) {
            this.selectedIndex = index;
        }
    }

    /**
     * 自定义选项的渲染模板
     * @default null
     */
    @Input() thyLabelTemplate: TemplateRef<{ $implicit: thySegmentedOption; index: number }> | null = null;

    /**
     * 选项被选中的回调事件
     */
    @Output() readonly thyOptionSelect = new EventEmitter<ThySegmentedEvent>();

    public selectedIndex: number = 0;

    public transitionedToIndex: number = -1;

    public animationState: null | { value: string; params: ThumbAnimationProps } = null;

    public normalizedOptions: thySegmentedOption[] = [];

    private onTouchedCallback: () => void = noop;

    private onChangeCallback: (_: any) => void = noop;

    constructor(private cdr: ChangeDetectorRef) {}

    handleOptionClick(option: thySegmentedOption, index: number): void {
        if (this.thyDisabled) {
            return;
        }
        this.changeSelectedIndex(index);
        this.onChangeCallback(index);
        this.thyOptionSelect.emit({ option: option, index: index });
    }

    handleThumbAnimationDone(e: any): void {
        if (e.fromState === 'from') {
            this.selectedIndex = this.transitionedToIndex;
            this.transitionedToIndex = -1;
            this.animationState = null;
            this.cdr.detectChanges();
        }
    }

    writeValue(value: number | null): void {
        if (typeof value === 'number' && value > -1) {
            this.changeSelectedIndex(value);
            this.cdr.markForCheck();
        }
    }

    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }

    trackByFn(index: number, item: thySegmentedOption) {
        return item.value;
    }

    private changeSelectedIndex(index: number): void {
        if (!this.listOfOptions || this.selectedIndex === -1 || this.selectedIndex === index) {
            return;
        }

        this.animationState = {
            value: 'from',
            params: getThumbAnimationProps(this.listOfOptions.get(this.selectedIndex)!.nativeElement!)
        };
        this.selectedIndex = -1;
        this.cdr.detectChanges();

        this.animationState = {
            value: 'to',
            params: getThumbAnimationProps(this.listOfOptions.get(index)!.nativeElement!)
        };
        this.transitionedToIndex = index;
        this.cdr.detectChanges();
    }
}

function normalizeOptions(customOptions: thySegmentedCustomOption[]): thySegmentedOption[] {
    return customOptions.map(item => {
        if (typeof item === 'string' || typeof item === 'number') {
            return {
                labelText: `${item}`,
                value: item
            } as thySegmentedOption;
        }
        return item as thySegmentedOption;
    });
}

function getThumbAnimationProps(element: HTMLElement): ThumbAnimationProps {
    return {
        transform: element.offsetLeft,
        width: element.clientWidth
    };
}
