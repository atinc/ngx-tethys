import { NgModule } from '@angular/core';
import { DemoActionMenuSectionComponent } from './action-menu-section.component';
import { SharedModule } from '../../shared.module';
import { DemoActionMenuBasicComponent } from './basic/basic.component';
import { DemoActionMenuGroupComponent } from './group/group.component';
import { DemoActionMenuItemComponent } from './item/item.component';

@NgModule({
    declarations: [
        DemoActionMenuSectionComponent,
        DemoActionMenuBasicComponent,
        DemoActionMenuGroupComponent,
        DemoActionMenuItemComponent
    ],
    entryComponents: [DemoActionMenuBasicComponent, DemoActionMenuGroupComponent, DemoActionMenuItemComponent],
    imports: [SharedModule],
    exports: [DemoActionMenuSectionComponent]
})
export class DemoActionMenuModule {}
