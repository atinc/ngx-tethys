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

@NgModule({
    imports: [CommonModule, ThyIconModule],
    exports: [ThyListOptionComponent, ThyOptionGroupComponent, ThyOptionComponent, ThySelectOptionGroupComponent],
    declarations: [ThyListOptionComponent, ThyOptionGroupComponent, ThyOptionComponent, ThySelectOptionGroupComponent]
})
export class ThyOptionModule {}
