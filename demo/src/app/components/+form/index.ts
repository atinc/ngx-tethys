import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { DemoFormSectionComponent } from './form-section.component';
import { DemoFormModalComponent } from './modal/form-modal.component';
import { DemoFormHorizontalComponent } from './basic/horizontal/form-horizontal.component';
import { DemoFormVerticalComponent } from './basic/vertical/form-vertical.component';
import { DemoFormInlineComponent } from './basic/inline/form-inline.component';

@NgModule({
    declarations: [
        DemoFormSectionComponent,
        DemoFormHorizontalComponent,
        DemoFormVerticalComponent,
        DemoFormInlineComponent,
        DemoFormModalComponent
    ],
    entryComponents: [
        DemoFormHorizontalComponent,
        DemoFormVerticalComponent,
        DemoFormInlineComponent,
        DemoFormModalComponent
    ],
    imports: [SharedModule],
    exports: [DemoFormSectionComponent]
})
export class DemoFormModule {}
