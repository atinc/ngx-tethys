import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThySelectComponent } from './select.component';
import { ThyInputModule } from '../input/module';
import { ThySelectCustomComponent } from './select-custom.component';
import { ThyOptionComponent } from './option.component';
// import { ThyOptionListComponent } from './option-list.component';
import { SelectContainerComponent } from './select-container.component';
import { OptionItemComponent } from './option-item.component';
import { ThyLabelModule } from '../label/label.module';
import { SelectPipes } from './select.pipe';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ThyInputModule,
        ThyLabelModule
    ],
    declarations: [
        ThySelectComponent,
        ThySelectCustomComponent,
        ThyOptionComponent,
        SelectContainerComponent,
        OptionItemComponent,
        SelectPipes
    ],
    exports: [
        ThySelectComponent,
        ThySelectCustomComponent,
        ThyOptionComponent,
        SelectPipes
    ]
})
export class ThySelectModule {

}
