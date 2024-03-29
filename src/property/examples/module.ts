import { ThyAvatarModule } from 'ngx-tethys/avatar';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyDatePickerModule } from 'ngx-tethys/date-picker';
import { ThyDialogModule } from 'ngx-tethys/dialog';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyActionModule } from 'ngx-tethys/action';
import { ThyInputNumberModule } from 'ngx-tethys/input-number';
import { ThyPropertyModule } from 'ngx-tethys/property';
import { ThyDividerModule } from 'ngx-tethys/divider';
import { ThySelectModule } from 'ngx-tethys/select';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThyTagModule } from 'ngx-tethys/tag';
import { ThyTimePickerModule } from 'ngx-tethys/time-picker';
import { ThyTreeSelectModule } from 'ngx-tethys/tree-select';
import { ThyFlexibleTextModule } from 'ngx-tethys/flexible-text';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ThyPropertyEditableDateInnerComponent } from './editable/date.component';

export default {
    imports: [
        CommonModule,
        FormsModule,
        ThyButtonModule,
        ThyTagModule,
        ThyInputModule,
        ThyActionModule,
        ThyInputNumberModule,
        ThyAvatarModule,
        ThyPropertyModule,
        ThyDividerModule,
        ThyDatePickerModule,
        ThySelectModule,
        ThySharedModule,
        ThyDatePickerModule,
        ThyTimePickerModule,
        ThyDialogModule,
        ThyTreeSelectModule,
        ThyFlexibleTextModule
    ],
    declarations: [ThyPropertyEditableDateInnerComponent]
};
