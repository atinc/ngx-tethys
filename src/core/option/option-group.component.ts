import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { ThyCanDisable, mixinDisabled, ThyCanDisableCtor, MixinBase } from '../behaviors';

const _MixinBase: ThyCanDisableCtor & typeof MixinBase = mixinDisabled(MixinBase);
@Component({
    selector: 'thy-list-option-group,[thy-list-option-group]',
    template: '<ng-content></ng-content>',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyOptionGroupComponent extends _MixinBase implements ThyCanDisable {
    set thyDisabled(value: any) {
        this.thyDisabled = value;
    }
}
