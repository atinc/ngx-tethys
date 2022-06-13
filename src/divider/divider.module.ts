import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThyIconModule } from 'ngx-tethys/icon';

import { ThyDividerComponent } from './divider.component';

@NgModule({
    declarations: [ThyDividerComponent],
    imports: [CommonModule, ThySharedModule, ThyIconModule],
    exports: [ThyDividerComponent],
    providers: []
})
export class ThyDividerModule {}
