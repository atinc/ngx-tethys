import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyActionComponent } from './action.component';
import { ThyActionsComponent } from './actions.component';

@NgModule({
    declarations: [ThyActionComponent, ThyActionsComponent],
    imports: [CommonModule, ThyIconModule],
    exports: [ThyActionComponent, ThyActionsComponent]
})
export class ThyActionModule {}
