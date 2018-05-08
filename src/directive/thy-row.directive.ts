import { Directive, HostBinding, Input } from '@angular/core';
import { inputValueToBoolean } from '../util/helpers';

@Directive({
    selector: '[thyRow]'
})
export class ThyRowDirective {

    @HostBinding('class.row') _isRow = true;

    @HostBinding('class.no-gutter') _isNoGutter = false;

    @Input()
    set thyNoGutter(value: boolean) {
        this._isNoGutter = inputValueToBoolean(value);
    }

}
