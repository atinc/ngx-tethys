import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { DemoFormSectionComponent } from './form-section.component';
import { DemoFormModalComponent } from './modal/form-modal.component';
import { DemoFormBasicComponent } from './basic/form-basic.component';

@NgModule({
    declarations: [DemoFormSectionComponent, DemoFormBasicComponent, DemoFormModalComponent],
    entryComponents: [DemoFormBasicComponent, DemoFormModalComponent],
    imports: [SharedModule],
    exports: [DemoFormSectionComponent]
})
export class DemoFormModule {}
