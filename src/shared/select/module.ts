/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyTagModule } from 'ngx-tethys/tag';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThySelectControl } from './select-control/select-control.component';

@NgModule({
    imports: [CommonModule, FormsModule, ThyIconModule, ThyTagModule, ThySelectControl],
    exports: [ThySelectControl]
})
export class ThySelectCommonModule {}
