import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThyIconModule } from 'ngx-tethys/icon';

import { ThyDivider } from './divider.component';

@NgModule({
    imports: [CommonModule, ThySharedModule, ThyIconModule, ThyDivider],
    exports: [ThyDivider],
    providers: []
})
export class ThyDividerModule {}
