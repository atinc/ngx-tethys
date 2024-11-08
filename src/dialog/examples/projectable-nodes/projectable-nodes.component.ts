import { Component, inject, TemplateRef } from '@angular/core';
import { ThyDialog } from 'ngx-tethys/dialog';
import { ThyDialogBasicContentComponent } from './dialog-content.component';
import { ThyButton } from 'ngx-tethys/button';
import { ThyStealthView } from '@tethys/cdk/dom';

@Component({
    selector: 'thy-dialog-projectable-nodes-example',
    templateUrl: './projectable-nodes.component.html',
    standalone: true,
    imports: [ThyDialogBasicContentComponent, ThyButton, ThyStealthView]
})
export class ThyDialogProjectableNodesExampleComponent {
    private thyDialog = inject(ThyDialog);

    public okType: 'primary' | 'danger';

    open(content: Node[]) {
        this.thyDialog.open(ThyDialogBasicContentComponent, {
            projectableNodes: [content]
        });
    }
}
