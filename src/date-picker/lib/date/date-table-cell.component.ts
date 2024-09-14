import { isEmpty, isString, isTemplateRef } from 'ngx-tethys/util';

import { Component, Input } from '@angular/core';

import { DateCell } from './types';
import { NgSwitch, NgSwitchCase, NgTemplateOutlet, NgSwitchDefault, NgIf } from '@angular/common';

/**
 * @private
 */
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[date-table-cell]',
    exportAs: 'dateTableCell',
    templateUrl: './date-table-cell.component.html',
    standalone: true,
    imports: [NgSwitch, NgSwitchCase, NgTemplateOutlet, NgSwitchDefault, NgIf]
})
export class DateTableCell {
    isTemplateRef = isTemplateRef;

    @Input() prefixCls: 'thy-calendar';
    @Input() cell: DateCell;

    isNonEmptyString = (v: any) => isEmpty(v) && isString(v);
}
