import { ThyAvatarModule } from 'ngx-tethys/avatar';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyDatePickerModule } from 'ngx-tethys/date-picker';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyPropertyModule } from 'ngx-tethys/property';
import { ThySelectModule } from 'ngx-tethys/select';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThyTagModule } from 'ngx-tethys/tag';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export default {
    imports: [
        CommonModule,
        FormsModule,
        ThyButtonModule,
        ThyTagModule,
        ThyInputModule,
        ThyAvatarModule,
        ThyPropertyModule,
        ThySelectModule,
        ThySharedModule,
        ThyDatePickerModule
    ]
};
