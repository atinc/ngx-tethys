import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';

import { ThySkeletonComponent } from './skeleton.component';
import { ThySkeletonListComponent } from './stylized/list.component';
import { ThySkeletonBulletListComponent } from './stylized/bullet-list.component';
import { ThySkeletonTitleComponent } from './stylized/title.component';
import { ThySkeletonAvatarComponent } from './stylized/avatar.component';
import { ThySkeletonParagraphComponent } from './stylized/paragraph.component';

@NgModule({
    declarations: [
        ThySkeletonComponent,
        ThySkeletonListComponent,
        ThySkeletonBulletListComponent,
        ThySkeletonAvatarComponent,
        ThySkeletonTitleComponent,
        ThySkeletonParagraphComponent
    ],
    imports: [CommonModule, PortalModule],
    entryComponents: [ThySkeletonComponent],
    exports: [
        ThySkeletonComponent,
        ThySkeletonListComponent,
        ThySkeletonBulletListComponent,
        ThySkeletonTitleComponent,
        ThySkeletonAvatarComponent,
        ThySkeletonParagraphComponent
    ],
    providers: []
})
export class ThySkeletonModule {}
