import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyBreadcrumbComponent } from './breadcrumb.component';
import { ThyBreadcrumbItemComponent } from './breadcrumb-item.component';

@NgModule({
    declarations: [
        ThyBreadcrumbComponent,
        ThyBreadcrumbItemComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ThyBreadcrumbComponent,
        ThyBreadcrumbItemComponent
    ]
})
export class ThyBreadcrumbModule {

}
