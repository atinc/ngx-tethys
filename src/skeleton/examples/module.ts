import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThySkeletonModule } from 'ngx-tethys/skeleton';
import { ThyFormModule } from 'ngx-tethys/form';
import { ThySelectModule } from 'ngx-tethys/select';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyGridModule } from 'ngx-tethys/grid';

import { ThySkeletonBasicComponent } from './basic/basic.component';
import { ThySkeletonAvatarComponent } from './avatar/avatar.component';
import { ThySkeletonListComponent } from './list/list.component';
import { ThySkeletonBulletListComponent } from './bulletList/bulletList.component';
import { ThySkeletonParagraphComponent } from './paragraph/paragraph.component';
import { ThySkeletonCustomComponent } from './custom/custom.component';

const COMPONENTS = [
    ThySkeletonBasicComponent,
    ThySkeletonAvatarComponent,
    ThySkeletonListComponent,
    ThySkeletonBulletListComponent,
    ThySkeletonParagraphComponent,
    ThySkeletonCustomComponent
];

@NgModule({
    declarations: COMPONENTS,
    imports: [CommonModule, FormsModule, ThyInputModule, ThyGridModule, ThySkeletonModule, ThyFormModule, ThySelectModule],
    exports: COMPONENTS,
    providers: []
})
export class ThySkeletonExamplesModule {}
