import { Component, input } from '@angular/core';
import { coerceBooleanProperty } from 'ngx-tethys/util';

@Component({
    selector: 'thy-option-group',
    template: `<ng-content></ng-content>`
})
export class ThySelectOptionGroup {
    readonly thyGroupLabel = input<string>();

    readonly thyDisabled = input(false, { transform: coerceBooleanProperty });
}
