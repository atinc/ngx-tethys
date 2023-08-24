import { ThyDropdownModule } from 'ngx-tethys/dropdown';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyMenuModule } from 'ngx-tethys/menu';
import { ThyActionModule } from 'ngx-tethys/action';

import { CommonModule } from '@angular/common';
import { ThyDividerModule } from 'ngx-tethys/divider';
import { ThyGridModule } from 'ngx-tethys/grid';
import { ThyRadioModule } from 'ngx-tethys/radio';
import { FormsModule } from '@angular/forms';

export default {
    imports: [
        CommonModule,
        FormsModule,
        ThyMenuModule,
        ThyGridModule,
        ThyDividerModule,
        ThyIconModule,
        ThyDropdownModule,
        ThyRadioModule,
        ThyActionModule
    ]
};
