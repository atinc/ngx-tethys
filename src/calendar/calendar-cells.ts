import { Directive } from '@angular/core';

@Directive({
    selector: '[ThyDateCell]',
    exportAs: 'ThyDateCell'
})
export class ThyDateCellDirective {}

@Directive({
    selector: '[ThyMonthCell]',
    exportAs: 'ThyMonthCell'
})
export class ThyMonthCellDirective {}

@Directive({
    selector: '[ThyDateFullCell]',
    exportAs: 'ThyDateFullCell'
})
export class ThyDateFullCellDirective {}

@Directive({
    selector: '[ThyMonthFullCell]',
    exportAs: 'ThyMonthFullCell'
})
export class ThyMonthFullCellDirective {}
