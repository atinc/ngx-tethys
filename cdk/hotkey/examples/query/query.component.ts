import { Component, OnDestroy, OnInit } from '@angular/core';
import { hotkey } from '@tethys/cdk/hotkey';
import { fromEvent, Subscription } from 'rxjs';

@Component({
    selector: 'thy-hotkey-query-example',
    templateUrl: './query.component.html',
    styleUrls: ['./query.component.scss'],
    standalone: false
})
export class ThyHotkeyQueryExampleComponent {
    hotkeyCode = '';

    constructor() {}

    onKeydown(event: KeyboardEvent) {
        event.preventDefault();
        this.hotkeyCode = hotkey(event);
    }
}
