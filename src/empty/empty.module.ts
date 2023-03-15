import { ThyIconModule } from 'ngx-tethys/icon';
import { ThySharedModule } from 'ngx-tethys/shared';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyEmptyComponent } from './empty.component';
import { ThyEmptyConfig } from './empty.config';

@NgModule({
    imports: [CommonModule, ThySharedModule, ThyIconModule, ThyEmptyComponent],
    exports: [ThyEmptyComponent],
    providers: [ThyEmptyConfig]
})
export class ThyEmptyModule {}
