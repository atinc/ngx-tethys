import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyIconModule } from 'ngx-tethys/icon';
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
import { ImmediateMenuComponent } from './immediate-render/immediate-menu.component';

export default {
    declarations: [CustomMenuComponent, ImmediateMenuComponent],
    imports: [
        ThyDropdownModule,
        ThyButtonModule,
        ThyIconModule,
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
