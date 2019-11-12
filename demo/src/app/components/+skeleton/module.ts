import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoSkeletonSectionComponent } from './skeleton-section.component';
import { DemoSkeletonParagraphComponent } from './paragraph/skeleton-paragraph.component';
import { SharedModule } from '../../shared.module';
import { DemoSkeletonListComponent } from './list/skeleton-list.component';
import { DemoSkeletonBulletListComponent } from './bullet-list/skeleton-bullet-list.component';
import { DemoSkeletonCustomComponent } from './custom/skeleton-custom.component';
import { DemoSkeletonAvatarComponent } from './avatar/skeleton-avatar.component';
import { DemoSkeletonTitleComponent } from './title/skeleton-title.component';

@NgModule({
    declarations: [
        DemoSkeletonSectionComponent,
        DemoSkeletonParagraphComponent,
        DemoSkeletonListComponent,
        DemoSkeletonBulletListComponent,
        DemoSkeletonCustomComponent,
        DemoSkeletonAvatarComponent,
        DemoSkeletonTitleComponent
    ],
    imports: [CommonModule, SharedModule],
    exports: [DemoSkeletonSectionComponent],
    entryComponents: [
        DemoSkeletonParagraphComponent,
        DemoSkeletonListComponent,
        DemoSkeletonBulletListComponent,
        DemoSkeletonCustomComponent,
        DemoSkeletonAvatarComponent,
        DemoSkeletonTitleComponent
    ],
    providers: []
})
export class DemoSkeletonModule {}
