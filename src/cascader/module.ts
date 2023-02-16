import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyCascaderComponent } from './cascader.component';
import { ThyCascaderOptionComponent } from './cascader-li.component';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyEmptyModule } from 'ngx-tethys/empty';
import { ThyCheckboxModule } from 'ngx-tethys/checkbox';
import { ThySelectCommonModule } from 'ngx-tethys/shared';
import { ThyFlexibleTextModule } from 'ngx-tethys/flexible-text';

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
        ThyFlexibleTextModule
    ],
    declarations: [ThyCascaderComponent, ThyCascaderOptionComponent],
    exports: [ThyCascaderComponent]
})
export class ThyCascaderModule {}
