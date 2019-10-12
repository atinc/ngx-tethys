import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { DemoCardBasicComponent } from './basic/basic.component';
import { DemoCardCustomHeaderComponent } from './custom-header/custom-header.component';
import { DemoCardContentScrollComponent } from './content-scroll/content-scroll.component';
import { DemoCardDividedComponent } from './divided/divided.component';

@NgModule({
    declarations: [
        DemoCardBasicComponent,
        DemoCardCustomHeaderComponent,
        DemoCardContentScrollComponent,
        DemoCardDividedComponent
    ],
    imports: [SharedModule],
    exports: [DemoCardBasicComponent],
    entryComponents: [
        DemoCardBasicComponent,
        DemoCardCustomHeaderComponent,
        DemoCardContentScrollComponent,
        DemoCardDividedComponent
    ],
    providers: []
})
export class DemoCardModule {}
