/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThyListOptionComponent } from './list-option/list-option.component';
import { ThyOptionGroupComponent } from './option-group.component';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyOptionComponent } from './option.component';
import { ThySelectOptionGroupComponent } from './group/option-group.component';
import { ThyOptionsContainerComponent } from './options-container.component';

@NgModule({
    imports: [
        CommonModule,
        ThyIconModule,
        ThyListOptionComponent,
        ThyOptionGroupComponent,
        ThyOptionComponent,
        ThySelectOptionGroupComponent,
        ThyOptionsContainerComponent
    ],
    exports: [
        ThyListOptionComponent,
        ThyOptionGroupComponent,
        ThyOptionComponent,
        ThySelectOptionGroupComponent,
        ThyOptionsContainerComponent
    ]
})
export class ThyOptionModule {}
