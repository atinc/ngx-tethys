import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyActionComponent } from './action.component';

@NgModule({
    declarations: [ThyActionComponent],
    imports: [CommonModule, ThyIconModule],
    exports: [ThyActionComponent]
})
export class ThyActionModule {}
