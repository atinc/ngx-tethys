import { Directive } from '@angular/core';

/**
 * 自定义日期单元格，模板内容会被追加到单元格，可通过 *thyDateCell 传入模板
 * @name thyDateCell
 */
@Directive({
    selector: '[thyDateCell]',
    exportAs: 'thyDateCell'
})
export class ThyDateCellDirective {}

/**
 * 自定义右上角操作项，可通过 *thyCalendarHeaderOperation传入模板
 * @name thyCalendarHeaderOperation
 */
@Directive({
    selector: '[thyCalendarHeaderOperation]',
    exportAs: 'thyCalendarHeaderOperation'
})
export class ThyCalendarHeaderOperationDirective {}
