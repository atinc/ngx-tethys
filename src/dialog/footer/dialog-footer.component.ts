import {
    Component,
    Input,
    HostBinding,
    ChangeDetectionStrategy,
} from '@angular/core';
import { inputValueToBoolean } from '../../util/helpers';

@Component({
    selector: 'thy-dialog-footer',
    template: '<ng-content></ng-content>',
    // changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'thyDialogFooter'
})
export class DialogFooterComponent {
    @HostBinding(`class.dialog-footer`) _isDialogFooter = true;

    @HostBinding(`class.dialog-footer-border-top`)
    showBorderTop = false;

    @Input()
    set thyShowBorderTop(value: string) {
        this.showBorderTop = inputValueToBoolean(value);
    }
}
