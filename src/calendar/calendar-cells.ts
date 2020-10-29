import { Directive } from '@angular/core';

@Directive({
    selector: '[thyDateCell]',
    exportAs: 'thyDateCell'
})
export class ThyDateCellDirective {}

@Directive({
    selector: '[thyMonthCell]',
    exportAs: 'thyMonthCell'
})
export class ThyMonthCellDirective {}

@Directive({
    selector: '[thyDateFullCell]',
    exportAs: 'thyDateFullCell'
})
export class ThyDateFullCellDirective {}

@Directive({
    selector: '[thyMonthFullCell]',
    exportAs: 'thyMonthFullCell'
})
export class ThyMonthFullCellDirective {}

@Directive({
    selector: '[thyCalendarHeaderOperation]',
    exportAs: 'thyCalendarHeaderOperation'
})
export class ThyCalendarHeaderOperationDirective {}
