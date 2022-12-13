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
import { ThyTagModule } from 'ngx-tethys/tag';
import { ThyActionModule } from 'ngx-tethys/action';

@NgModule({
    imports: [CommonModule, FormsModule, ThyIconModule, ThyTagModule, ThyActionModule],
    exports: [ThySelectControlComponent],
    declarations: [ThySelectControlComponent]
})
export class ThySelectCommonModule {}
