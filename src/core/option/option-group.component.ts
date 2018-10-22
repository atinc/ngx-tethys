import {
    Component,
    ViewEncapsulation,
    ChangeDetectionStrategy
} from '@angular/core';
import { ThyCanDisable, mixinDisabled, Constructor, AnonymousClass } from '../behaviors';

@Component({
    selector: 'thy-list-option-group,[thy-list-option-group]',
    template: '<ng-content></ng-content>',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThyOptionGroupComponent extends mixinDisabled(AnonymousClass) implements ThyCanDisable {

    set thyDisabled(value: any) {
        this.thyDisabled = value;
    }
}
