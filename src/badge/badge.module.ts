import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyBadgeComponent } from './badge.component';

@NgModule({
    declarations: [
        ThyBadgeComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ThyBadgeComponent
    ]
})

export class ThyBadgeModule {
        constructor() { }
}
