import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyFormModule } from 'ngx-tethys/form';
import { ThyTableModule } from 'ngx-tethys/table';
import { ThyTooltipModule } from 'ngx-tethys/tooltip';
import { ThyFlexibleTextModule } from 'ngx-tethys/flexible-text';
import { ThySelectModule } from 'ngx-tethys/select';
import { ThyRadioModule } from 'ngx-tethys/radio';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyNotifyModule } from 'ngx-tethys/notify';
import { ThySpaceModule } from 'ngx-tethys/space';
import { ThyGridModule } from 'ngx-tethys/grid';
import { ThyEmptyModule } from 'ngx-tethys/empty';
import { ThyActionModule } from 'ngx-tethys/action';

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
        ThyActionModule
    ]
};
