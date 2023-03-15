import { Directive } from '@angular/core';

/**
 * 自定义日期单元格，模版内容会被追加到单元格，可通过 *thyDateCell 传入模板
 */
@Directive({
    selector: '[thyDateCell]',
    exportAs: 'thyDateCell',
    standalone: true
})
export class ThyDateCellDirective {}

/**
 * 自定义右上角操作项，可通过 *thyCalendarHeaderOperation传入模板
 */
@Directive({
    selector: '[thyCalendarHeaderOperation]',
    exportAs: 'thyCalendarHeaderOperation',
    standalone: true
})
export class ThyCalendarHeaderOperationDirective {}
