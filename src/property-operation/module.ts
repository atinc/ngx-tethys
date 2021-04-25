import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyFlexibleTextModule } from 'ngx-tethys/flexible-text';
import { ThyIconModule } from 'ngx-tethys/icon';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyPropertyOperationGroupComponent } from './group/property-operation-group.component';
import { ThyPropertyOperationComponent } from './property-operation.component';

@NgModule({
    declarations: [ThyPropertyOperationComponent, ThyPropertyOperationGroupComponent],
    imports: [CommonModule, ThyButtonModule, ThyIconModule, ThyFlexibleTextModule],
    exports: [ThyPropertyOperationComponent, ThyPropertyOperationGroupComponent]
})
export class ThyPropertyOperationModule {}
