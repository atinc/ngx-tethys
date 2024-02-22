import {
    Component,
    HostBinding,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
    OnInit,
    ChangeDetectorRef,
    forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThyButtonIcon } from 'ngx-tethys/button';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyTooltipDirective } from 'ngx-tethys/tooltip';
import { ThyAction } from 'ngx-tethys/action';
import { NgIf } from '@angular/common';
import { InputNumber } from 'ngx-tethys/core';

export type ThyArrowSwitcherTheme = 'default' | 'lite';
export interface ThyArrowSwitcherEvent {
    index: number;
    event: Event;
}

/**
 * 上下条切换组件
 * @name thy-arrow-switcher
 * @order 10
 */
@Component({
    selector: 'thy-arrow-switcher',
    templateUrl: './arrow-switcher.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThyArrowSwitcher),
            multi: true
        }
    ],
    standalone: true,
    imports: [NgIf, ThyAction, ThyTooltipDirective, ThyIcon, ThyButtonIcon]
})
export class ThyArrowSwitcher implements OnInit, ControlValueAccessor {
    @HostBinding('class.thy-arrow-switcher') _isArrowSwitcher = true;

    @HostBinding('class.thy-arrow-switcher-small') _isSmallSize = false;

    total: number;

    theme: ThyArrowSwitcherTheme = 'default';

    /**
     * 点击上一条事件
     */
    @Output() thyPrevious = new EventEmitter<ThyArrowSwitcherEvent>();

    /**
     * 点击下一条事件
     */
    @Output() thyNext = new EventEmitter<ThyArrowSwitcherEvent>();

    /**
     * 设置上一条 Hover Tooltip 提示
     */
    @Input() thyPreviousTooltip: string;

    /**
     * 设置下一条 Hover Tooltip 提示
     */
    @Input() thyNextTooltip: string;

    /**
     * 展示主题
     * @type default | lite
     * @default default
     */
    @Input() set thyTheme(value: ThyArrowSwitcherTheme) {
        this.theme = value;
    }

    /**
     * 总条数
     */
    @Input()
    @InputNumber()
    set thyTotal(value: number) {
        if (value) {
            this.total = value;
            this.getDisabled();
        }
    }

    /**
     * 尺寸大小，默认尺寸为大号，取值为`sm`时展示小号
     */
    @Input()
    set thySize(size: string) {
        if (size === 'sm') {
            this._isSmallSize = true;
        }
    }

    index = 0;

    disabled = false;

    previousDisabled = false;

    nextDisabled = false;

    private onModelChange: (value: number) => void;

    private onModelTouched: () => void;

    constructor(private cd: ChangeDetectorRef) {}

    ngOnInit() {}

    writeValue(value: number): void {
        if (value >= 0) {
            this.index = value;
            this.getDisabled();
        }
        this.cd.markForCheck();
    }

    registerOnChange(fn: () => void) {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: () => void) {
        this.onModelTouched = fn;
    }

    setDisabledState(isDisable: boolean) {
        this.disabled = isDisable;
    }

    getDisabled() {
        this.previousDisabled = this.index <= 0 || this.disabled;
        this.nextDisabled = this.index >= this.total - 1 || this.disabled;
    }

    onPreviousClick(event: Event) {
        this.index--;
        this.onModelChange(this.index);
        this.getDisabled();
        this.thyPrevious.emit({ index: this.index, event });
    }

    onNextClick(event: Event) {
        this.index++;
        this.onModelChange(this.index);
        this.getDisabled();
        this.thyNext.emit({ index: this.index, event });
    }
}
