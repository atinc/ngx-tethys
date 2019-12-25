import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { DemoCheckboxBasicComponent } from './basic/basic.component';
import { DemoCheckboxIndeterminateComponent } from './indeterminate/indeterminate.component';
import { DemoCheckboxSectionComponent } from './checkbox-section.component';

@NgModule({
    declarations: [DemoCheckboxSectionComponent, DemoCheckboxBasicComponent, DemoCheckboxIndeterminateComponent],
    entryComponents: [DemoCheckboxBasicComponent, DemoCheckboxIndeterminateComponent],
    imports: [SharedModule],
    exports: [DemoCheckboxSectionComponent]
})
export class DemoCheckboxModule {}
