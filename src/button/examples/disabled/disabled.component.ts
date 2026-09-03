import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThyButton, ThyButtonAppearance, ThyButtonType } from 'ngx-tethys/button';
import { ThySpace, ThySpaceItemDirective } from 'ngx-tethys/space';

@Component({
    selector: 'thy-button-disabled-example',
    templateUrl: './disabled.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyButton, ThySpace, ThySpaceItemDirective]
})
export class ThyButtonDisabledExampleComponent {
    appearances: { value: ThyButtonAppearance; label: string }[] = [
        { value: 'fill', label: 'fill' },
        { value: 'outline', label: 'outline' },
        { value: 'link', label: 'link' }
    ];

    types: { value: ThyButtonType; label: string }[] = [
        { value: 'default', label: 'Default' },
        { value: 'primary', label: 'Primary' },
        { value: 'info', label: 'Info' },
        { value: 'warning', label: 'Warning' },
        { value: 'danger', label: 'Danger' },
        { value: 'success', label: 'Success' }
    ];
}
