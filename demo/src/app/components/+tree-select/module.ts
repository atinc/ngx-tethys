import { NgModule } from '@angular/core';
import { DemoTreeSelectBasicComponent } from './basic/basic.component';
import { DemoTreeSelectAsyncComponent } from './async/async.component';
import { DemoTreeSelectEmptyComponent } from './empty/empty.component';
import { DemoTreeSelectSizeComponent } from './size/size.component';
import { SharedModule } from '../../shared.module';
import { DemoTreeSelectMultipleComponent } from './multiple/multiple.component';
import { DemoTreeSelectComplexComponent } from './complex/complex.component';

const Components = [
    DemoTreeSelectBasicComponent,
    DemoTreeSelectAsyncComponent,
    DemoTreeSelectEmptyComponent,
    DemoTreeSelectSizeComponent,
    DemoTreeSelectMultipleComponent,
    DemoTreeSelectComplexComponent
];

@NgModule({
    imports: [SharedModule],
    declarations: [...Components],
    entryComponents: [...Components]
})
export class DemoTreeSelectModule {}
