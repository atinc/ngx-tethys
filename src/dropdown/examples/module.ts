import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyActionMenuModule } from 'ngx-tethys/action-menu';
import { ThyDropdownModule } from 'ngx-tethys/dropdown';
import { ThyPopoverModule } from 'ngx-tethys/popover';
import { ThySpaceModule } from 'ngx-tethys/space';
import { FormsModule } from '@angular/forms';
import { ThyFormModule } from 'ngx-tethys/form';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThySelectModule } from 'ngx-tethys/select';
import { ThyInputNumberModule } from 'ngx-tethys/input-number';
import { ThyDividerModule } from 'ngx-tethys/divider';
import { ThyActionModule } from 'ngx-tethys/action';
import { ThyListModule } from 'ngx-tethys/list';
import { CustomMenuComponent } from './component/custom-menu.component';
import { ThySwitchModule } from 'ngx-tethys/switch';

export default {
    declarations: [CustomMenuComponent],
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
        FormsModule,
        ThyInputNumberModule,
        ThyDividerModule,
        ThyActionModule,
        ThyListModule,
        ThySwitchModule
    ]
};
