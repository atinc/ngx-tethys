import { Directive, OnInit, Signal, effect, inject, input, model, output } from '@angular/core';
import { ThyPanelMode } from '../../standard-types';
import { TinyDate } from 'ngx-tethys/util';
import { DateHelperService } from '../../date-helper.service';
import { injectLocale, ThyDatePickerLocale } from 'ngx-tethys/i18n';

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
export abstract class CalendarHeader implements OnInit {
    dateHelper = inject(DateHelperService);

    locale: Signal<ThyDatePickerLocale> = injectLocale('datePicker');

    readonly showSuperPreBtn = input<boolean>(true);

    readonly showSuperNextBtn = input<boolean>(true);

    readonly showPreBtn = input<boolean>(true);

    readonly showNextBtn = input<boolean>(true);

    readonly value = model<TinyDate>();

    readonly valueChange = output<TinyDate>();

    readonly panelModeChange = output<ThyPanelMode>();

    abstract getSelectors(): PanelSelector[];

    prefixCls = 'thy-calendar';

    selectors: PanelSelector[];

    constructor() {
        effect(() => {
            if (this.value()) {
                this.render();
            }
        });
    }

    ngOnInit(): void {
        if (!this.value()) {
            this.value.set(new TinyDate());
        }
        this.selectors = this.getSelectors();
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
        if (this.value()) {
            this.selectors = this.getSelectors();
        }
    }

    private gotoMonth(amount: number): void {
        this.changeValue(this.value().addMonths(amount));
    }

    private gotoYear(amount: number): void {
        this.changeValue(this.value().addYears(amount));
    }

    public changeValue(value: TinyDate): void {
        if (this.value() !== value) {
            this.value.set(value);
            this.valueChange.emit(value);
            this.render();
        }
    }

    formatDateTime(format: string): string {
        return this.dateHelper.format(this.value().nativeDate, format);
    }
}
