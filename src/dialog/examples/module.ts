import { ThyDialogModule } from 'ngx-tethys/dialog';
import { ThySelectModule } from 'ngx-tethys/select';

import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyDialogFooterLayoutExampleComponent } from './layout/dialog-layout.component';
import { ThyDialogBasicContentComponent } from './basic/dialog-content.component';

export default {
    declarations: [ThyDialogFooterLayoutExampleComponent, ThyDialogBasicContentComponent],
    imports: [CommonModule, FormsModule, ThyDialogModule, CdkScrollableModule, ThySelectModule, ThyButtonModule]
};
