import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyBreadcrumbComponent } from './breadcrumb.component';
import { ThyBreadcrumbItemComponent } from './breadcrumb-item.component';
import { ThyIconModule } from './../icon/icon.module';

@NgModule({
    declarations: [ThyBreadcrumbComponent, ThyBreadcrumbItemComponent],
    imports: [CommonModule, ThyIconModule],
    exports: [ThyBreadcrumbComponent, ThyBreadcrumbItemComponent]
})
export class ThyBreadcrumbModule {}
