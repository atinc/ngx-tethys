import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyInputDirective } from './input.directive';
import { ThyInputComponent } from './input.component';
import { ThyInputGroupComponent } from './input-group.component';
import { ThyInputSearchComponent } from './input-search.component';
import { FormsModule } from '@angular/forms';
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
        ThyInputSearchComponent
    ],
    exports: [
        ThyInputDirective,
        ThyInputComponent,
        ThyInputGroupComponent,
        ThyInputSearchComponent
    ]
})
export class ThyInputModule {

}
