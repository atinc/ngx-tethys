import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { DemoNotifySectionComponent } from './notify-section.component';
import { DemoNotifyBasicComponent } from './basic/notify-basic.component';
import { DemoNotifyHoverComponent } from './hover/notify-hover.component';
import { DemoNotifyDetailComponent } from './detail/notify-detail.component';
import { DemoNotifyCustomHtmlComponent } from './custom-html/notify-custom-html.component';

@NgModule({
    declarations: [
        DemoNotifySectionComponent,
        DemoNotifyBasicComponent,
        DemoNotifyHoverComponent,
        DemoNotifyDetailComponent,
        DemoNotifyCustomHtmlComponent
    ],
    entryComponents: [
        DemoNotifySectionComponent,
        DemoNotifyBasicComponent,
        DemoNotifyHoverComponent,
        DemoNotifyDetailComponent,
        DemoNotifyCustomHtmlComponent
    ],
    imports: [SharedModule],
    exports: [DemoNotifySectionComponent]
})
export class DemoNotifyModule {}
