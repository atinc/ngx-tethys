import { Component, Input, HostBinding } from '@angular/core';
import { coerceBooleanProperty } from '../util/helpers';
import { InputBoolean } from '../core';

@Component({
    selector: 'thy-list',
    template: '<ng-content></ng-content>'
})
export class ThyListComponent {
    @Input()
    @InputBoolean()
    set thyDivided(value: boolean) {
        this._isDivided = value;
    }

    @HostBinding(`class.thy-list-divided`) _isDivided = false;

    @HostBinding(`class.thy-list`) _isList = true;

    constructor() {}
}
