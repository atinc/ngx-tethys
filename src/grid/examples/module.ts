import { ThyGridModule } from 'ngx-tethys/grid';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThyDividerModule } from 'ngx-tethys/divider';
import { ThySwitchModule } from 'ngx-tethys/switch';
import { ThyInputNumberModule } from 'ngx-tethys/input-number';
import { ThyFormModule } from 'ngx-tethys/form';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export default {
    imports: [
        CommonModule,
        ThyGridModule,
        ThySharedModule,
        ThyFormModule,
        ThyDividerModule,
        ThySwitchModule,
        ThyInputNumberModule,
        FormsModule
    ]
};
