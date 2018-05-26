import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThySelectComponent } from './select.component';
import { ThyInputModule } from '../input/module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ThyInputModule
    ],
    declarations: [
        ThySelectComponent
    ],
    exports: [
        ThySelectComponent
    ]
})
export class ThySelectModule {

}
