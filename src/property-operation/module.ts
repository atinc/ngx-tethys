import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyFlexibleTextModule } from 'ngx-tethys/flexible-text';
import { ThyIconModule } from 'ngx-tethys/icon';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyPropertyOperationGroupComponent } from './group/property-operation-group.component';
import { ThyPropertyOperationComponent } from './property-operation.component';

@NgModule({
    imports: [CommonModule, ThyButtonModule, ThyIconModule, ThyFlexibleTextModule, ThyPropertyOperationComponent, ThyPropertyOperationGroupComponent],
    exports: [ThyPropertyOperationComponent, ThyPropertyOperationGroupComponent]
})
export class ThyPropertyOperationModule {}
