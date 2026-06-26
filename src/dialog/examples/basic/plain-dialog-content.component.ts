import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';
import { ThyDialogRef } from 'ngx-tethys/dialog';

@Component({
    selector: 'thy-dialog-basic-plain-content',
    templateUrl: './plain-dialog-content.component.html',
    imports: [ThyButton],
    changeDetection: ChangeDetectionStrategy.Eager,
    styles: [
        `
            :host {
                display: block;
                flex: 1 1 auto;
                overflow: auto;
                padding: 0.5rem 2rem 1rem 2rem;
            }
        `
    ]
})
export class ThyDialogBasicPlainContentComponent {
    dialogRef = inject(ThyDialogRef);
}
