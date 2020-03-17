import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyBreadcrumbComponent } from './breadcrumb.component';
import { ThyBreadcrumbItemComponent } from './breadcrumb-item.component';
import { ThyIconModule } from './../icon/icon.module';
import { ThyDropdownModule } from '../dropdown/module';
import { ThyActionMenuModule } from '../action-menu/action-menu.module';

@NgModule({
    declarations: [ThyBreadcrumbComponent, ThyBreadcrumbItemComponent],
    imports: [CommonModule, ThyIconModule, ThyDropdownModule, ThyActionMenuModule],
    exports: [ThyBreadcrumbComponent, ThyBreadcrumbItemComponent]
})
export class ThyBreadcrumbModule {}
