import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { ThyGridModule } from 'ngx-tethys/grid';
import { ThyListModule } from 'ngx-tethys/list';

import { ThySkeletonComponent } from './skeleton.component';
import { ThySkeletonRectangleComponent } from './skeleton-rectangle.component';
import { ThySkeletonCircleComponent } from './skeleton-circle.component';
import { ThySkeletonListComponent } from './stylized/list.component';
import { ThySkeletonParagraphComponent } from './stylized/paragraph.component';
import { ThySkeletonBulletListComponent } from './stylized/bullet-list.component';

const components = [
    ThySkeletonComponent,
    ThySkeletonRectangleComponent,
    ThySkeletonCircleComponent,
    ThySkeletonListComponent,
    ThySkeletonParagraphComponent,
    ThySkeletonBulletListComponent
];
@NgModule({
    imports: [CommonModule, PortalModule, ThyGridModule, ThyListModule, ...components],
    exports: components,
    providers: []
})
export class ThySkeletonModule {}
