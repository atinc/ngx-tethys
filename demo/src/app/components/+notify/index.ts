import { NgModule } from '@angular/core';
import { THY_NOTIFY_DEFAULT_OPTIONS } from 'ngx-tethys';

import { SharedModule } from '../../shared.module';
import { DemoNotifyBasicComponent } from './basic/notify-basic.component';
import { DemoNotifyCustomHtmlComponent } from './custom-html/notify-custom-html.component';
import { DemoNotifyDetailComponent } from './detail/notify-detail.component';
import { DemoNotifyHoverComponent } from './hover/notify-hover.component';
import { DemoNotifySectionComponent } from './notify-section.component';

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
    exports: [DemoNotifySectionComponent],
    providers: [
        {
            provide: THY_NOTIFY_DEFAULT_OPTIONS,
            useValue: {
                placement: 'topLeft'
            }
        }
    ]
})
export class DemoNotifyModule {}
