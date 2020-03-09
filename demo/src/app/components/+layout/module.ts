import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { DemoLayoutBasicComponent } from './basic/basic.component';
import { DemoLayoutSidebarComponent } from './sidebar/sidebar.component';
import { DemoLayoutFullComponent } from './full/full.component';
import { DemoLayoutHeaderComponent } from './header/header.component';

@NgModule({
    declarations: [
        DemoLayoutBasicComponent,
        DemoLayoutHeaderComponent,
        DemoLayoutSidebarComponent,
        DemoLayoutFullComponent
    ],
    imports: [SharedModule],
    exports: [DemoLayoutBasicComponent],
    entryComponents: [
        DemoLayoutBasicComponent,
        DemoLayoutHeaderComponent,
        DemoLayoutSidebarComponent,
        DemoLayoutFullComponent
    ],
    providers: []
})
export class DemoLayoutModule {}
