import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyBadgeComponent } from './badge.component';

@NgModule({
    imports: [CommonModule, ThyBadgeComponent],
    exports: [ThyBadgeComponent]
})
export class ThyBadgeModule {
    constructor() {}
}
