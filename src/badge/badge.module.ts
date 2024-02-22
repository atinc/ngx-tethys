import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyBadge } from './badge.component';

@NgModule({
    imports: [CommonModule, ThyBadge],
    exports: [ThyBadge]
})
export class ThyBadgeModule {
    constructor() {}
}
