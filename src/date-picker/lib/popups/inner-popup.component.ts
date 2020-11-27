import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef } from '@angular/core';

import { DisabledDateFn, PanelMode, SupportTimeOptions } from '../../standard-types';
import { TinyDate } from 'ngx-tethys/util';
import { FunctionProp } from 'ngx-tethys/util';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'inner-popup',
    exportAs: 'innerPopup',
    templateUrl: 'inner-popup.component.html'
})
export class InnerPopupComponent implements OnChanges {
    @Input() showWeek: boolean;

    @Input() enablePrev: boolean;
    @Input() enableNext: boolean;
    @Input() disabledDate: DisabledDateFn;
    @Input() dateRender: FunctionProp<TemplateRef<Date> | string>;
    @Input() selectedValue: TinyDate[]; // Range ONLY
    @Input() hoverValue: TinyDate[]; // Range ONLY

    @Input() panelMode: PanelMode;
    @Output() readonly panelModeChange = new EventEmitter<PanelMode>();

    @Input() value: TinyDate;

    @Output() readonly headerChange = new EventEmitter<TinyDate>();
    @Output() readonly selectDate = new EventEmitter<TinyDate>();
    @Output() readonly dayHover = new EventEmitter<TinyDate>();

    prefixCls = 'thy-calendar';

    constructor() {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.value && !this.value) {
            this.value = new TinyDate();
        }
    }

    // The value real changed to outside
    onSelectDate(date: TinyDate | Date): void {
        const value = date instanceof TinyDate ? date : new TinyDate(date);
        this.selectDate.emit(value);
    }
}
