import { isEmpty, isFunction, isString, isTemplateRef } from 'ngx-tethys/util';

import { Component, computed, inject, input, Input } from '@angular/core';

import { NgTemplateOutlet } from '@angular/common';
import { ThyDatePickerConfigService } from '../../date-picker.service';
import { DateCell } from './types';

/**
 * @private
 */
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[date-table-cell]',
    exportAs: 'dateTableCell',
    templateUrl: './date-table-cell.component.html',
    imports: [NgTemplateOutlet]
})
export class DateTableCell {
    isTemplateRef = isTemplateRef;

    @Input() prefixCls: 'thy-calendar' | 'thy-calendar-full';

    readonly cell = input<DateCell>();

    isNonEmptyString = (v: any) => isEmpty(v) && isString(v);

    isNonEmptyFunction = (v: any) => isFunction(v) && !!isFunction(v);

    datePickerConfigService = inject(ThyDatePickerConfigService);

    cellRender = computed(() => {
        return this.cell()?.dateCellRender || this.datePickerConfigService.config?.dateCellRender;
    });
}
