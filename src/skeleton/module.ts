import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { ThySkeletonComponent } from './skeleton.component';
import { ThySkeletonItemComponent } from './skeleton-item.component';
import { ThyGridModule } from 'ngx-tethys/grid';
import { ThyListModule } from 'ngx-tethys/list';
@NgModule({
    declarations: [ThySkeletonComponent, ThySkeletonItemComponent],
    imports: [CommonModule, PortalModule, ThyGridModule, ThyListModule],
    exports: [ThySkeletonComponent, ThySkeletonItemComponent],
    providers: []
})
export class ThySkeletonModule {}
