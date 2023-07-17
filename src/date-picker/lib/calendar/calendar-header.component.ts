import { Directive, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { ThyPanelMode } from '../../standard-types';
import { TinyDate } from 'ngx-tethys/util';
import { DateHelperService } from '../../date-helper.service';

export interface PanelSelector {
    className: string;
    title?: string;
    label: string;
    onClick?(): void;
}

/**
 * @private
 */
@Directive()
export abstract class CalendarHeader implements OnInit, OnChanges {
    @Input() showSuperPreBtn: boolean = true;
    @Input() showSuperNextBtn: boolean = true;
    @Input() showPreBtn: boolean = true;
    @Input() showNextBtn: boolean = true;
    @Input() value: TinyDate;
    @Output() readonly valueChange = new EventEmitter<TinyDate>();
    @Output() readonly panelModeChange = new EventEmitter<ThyPanelMode>();

    abstract getSelectors(): PanelSelector[];

    prefixCls = 'thy-calendar';
    selectors: PanelSelector[];

    constructor(public dateHelper: DateHelperService) {}

    ngOnInit(): void {
        if (!this.value) {
            this.value = new TinyDate();
        }
        this.selectors = this.getSelectors();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.value) {
            this.render();
        }
    }

    superPrevious(): void {
        this.gotoYear(-1);
    }

    superNext(): void {
        this.gotoYear(1);
    }

    previous(): void {
        this.gotoMonth(-1);
    }

    next(): void {
        this.gotoMonth(1);
    }

    changePanel(mode: ThyPanelMode, value?: TinyDate): void {
        this.panelModeChange.emit(mode);
    }

    selectorClick(event: Event, selector: PanelSelector) {
        event.stopPropagation();
        return selector ? selector.onClick() : null;
    }

    private render(): void {
        if (this.value) {
            this.selectors = this.getSelectors();
        }
    }

    private gotoMonth(amount: number): void {
        this.changeValue(this.value.addMonths(amount));
    }

    private gotoYear(amount: number): void {
        this.changeValue(this.value.addYears(amount));
    }

    public changeValue(value: TinyDate): void {
        if (this.value !== value) {
            this.value = value;
            this.valueChange.emit(this.value);
            this.render();
        }
    }

    formatDateTime(format: string): string {
        return this.dateHelper.format(this.value.nativeDate, format);
    }
}
