import { ThyGridModule } from 'ngx-tethys/grid';
import { ThySharedModule } from 'ngx-tethys/shared';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyGridBasicExampleComponent } from './basic/basic.component';

@NgModule({
    imports: [CommonModule, ThyGridModule, ThySharedModule],
    declarations: [ThyGridBasicExampleComponent],
    exports: [ThyGridBasicExampleComponent]
})
export class ThyGridExamplesModule {}
