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

export type ThyArrowSwitcherTheme = 'default' | 'lite';
export interface ThyArrowSwitcherEvent {
    index: number;
    event: Event;
}

@Component({
    selector: 'thy-arrow-switcher',
    templateUrl: './arrow-switcher.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThyArrowSwitcherComponent),
            multi: true
        }
    ]
})
export class ThyArrowSwitcherComponent implements OnInit, ControlValueAccessor {
    @HostBinding('class.thy-arrow-switcher') _isArrowSwitcher = true;

    @HostBinding('class.thy-arrow-switcher-small') _isSmallSize = false;

    total: number;

    theme: ThyArrowSwitcherTheme = 'default';

    @Output() thyPrevious = new EventEmitter<ThyArrowSwitcherEvent>();

    @Output() thyNext = new EventEmitter<ThyArrowSwitcherEvent>();

    @Input() set thyTheme(value: ThyArrowSwitcherTheme) {
        this.theme = value;
    }

    @Input()
    set thyTotal(value: number) {
        if (value) {
            this.total = value;
            this.getDisabled();
        }
    }

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
