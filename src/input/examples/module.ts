import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThySelectModule } from 'ngx-tethys/select';
import { ThySpaceModule } from 'ngx-tethys/space';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyDividerModule } from 'ngx-tethys/divider';
import { ThyDropdownModule } from 'ngx-tethys/dropdown';
import { ThyFormModule } from 'ngx-tethys/form';
import { ThyGridModule } from 'ngx-tethys/grid';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThySelectModule } from 'ngx-tethys/select';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThySpaceModule } from 'ngx-tethys/space';
import { ThyTagModule } from 'ngx-tethys/tag';
import { ThyTooltipModule } from 'ngx-tethys/tooltip';

export default {
    imports: [
        CommonModule,
        FormsModule,
        ThyInputModule,
        ThyDropdownModule,
        ThySharedModule,
        ThySelectModule,
        ThySpaceModule,
        ThyButtonModule,
        ThyGridModule,
        ThyIconModule,
        ThyTooltipModule,
        ThyDividerModule,
        ThyActionModule,
        ThyTagModule,
        ThyFormModule
    ]
};
