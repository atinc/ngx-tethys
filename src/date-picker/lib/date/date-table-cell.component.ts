import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { isEmpty, isFunction, isString, isTemplateRef, isUndefinedOrNull } from 'ngx-tethys/util';
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
    private datePickerConfigService = inject(ThyDatePickerConfigService);

    isTemplateRef = isTemplateRef;

    readonly prefixCls = input<'thy-calendar' | 'thy-calendar-full'>();

    readonly cell = input<DateCell>();

    isNonEmptyString = (v: any) => isEmpty(v) && isString(v);

    readonly functionRenderResult = computed(() => {
        const renderFn = this.cellRender();
        if (!isFunction(renderFn)) {
            return false;
        }

        const result = renderFn(this.cell()!.value!);
        return !isUndefinedOrNull(result);
    });

    cellRender = computed(() => {
        return this.cell()?.dateCellRender || this.datePickerConfigService.config?.dateCellRender;
    });

    cellClick(event: Event) {
        event.stopPropagation();
        this.cell()?.onClick();
    }
}
