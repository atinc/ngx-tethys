import { Component, Input } from '@angular/core';
import { isNonEmptyString, isTemplateRef } from '../../../util/helpers';
import { DateCell } from './date-table.component';

@Component({
    selector: '[date-table-cell]',
    exportAs: 'dateTableCell',
    templateUrl: './date-table-cell.component.html'
})
export class DateTableCellComponent {
    isTemplateRef = isTemplateRef;
    isNonEmptyString = isNonEmptyString;

    @Input() prefixCls: 'thy-calendar';
    @Input() cell: DateCell;
}
