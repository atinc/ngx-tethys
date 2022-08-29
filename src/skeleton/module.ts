import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { ThyGridModule } from 'ngx-tethys/grid';
import { ThyListModule } from 'ngx-tethys/list';

import { ThySkeletonComponent } from './skeleton.component';
import { ThySkeletonRectangleComponent } from './skeleton-rectangle.component';
import { ThySkeletonCircleComponent } from './skeleton-circle.component';
import { ThySkeletonListComponent } from './skeleton-list.component';
import { ThySkeletonParagraphComponent } from './skeleton-paragraph.component';
import { ThySkeletonBulletListComponent } from './skeleton-bullet-list.component';

const components = [
    ThySkeletonComponent,
    ThySkeletonRectangleComponent,
    ThySkeletonCircleComponent,
    ThySkeletonListComponent,
    ThySkeletonParagraphComponent,
    ThySkeletonBulletListComponent
];
@NgModule({
    declarations: components,
    imports: [CommonModule, PortalModule, ThyGridModule, ThyListModule],
    exports: components,
    providers: []
})
export class ThySkeletonModule {}
