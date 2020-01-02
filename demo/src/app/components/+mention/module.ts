import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared.module';
import { DemoMentionSectionComponent } from './mention-section.component';
import { DemoMentionBasicComponent } from './basic/basic.component';
import { DemoMentionContentEditableComponent } from './content-editable/content-editable.component';

@NgModule({
    declarations: [DemoMentionSectionComponent, DemoMentionBasicComponent, DemoMentionContentEditableComponent],
    imports: [CommonModule, SharedModule],
    exports: [],
    providers: [],
    entryComponents: [DemoMentionBasicComponent, DemoMentionContentEditableComponent]
})
export class DemoMentionModule {}
