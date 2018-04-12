import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyActionMenuDirective } from './action-menu.component';

@NgModule({
    declarations: [
        ThyActionMenuDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ThyActionMenuDirective
    ]
})
export class ThyActionMenuModule {

}
