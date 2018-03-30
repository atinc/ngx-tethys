import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyLayoutComponent } from './layout.component';
import { ThyHeaderComponent } from './header.component';
import { ThyContentComponent } from './content.component';

@NgModule({
    declarations: [
        ThyLayoutComponent,
        ThyHeaderComponent,
        ThyContentComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ThyLayoutComponent,
        ThyHeaderComponent,
        ThyContentComponent
    ]
})
export class ThyLayoutModule {

}
