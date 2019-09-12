import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { DemoLayoutBasicComponent } from './basic/basic.component';
import { DemoLayoutSidebarComponent } from './sidebar/sidebar.component';
import { DemoLayoutFullComponent } from './full/full.component';

@NgModule({
    declarations: [DemoLayoutBasicComponent, DemoLayoutSidebarComponent, DemoLayoutFullComponent],
    imports: [SharedModule],
    exports: [DemoLayoutBasicComponent],
    entryComponents: [DemoLayoutBasicComponent, DemoLayoutSidebarComponent, DemoLayoutFullComponent],
    providers: []
})
export class DemoLayoutModule {}
