import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { ThyGridModule } from 'ngx-tethys/grid';
import { ThyListModule } from 'ngx-tethys/list';
import { ThyTableModule } from 'ngx-tethys/table';

import { ThySkeletonComponent } from './skeleton.component';
import { ThySkeletonRectangleComponent } from './skeleton-rectangle.component';
import { ThySkeletonCircleComponent } from './skeleton-circle.component';
import { ThySkeletonListComponent } from './stylized/list.component';
import { ThySkeletonParagraphComponent } from './stylized/paragraph.component';
import { ThySkeletonBulletListComponent } from './stylized/bullet-list.component';
import { ThySkeletonTableComponent } from './stylized/table.component';

const components = [
    ThySkeletonComponent,
    ThySkeletonRectangleComponent,
    ThySkeletonCircleComponent,
    ThySkeletonListComponent,
    ThySkeletonParagraphComponent,
    ThySkeletonBulletListComponent,
    ThySkeletonTableComponent
];
@NgModule({
    declarations: components,
    imports: [CommonModule, PortalModule, ThyGridModule, ThyListModule, ThyTableModule],
    exports: components,
    providers: []
})
export class ThySkeletonModule {}
