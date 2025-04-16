import { Component, inject } from '@angular/core';
import { ThyDialog, ThyDialogConfig } from 'ngx-tethys/dialog';
import { ThyDialogBasicContentComponent } from '../basic/dialog-content.component';
import { ThyCheckbox } from 'ngx-tethys/checkbox';
import { FormsModule } from '@angular/forms';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-dialog-backdrop-example',
    templateUrl: './backdrop.component.html',
    styleUrls: ['./backdrop.component.scss'],
    imports: [ThyCheckbox, FormsModule, ThyButton]
})
export class ThyDialogBackdropExampleComponent {
    private thyDialog = inject(ThyDialog);

    public isCustomBackdropClass: boolean;

    public config: ThyDialogConfig = {
        hasBackdrop: true,
        backdropClosable: true
    };

    openDialog() {
        this.thyDialog.open(ThyDialogBasicContentComponent, this.config);
    }

    setBackdropClass() {
        Object.assign(this.config, {
            backdropClass: this.isCustomBackdropClass ? 'custom-backdrop-class' : ''
        });
    }
}
