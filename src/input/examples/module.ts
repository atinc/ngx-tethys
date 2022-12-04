import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyActionMenuModule } from 'ngx-tethys/action-menu';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThySelectModule } from 'ngx-tethys/select';
import { ThySpaceModule } from 'ngx-tethys/space';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyGridModule } from 'ngx-tethys/grid';
import { ThyDropdownModule } from 'ngx-tethys/dropdown';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyTooltipModule } from 'ngx-tethys/tooltip';
import { ThyDividerModule } from 'ngx-tethys/divider';
import { ThyActionModule } from 'ngx-tethys/action';
import { ThyHotkeyModule } from '@tethys/cdk/hotkey';

export default {
    imports: [
        CommonModule,
        FormsModule,
        ThyInputModule,
        ThyActionMenuModule,
        ThySharedModule,
        ThySelectModule,
        ThySpaceModule,
        ThyButtonModule,
        ThyGridModule,
        ThyDropdownModule,
        ThyIconModule,
        ThyTooltipModule,
        ThyDividerModule,
        ThyActionModule,
        ThyHotkeyModule
    ]
};
