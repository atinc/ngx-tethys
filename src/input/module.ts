import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyInputDirective } from './input.directive';
import { ThyInput } from './input.component';
import { ThyInputGroup } from './input-group.component';
import { ThyInputSearch } from './input-search.component';
import { FormsModule } from '@angular/forms';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyDividerModule } from 'ngx-tethys/divider';
import { ThyInputCount } from './input-count.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ThySharedModule,
        ThyIconModule,
        ThyDividerModule,
        ThyInputDirective,
        ThyInput,
        ThyInputGroup,
        ThyInputSearch,
        ThyInputCount
    ],
    exports: [ThyInputDirective, ThyInput, ThyInputGroup, ThyInputSearch, ThyInputCount]
})
export class ThyInputModule {}
