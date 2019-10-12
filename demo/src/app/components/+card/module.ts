import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { DemoCardBasicComponent } from './basic/basic.component';
import { DemoCardCustomHeaderComponent } from './custom-header/custom-header.component';
import { DemoCardContentScrollComponent } from './content-scroll/content-scroll.component';

@NgModule({
    declarations: [DemoCardBasicComponent, DemoCardCustomHeaderComponent, DemoCardContentScrollComponent],
    imports: [SharedModule],
    exports: [DemoCardBasicComponent],
    entryComponents: [DemoCardBasicComponent, DemoCardCustomHeaderComponent, DemoCardContentScrollComponent],
    providers: []
})
export class DemoCardModule {}
