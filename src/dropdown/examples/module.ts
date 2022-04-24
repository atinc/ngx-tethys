import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyActionMenuModule } from 'ngx-tethys/action-menu';
import { ThyDropdownModule } from 'ngx-tethys/dropdown';
import { ThyPopoverModule } from 'ngx-tethys/popover';
import { ThySpaceModule } from 'ngx-tethys/space';
import { FormsModule } from '@angular/forms';
import { ThyFormModule, ThyInputModule, ThyInputNumberModule, ThySelectModule } from 'ngx-tethys';
import { ThyDropdownIconExampleComponent } from './icon/icon.component';
import { ThyDropdownTypeExampleComponent } from './type/type.component';
import { ThyDropdownBasicExampleComponent } from './basic/basic.component';
import { ThyDropdownGroupExampleComponent } from './group/group.component';
import { ThyDropdownSplitExampleComponent } from './split/split.component';
import { ThyDropdownOptionsExampleComponent } from './options/options.component';
import { ThyDropdownSubmenuExampleComponent } from './submenu/submenu.component';
import { ThyDropdownTriggerExampleComponent } from './trigger/trigger.component';
import { ThyDropdownDisabledExampleComponent } from './disabled/disabled.component';
import { NgModule } from '@angular/core';

const COMPONENTS = [
    ThyDropdownIconExampleComponent,
    ThyDropdownTypeExampleComponent,
    ThyDropdownBasicExampleComponent,
    ThyDropdownGroupExampleComponent,
    ThyDropdownSplitExampleComponent,
    ThyDropdownOptionsExampleComponent,
    ThyDropdownSubmenuExampleComponent,
    ThyDropdownTriggerExampleComponent,
    ThyDropdownDisabledExampleComponent
];

@NgModule({
    declarations: COMPONENTS,
    entryComponents: COMPONENTS,
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
        ThyInputNumberModule
    ],
    exports: COMPONENTS
})
export class DropdownExampleModule {}
