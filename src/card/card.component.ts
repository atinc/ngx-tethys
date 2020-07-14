import { Component, HostBinding, Input } from '@angular/core';
import { coerceBooleanProperty } from '../util/helpers';

@Component({
    selector: 'thy-card',
    template: `
        <ng-content></ng-content>
    `
})
export class ThyCardComponent {
    @HostBinding('class.thy-card') thyCardClass = true;

    @HostBinding('class.thy-card--clear-left-right-padding') clearLeftRightPadding = false;

    @HostBinding('class.thy-card--divided') _thyDivided = false;

    @Input('thyHasLeftRightPadding')
    set thyHasLeftRightPadding(value: any) {
        this.clearLeftRightPadding = !coerceBooleanProperty(value);
    }

    @Input('thyDivided')
    set thyDivided(value: boolean) {
        this._thyDivided = coerceBooleanProperty(value);
    }
}
