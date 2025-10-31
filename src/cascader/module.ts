import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyCheckboxModule } from 'ngx-tethys/checkbox';
import { ThyEmptyModule } from 'ngx-tethys/empty';
import { ThyFlexibleTextModule } from 'ngx-tethys/flexible-text';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThySelectCommonModule } from 'ngx-tethys/shared';
import { ThyCascaderOptionComponent } from './cascader-li.component';
import { ThyCascaderSearchOptionComponent } from './cascader-search-option.component';
import { ThyCascader } from './cascader.component';
import { ThyCascaderOptionsPipe } from './cascader.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        OverlayModule,
        ThyInputModule,
        ThyIconModule,
        ThyEmptyModule,
        ThySelectCommonModule,
        ThyCheckboxModule,
        ThyFlexibleTextModule,
        ThyCascader,
        ThyCascaderOptionComponent,
        ThyCascaderSearchOptionComponent,
        ThyCascaderOptionsPipe
    ],
    exports: [ThyCascader]
})
export class ThyCascaderModule {}
