import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { DemoRebootFontSizeComponent } from './font-size/font-size.component';
import { DemoRebootSectionComponent } from './reboot-section.component';
import { DemoRebootTextComponent } from './text/text.component';
import { DemoRebootBgComponent } from './bg/bg.component';
import { DemoRebootIconTextComponent } from './icon-text/icon-text.component';
import { DemoRebootEditableComponent } from './editable/editable.component';
import { DemoRebootUtilitiesComponent } from './utilities/utilities.component';

@NgModule({
    declarations: [
        DemoRebootSectionComponent,
        DemoRebootFontSizeComponent,
        DemoRebootTextComponent,
        DemoRebootBgComponent,
        DemoRebootIconTextComponent,
        DemoRebootEditableComponent,
        DemoRebootUtilitiesComponent
    ],
    entryComponents: [
        DemoRebootFontSizeComponent,
        DemoRebootTextComponent,
        DemoRebootBgComponent,
        DemoRebootIconTextComponent,
        DemoRebootEditableComponent,
        DemoRebootUtilitiesComponent
    ],
    imports: [SharedModule],
    exports: [DemoRebootSectionComponent],
    providers: []
})
export class DemoRebootModule {}
