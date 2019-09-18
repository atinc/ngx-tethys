import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThySelectComponent } from './select.component';
import { ThyInputModule } from '../input/module';
import { ThySelectCustomComponent } from './custom-select/custom-select.component';
import { ThyOptionComponent } from './custom-select/option.component';
import { ThySelectOptionGroupComponent } from './custom-select/option-group.component';
import { ThyLabelModule } from '../label/label.module';
import { SelectPipes } from './select.pipe';
import { OverlayModule } from '@angular/cdk/overlay';
import { ThyLoadingModule } from '../loading';
import { ThyDirectiveModule } from '../directive';
import { ThyIconModule } from '../icon';
import { ThySelectCommonModule } from '../core';

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
        ThySelectCommonModule
    ],
    declarations: [
        ThySelectComponent,
        ThySelectCustomComponent,
        ThyOptionComponent,
        ThySelectOptionGroupComponent,
        SelectPipes
    ],
    exports: [
        ThySelectComponent,
        ThySelectCustomComponent,
        ThyOptionComponent,
        ThySelectOptionGroupComponent,
        SelectPipes
    ]
})
export class ThySelectModule {}
