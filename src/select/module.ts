import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThySelectComponent } from './select.component';
import { ThyInputModule } from '../input/module';
import { ThyOptionComponent } from './option.component';
import { ThySelectCustomComponent } from './select-custom.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ThyInputModule,
    ],
    declarations: [
        ThySelectComponent,
        ThyOptionComponent,
        ThySelectCustomComponent,
    ],
    exports: [
        ThySelectComponent,
        ThyOptionComponent,
        ThySelectCustomComponent,
    ]
})
export class ThySelectModule {

}
