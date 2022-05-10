import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThySkeletonModule } from 'ngx-tethys/skeleton';
import { ThyFormModule } from 'ngx-tethys/form';
import { ThySelectModule } from 'ngx-tethys/select';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThySkeletonParagraphExampleComponent } from './paragraph/paragraph.component';
import { ThySkeletonListExampleComponent } from './list/list.component';
import { ThySkeletonBulletListExampleComponent } from './bullet-list/bullet-list.component';
import { ThySkeletonAvatarExampleComponent } from './avatar/avatar.component';
import { ThySkeletonTitleExampleComponent } from './title/title.component';
import { ThySkeletonCustomExampleComponent } from './custom/custom.component';

const COMPONENTS = [
    ThySkeletonParagraphExampleComponent,
    ThySkeletonListExampleComponent,
    ThySkeletonBulletListExampleComponent,
    ThySkeletonAvatarExampleComponent,
    ThySkeletonTitleExampleComponent,
    ThySkeletonCustomExampleComponent
];

@NgModule({
    declarations: COMPONENTS,
    entryComponents: COMPONENTS,
    imports: [CommonModule, FormsModule, ThyInputModule, ThySkeletonModule, ThyFormModule, ThySelectModule],
    exports: COMPONENTS,
    providers: []
})
export class ThySkeletonExamplesModule {}
