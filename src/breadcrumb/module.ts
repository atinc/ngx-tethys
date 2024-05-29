import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyBreadcrumb } from './breadcrumb.component';
import { ThyBreadcrumbItem } from './breadcrumb-item.component';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyActionModule } from 'ngx-tethys/action';
import { ThyDropdownModule } from 'ngx-tethys/dropdown';

@NgModule({
    imports: [CommonModule, ThyIconModule, ThyBreadcrumb, ThyBreadcrumbItem, ThyActionModule, ThyDropdownModule],
    exports: [ThyBreadcrumb, ThyBreadcrumbItem]
})
export class ThyBreadcrumbModule {}
