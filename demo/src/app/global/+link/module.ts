import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared.module';
import { DemoLinkSectionComponent } from './link-section.component';
import { DemoLinkBasicComponent } from './basic/link-basic.component';

@NgModule({
    declarations: [DemoLinkSectionComponent, DemoLinkBasicComponent],
    entryComponents: [DemoLinkBasicComponent],
    imports: [SharedModule],
    exports: [DemoLinkSectionComponent],
    providers: []
})
export class DemoLinkModule {}
