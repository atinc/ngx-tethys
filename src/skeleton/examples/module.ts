import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThySkeletonModule, THY_SKELETON_CONFIG } from 'ngx-tethys/skeleton';
import { ThyGridModule } from 'ngx-tethys/grid';

import { ThySkeletonExampleListComponent } from './list/list.component';
import { ThySkeletonExampleParagraphComponent } from './paragraph/paragraph.component';
import { ThySkeletonExampleCustomComponent } from './custom/custom.component';
import { ThySkeletonExampleBulletListComponent } from './bulletList/bulletList.component';
import { ThySkeletonExampleRectangleComponent } from './rectangle/rectangle.component';
import { ThySkeletonExampleCircleComponent } from './circle/circle.component';

const COMPONENTS = [
    ThySkeletonExampleListComponent,
    ThySkeletonExampleBulletListComponent,
    ThySkeletonExampleParagraphComponent,
    ThySkeletonExampleCustomComponent,
    ThySkeletonExampleRectangleComponent,
    ThySkeletonExampleCircleComponent
];

@NgModule({
    declarations: COMPONENTS,
    imports: [CommonModule, ThyGridModule, ThySkeletonModule],
    exports: COMPONENTS,
    providers: [
        {
            provide: THY_SKELETON_CONFIG,
            useValue: {
                thyAnimatedInterval: 1.5,
                thyPrimaryColor: 'var(--gray-70)',
                thySecondaryColor: 'var(--gray-500)',
                thyAnimated: true
            }
        }
    ]
})
export class ThySkeletonExamplesModule {}
