import { Directive, HostBinding, Input } from '@angular/core';
import { inputValueToBoolean } from '../../util/helpers';

export type ThyRowJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between';
export type ThyRowAlign = 'top' | 'middle' | 'bottom';

@Directive({
    selector: '[thyRow]',
    host: {
        class: 'thy-row'
    }
})
export class ThyRowDirective {
    @Input() thyGutter: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number; xxl?: number };
    @Input() thyAlign: ThyRowAlign | null = null;
    @Input() thyJustify: ThyRowJustify | null = null;

    constructor() {}
}
