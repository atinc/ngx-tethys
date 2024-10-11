import { ThyDialogModule } from 'ngx-tethys/dialog';
import { ThySelectModule } from 'ngx-tethys/select';

import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyMenuModule } from 'ngx-tethys/menu';
import { ThyLayoutModule } from 'ngx-tethys/layout';
import { ThyDialogFooterLayoutExampleComponent } from './layout/dialog-layout.component';
import { ThyDialogBasicContentComponent } from './basic/dialog-content.component';
import { ThyDialogSidebarContentExampleComponent } from './sidebar/dialog-sidebar.component';
import { ThyCheckboxModule } from 'ngx-tethys/checkbox';
import { ThyActionModule } from 'ngx-tethys/action';
import { ThyInputModule } from 'ngx-tethys/input';

export default {
    declarations: [ThyDialogFooterLayoutExampleComponent, ThyDialogBasicContentComponent, ThyDialogSidebarContentExampleComponent],
    imports: [
        CommonModule,
        FormsModule,
        ThyCheckboxModule,
        ThyDialogModule,
        CdkScrollableModule,
        ThySelectModule,
        ThyButtonModule,
        ThyIconModule,
        ThyInputModule,
        ThyMenuModule,
        ThyLayoutModule,
        ThyActionModule,
        ThyInputModule
    ]
};
