import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { DemoInputNumberSectionComponent } from './input-number-section.component';
import { DemoInputNumberBasicComponent } from './basic/input-number-basic.component';

@NgModule({
    declarations: [DemoInputNumberSectionComponent, DemoInputNumberBasicComponent],
    entryComponents: [DemoInputNumberBasicComponent],
    imports: [SharedModule],
    exports: [DemoInputNumberSectionComponent]
})
export class DemoInputNumberModule {}
