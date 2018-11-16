import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyInputDirective } from './input.directive';
import { ThyInputComponent } from './input.compoent';
import { ThyInputGroupComponent } from './input-group.component';
import { ThyInputSearchComponent } from './input-search.component';
import { ThyInputLabelComponent } from './input-label.component';
import { FormsModule } from '@angular/forms';
import { ThyAutofocusDirective } from '../directive/thy-autofocus.directive';
import { ThyDirectiveModule } from '../directive';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ThyDirectiveModule
    ],
    declarations: [
        ThyInputDirective,
        ThyInputComponent,
        ThyInputGroupComponent,
        ThyInputSearchComponent,
        ThyInputLabelComponent
    ],
    exports: [
        ThyInputDirective,
        ThyInputComponent,
        ThyInputGroupComponent,
        ThyInputSearchComponent,
        ThyInputLabelComponent
    ]
})
export class ThyInputModule {

}
