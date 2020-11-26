import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThySelectComponent } from './select.component';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThySelectCustomComponent } from './custom-select/custom-select.component';
import { ThyLabelModule } from 'ngx-tethys/label';
import { OverlayModule } from '@angular/cdk/overlay';
import { ThyLoadingModule } from 'ngx-tethys/loading';
import { ThyDirectiveModule } from 'ngx-tethys/directive';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyOptionModule } from 'ngx-tethys/core';
import { ThySelectCommonModule } from 'ngx-tethys/core';
import { ThyEmptyModule } from 'ngx-tethys/empty';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ThyInputModule,
        ThyLabelModule,
        OverlayModule,
        ThyLoadingModule,
        ThyDirectiveModule,
        ThyIconModule,
        ThyEmptyModule,
        ThySelectCommonModule,
        ThyOptionModule
    ],
    declarations: [ThySelectComponent, ThySelectCustomComponent],
    exports: [ThySelectComponent, ThySelectCustomComponent]
})
export class ThySelectModule {}
