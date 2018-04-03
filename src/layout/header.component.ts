import { Component, HostBinding, Input } from '@angular/core';
import { inputValueToBoolean } from '../util/helpers';
@Component({
    selector: 'thy-header',
    preserveWhitespaces: false,
    template: `
    <ng-content></ng-content>
    `
})
export class ThyHeaderComponent {

    @HostBinding('class.thy-layout-header') thyLayoutHeaderClass = true;

    @HostBinding('class.header-has-border') _thyHasBorder = false;

    @Input('thyHasBorder')
    set thyHasBorder(value: string) {
        this._thyHasBorder = inputValueToBoolean(value);
    }
}
