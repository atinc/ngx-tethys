import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { DemoTreeBasicComponent } from './basic/tree-basic.component';
import { DemoTreeSectionComponent } from './section.component';
import { DemoTreeIconsComponent } from './icons/tree-icons.component';

const COMPONENTS = [DemoTreeSectionComponent, DemoTreeBasicComponent, DemoTreeIconsComponent];

@NgModule({
    declarations: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    imports: [SharedModule],
    exports: [DemoTreeSectionComponent, DemoTreeBasicComponent]
})
export class DemoTreeModule {}

export { DemoTreeSectionComponent };
