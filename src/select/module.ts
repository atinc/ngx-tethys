import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThySelectComponent } from './select.component';
import { ThyInputModule } from '../input/module';
import { ThySelectCustomComponent } from './select-custom.component';
import { ThyOptionComponent } from './option.component';
import { ThyOptionGroupComponent } from './option-group.component';
import { SelectContainerComponent } from './select-container.component';
import { OptionItemComponent } from './option-item.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ThyInputModule,
    ],
    declarations: [
        ThySelectComponent,
        ThySelectCustomComponent,
        ThyOptionComponent,
        ThyOptionGroupComponent,
        SelectContainerComponent,
        OptionItemComponent
    ],
    exports: [
        ThySelectComponent,
        ThySelectCustomComponent,
        ThyOptionComponent,
        ThyOptionGroupComponent
    ]
})
export class ThySelectModule {

}
