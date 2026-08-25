import { Component, ChangeDetectionStrategy } from '@angular/core';
import { hotkey } from '@tethys/cdk/hotkey';
import { ThyAlert } from 'ngx-tethys/alert';
import { ThyCopyDirective } from 'ngx-tethys/copy';

@Component({
    selector: 'thy-hotkey-query-example',
    templateUrl: './query.component.html',
    styleUrls: ['./query.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyAlert, ThyCopyDirective]
})
export class ThyHotkeyQueryExampleComponent {
    hotkeyCode = '';

    constructor() {}

    onKeydown(event: KeyboardEvent) {
        event.preventDefault();
        this.hotkeyCode = hotkey(event);
    }
}
