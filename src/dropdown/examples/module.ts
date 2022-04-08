import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyActionMenuModule } from 'ngx-tethys/action-menu';
import { ThyDropdownModule } from 'ngx-tethys/dropdown';
import { ThyPopoverModule } from 'ngx-tethys/popover';
import { ThySpaceModule } from 'ngx-tethys/space';
import { FormsModule } from '@angular/forms';
import { ThyFormModule, ThyInputModule, ThySelectModule } from 'ngx-tethys';

export default {
    imports: [
        ThyDropdownModule,
        ThyButtonModule,
        ThyIconModule,
        ThyActionMenuModule,
        ThyPopoverModule,
        ThySpaceModule,
        ThyInputModule,
        ThySelectModule,
        ThyFormModule,
        FormsModule
    ]
};
