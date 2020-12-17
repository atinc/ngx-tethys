import { ThyIconModule } from 'ngx-tethys/icon';
import { ThySharedModule } from 'ngx-tethys/shared';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyEmptyComponent } from './empty.component';
import { ThyEmptyConfig } from './empty.config';

@NgModule({
    declarations: [ThyEmptyComponent],
    imports: [CommonModule, ThySharedModule, ThyIconModule],
    exports: [ThyEmptyComponent],
    providers: [ThyEmptyConfig]
})
export class ThyEmptyModule {}
