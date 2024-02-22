import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyAction } from './action.component';
import { ThyActions } from './actions.component';

@NgModule({
    imports: [CommonModule, ThyIconModule, ThyAction, ThyActions],
    exports: [ThyAction, ThyActions]
})
export class ThyActionModule {}
