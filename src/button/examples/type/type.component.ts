import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThyButton, ThyButtonType } from 'ngx-tethys/button';
import { ThySpace, ThySpaceItemDirective } from 'ngx-tethys/space';

@Component({
    selector: 'thy-button-type-example',
    templateUrl: './type.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyButton, ThySpace, ThySpaceItemDirective]
})
export class ThyButtonTypeExampleComponent {
    types: { value: ThyButtonType; label: string }[] = [
        { value: 'default', label: 'Default' },
        { value: 'primary', label: 'Primary' },
        { value: 'info', label: 'Info' },
        { value: 'warning', label: 'Warning' },
        { value: 'danger', label: 'Danger' },
        { value: 'success', label: 'Success' }
    ];
}
