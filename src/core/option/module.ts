/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThyListOptionComponent } from './list-option.component';
import { ThyOptionGroupComponent } from './option-group.component';

@NgModule({
    imports: [CommonModule],
    exports: [ThyListOptionComponent, ThyOptionGroupComponent],
    declarations: [ThyListOptionComponent, ThyOptionGroupComponent]
})
export class ThyOptionModule {}

export * from './list-option.component';
export * from './option-group.component';
