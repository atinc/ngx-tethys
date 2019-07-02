import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThySelectComponent } from './select.component';
import { ThyInputModule } from '../input/module';
import { ThySelectCustomComponent } from './custom-select.component';
import { ThyOptionComponent } from './option.component';
import { ThySelectOptionGroupComponent } from './option-group.component';
import { ThyLabelModule } from '../label/label.module';
import { SelectPipes } from './select.pipe';
import { OverlayModule } from '@angular/cdk/overlay';
import { ThyLoadingModule } from '../loading';
import { ThyDirectiveModule } from '../directive';
import { ThyIconModule } from '../icon';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ThyInputModule,
        ThyLabelModule,
        OverlayModule,
        ThyLoadingModule,
        ThyDirectiveModule,
        ThyIconModule
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
