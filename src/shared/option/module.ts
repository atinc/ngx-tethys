/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyListOption } from './list-option/list-option.component';
import { ThyOptionGroup } from './option-group.component';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyOption } from './option.component';
import { ThyOptionRender } from './option-render.component';
import { ThySelectOptionGroup } from './group/option-group.component';
import { ThyOptionGroupRender } from './group/option-group-render.component';

@NgModule({
    imports: [
        CommonModule,
        ThyIconModule,
        ThyListOption,
        ThyOptionGroup,
        ThyOption,
        ThyOptionRender,
        ThySelectOptionGroup,
        ThyOptionGroupRender
    ],
    exports: [ThyListOption, ThyOptionGroup, ThyOption, ThyOptionRender, ThySelectOptionGroup, ThyOptionGroupRender]
})
export class ThyOptionModule {}
