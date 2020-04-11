import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThySelectComponent } from './select.component';
import { ThyInputModule } from '../input/module';
import { ThySelectCustomComponent } from './custom-select/custom-select.component';
import { ThyLabelModule } from '../label/label.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { ThyLoadingModule } from '../loading';
import { ThyDirectiveModule } from '../directive';
import { ThyIconModule } from '../icon';
import { ThyOptionModule } from '../core/option/module';
import { ThySelectCommonModule } from '../core/select/module';
import { ThyEmptyModule } from '../empty/empty.module';

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
