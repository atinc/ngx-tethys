import { ThyActionModule } from 'ngx-tethys/action';
import { ThyAvatarModule } from 'ngx-tethys/avatar';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyEmptyModule } from 'ngx-tethys/empty';
import { ThyFlexibleTextModule } from 'ngx-tethys/flexible-text';
import { ThyFormModule } from 'ngx-tethys/form';
import { ThyGridModule } from 'ngx-tethys/grid';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyNotifyModule } from 'ngx-tethys/notify';
import { ThyRadioModule } from 'ngx-tethys/radio';
import { ThySelectModule } from 'ngx-tethys/select';
import { ThySpaceModule } from 'ngx-tethys/space';
import { ThySwitchModule } from 'ngx-tethys/switch';
import { ThyTableModule } from 'ngx-tethys/table';
import { ThyTooltipModule } from 'ngx-tethys/tooltip';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export default {
    imports: [
        CommonModule,
        FormsModule,
        ThyTableModule,
        ThyIconModule,
        ThyFormModule,
        ThyRadioModule,
        ThyTooltipModule,
        ThyFlexibleTextModule,
        ThySelectModule,
        ThyButtonModule,
        ThyNotifyModule,
        ThySpaceModule,
        ThyGridModule,
        ThyEmptyModule,
        ThyActionModule,
        ThyAvatarModule,
        ThySwitchModule
    ]
};
