import { ThyDropdownModule } from 'ngx-tethys/dropdown';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyNavModule } from 'ngx-tethys/nav';
import { ThyAlertModule } from 'ngx-tethys/alert';
import { ThyDividerModule } from 'ngx-tethys/divider';
import { ThyCardModule } from 'ngx-tethys/card';
import { ThyActionModule } from 'ngx-tethys/action';
import { ThyButtonModule } from 'ngx-tethys/button';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

export default {
    imports: [
        CommonModule,
        FormsModule,
        ThyNavModule,
        RouterModule,
        ThyDropdownModule,
        ThyIconModule,
        ThyAlertModule,
        ThyDividerModule,
        ThyCardModule,
        ThyButtonModule,
        ThyActionModule
    ]
};
