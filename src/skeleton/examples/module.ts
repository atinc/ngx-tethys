import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThySkeletonModule, THY_SKELETON_CONFIG } from 'ngx-tethys/skeleton';
import { ThyGridModule } from 'ngx-tethys/grid';
import { ThyRadioModule } from 'ngx-tethys/radio';
import { FormsModule } from '@angular/forms';

import { ThySkeletonExampleListComponent } from './list/list.component';
import { ThySkeletonExampleParagraphComponent } from './paragraph/paragraph.component';
import { ThySkeletonExampleCustomComponent } from './custom/custom.component';
import { ThySkeletonExampleBulletListComponent } from './bulletList/bulletList.component';
import { ThySkeletonExampleRectangleComponent } from './rectangle/rectangle.component';
import { ThySkeletonExampleCircleComponent } from './circle/circle.component';
import { ThySkeletonExampleTableComponent } from './table/table.component';

const COMPONENTS = [
    ThySkeletonExampleListComponent,
    ThySkeletonExampleBulletListComponent,
    ThySkeletonExampleParagraphComponent,
    ThySkeletonExampleCustomComponent,
    ThySkeletonExampleRectangleComponent,
    ThySkeletonExampleCircleComponent,
    ThySkeletonExampleTableComponent
];

@NgModule({
    declarations: COMPONENTS,
    imports: [CommonModule, ThyGridModule, ThySkeletonModule, ThyRadioModule, FormsModule],
    exports: COMPONENTS,
    providers: [
        {
            provide: THY_SKELETON_CONFIG,
            useValue: {
                thyAnimatedInterval: 1.5,
                thyPrimaryColor: '#F7F7F7',
                thySecondaryColor: '#aaaaaa',
                thyAnimated: true
            }
        }
    ]
})
export class ThySkeletonExamplesModule {}
