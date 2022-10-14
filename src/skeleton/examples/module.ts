import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThySkeletonModule, THY_SKELETON_CONFIG } from 'ngx-tethys/skeleton';
import { ThyFormModule } from 'ngx-tethys/form';
import { ThySelectModule } from 'ngx-tethys/select';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyGridModule } from 'ngx-tethys/grid';
import { ThyInputNumberModule } from 'ngx-tethys/input-number';

import { ThySkeletonExampleListComponent } from './list/list.component';
import { ThySkeletonExampleParagraphComponent } from './paragraph/paragraph.component';
import { ThySkeletonExampleCustomComponent } from './custom/custom.component';
import { ThySkeletonExampleBulletListComponent } from './bulletList/bulletList.component';
import { ThySkeletonExampleRectangleComponent } from './rectangle/rectangle.component';
import { ThySkeletonExampleCircleComponent } from './circle/circle.component';
import { ThySwitchModule } from 'ngx-tethys/switch';

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
    imports: [
        ThyInputNumberModule,
        CommonModule,
        FormsModule,
        ThyInputModule,
        ThyGridModule,
        ThySkeletonModule,
        ThyFormModule,
        ThySelectModule,
        ThySwitchModule
    ],
    exports: COMPONENTS,
    providers: [
        {
            provide: THY_SKELETON_CONFIG,
            useValue: {
                thyAnimatedInterval: 1.5,
                thyPrimaryColor: '#F7F7F7',
                thySecondaryColor: '#eeeeee',
                thyAnimated: true,
                thyListConfig: {
                    thyRowWidth: '100%',
                    thyRowHeight: '20px',
                    thyBorderRadius: 4,
                    thyRowsCount: 4
                },
                thyBulletListConfig: {
                    thySize: 20,
                    thyRowWidth: '80%',
                    thyRowHeight: '20px',
                    thyBorderRadius: '4px',
                    thyRowsCount: 5
                },
                thyParagraphConfig: {
                    thyFirstWidth: '33%',
                    thyLastWidth: '66%',
                    thyRowWidth: '100%',
                    thyRowHeight: '20px',
                    thyBorderRadius: '4',
                    thyRowsCount: 4
                }
            }
        }
    ]
})
export class ThySkeletonExamplesModule {}
