import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { DemoTreeBasicComponent } from './basic/tree-basic.component';
import { DemoTreeSectionComponent } from './section.component';
import { DemoTreeAsyncComponent } from './async/tree-async.component';

const COMPONENTS = [DemoTreeSectionComponent, DemoTreeBasicComponent, DemoTreeAsyncComponent];

@NgModule({
    declarations: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    imports: [SharedModule],
    exports: [...COMPONENTS]
})
export class DemoTreeModule {}

export { DemoTreeSectionComponent };
