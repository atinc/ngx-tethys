import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { ThyGridModule } from 'ngx-tethys/grid';
import { ThyListModule } from 'ngx-tethys/list';

import { ThySkeleton } from './skeleton.component';
import { ThySkeletonRectangle } from './skeleton-rectangle.component';
import { ThySkeletonCircle } from './skeleton-circle.component';
import { ThySkeletonList } from './stylized/list.component';
import { ThySkeletonParagraph } from './stylized/paragraph.component';
import { ThySkeletonBulletList } from './stylized/bullet-list.component';

const components = [
    ThySkeleton,
    ThySkeletonRectangle,
    ThySkeletonCircle,
    ThySkeletonList,
    ThySkeletonParagraph,
    ThySkeletonBulletList
];
@NgModule({
    imports: [CommonModule, PortalModule, ThyGridModule, ThyListModule, ...components],
    exports: components,
    providers: []
})
export class ThySkeletonModule {}
