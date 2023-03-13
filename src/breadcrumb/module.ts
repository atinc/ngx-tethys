import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyBreadcrumbComponent } from './breadcrumb.component';
import { ThyBreadcrumbItemComponent } from './breadcrumb-item.component';
import { ThyIconModule } from 'ngx-tethys/icon';

@NgModule({
    imports: [CommonModule, ThyIconModule, ThyBreadcrumbComponent, ThyBreadcrumbItemComponent],
    exports: [ThyBreadcrumbComponent, ThyBreadcrumbItemComponent]
})
export class ThyBreadcrumbModule {}
