import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { ThyCanDisable, mixinDisabled, ThyCanDisableCtor, MixinBase } from 'ngx-tethys/core';

const _MixinBase: ThyCanDisableCtor & typeof MixinBase = mixinDisabled(MixinBase);

/**
 * @private
 */
@Component({
    selector: 'thy-list-option-group,[thy-list-option-group]',
    template: '<ng-content></ng-content>',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class ThyOptionGroup extends _MixinBase implements ThyCanDisable {
    set thyDisabled(value: any) {
        this.thyDisabled = value;
    }
}
