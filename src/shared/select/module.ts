/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThySelectControlComponent } from './select-control/select-control.component';
import { FormsModule } from '@angular/forms';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyLabelModule } from 'ngx-tethys/label';

@NgModule({
    imports: [CommonModule, FormsModule, ThyIconModule, ThyLabelModule],
    exports: [ThySelectControlComponent],
    declarations: [ThySelectControlComponent]
})
export class ThySelectCommonModule {}
