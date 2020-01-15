import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    TemplateRef
} from '@angular/core';

import { DisabledDateFn, PanelMode, SupportTimeOptions } from '../../standard-types';
import { CandyDate } from '../../../core';
import { FunctionProp } from '../../../util/helpers';

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
    @Input() selectedValue: CandyDate[]; // Range ONLY
    @Input() hoverValue: CandyDate[]; // Range ONLY

    @Input() panelMode: PanelMode;
    @Output() readonly panelModeChange = new EventEmitter<PanelMode>();

    @Input() value: CandyDate;

    @Output() readonly headerChange = new EventEmitter<CandyDate>();
    @Output() readonly selectDate = new EventEmitter<CandyDate>();
    @Output() readonly dayHover = new EventEmitter<CandyDate>();

    prefixCls = 'thy-calendar';

    constructor() {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.value && !this.value) {
            this.value = new CandyDate();
        }
    }

    // The value real changed to outside
    onSelectDate(date: CandyDate | Date): void {
        const value = date instanceof CandyDate ? date : new CandyDate(date);
        this.selectDate.emit(value);
    }
}
