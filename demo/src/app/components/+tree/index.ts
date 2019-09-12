import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { DemoTreeBasicComponent } from './basic/tree-basic.component';
import { DemoTreeSectionComponent } from './section.component';

const COMPONENTS = [DemoTreeSectionComponent, DemoTreeBasicComponent];

@NgModule({
    declarations: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    imports: [SharedModule],
    exports: [DemoTreeSectionComponent]
})
export class DemoTreeModule {}
