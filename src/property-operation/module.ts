import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyFlexibleTextModule } from 'ngx-tethys/flexible-text';
import { ThyIconModule } from 'ngx-tethys/icon';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyPropertyOperationGroup } from './group/property-operation-group.component';
import { ThyPropertyOperation } from './property-operation.component';

@NgModule({
    imports: [
        CommonModule,
        ThyButtonModule,
        ThyIconModule,
        ThyFlexibleTextModule,
        ThyPropertyOperation,
        ThyPropertyOperationGroup
    ],
    exports: [ThyPropertyOperation, ThyPropertyOperationGroup]
})
export class ThyPropertyOperationModule {}
