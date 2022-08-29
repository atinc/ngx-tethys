import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThySkeletonModule } from 'ngx-tethys/skeleton';
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
    providers: []
})
export class ThySkeletonExamplesModule {}
