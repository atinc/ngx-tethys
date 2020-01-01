import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared.module';
import { DemoMentionSectionComponent } from './mention-section.component';
import { DemoMentionBasicComponent } from './basic/basic.component';

@NgModule({
    declarations: [DemoMentionSectionComponent, DemoMentionBasicComponent],
    imports: [CommonModule, SharedModule],
    exports: [],
    providers: [],
    entryComponents: [DemoMentionBasicComponent]
})
export class DemoMentionModule {}
