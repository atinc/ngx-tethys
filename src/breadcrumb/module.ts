import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyBreadcrumb } from './breadcrumb.component';
import { ThyBreadcrumbItem } from './breadcrumb-item.component';
import { ThyIconModule } from 'ngx-tethys/icon';

@NgModule({
    imports: [CommonModule, ThyIconModule, ThyBreadcrumb, ThyBreadcrumbItem],
    exports: [ThyBreadcrumb, ThyBreadcrumbItem]
})
export class ThyBreadcrumbModule {}
