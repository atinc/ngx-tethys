import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyInputDirective } from './input.directive';
import { ThyInputGroupComponent } from './input-group.component';
import { ThyInputSearchComponent } from './input-search.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        ThyInputDirective,
        ThyInputGroupComponent,
        ThyInputSearchComponent
    ],
    exports: [
        ThyInputDirective,
        ThyInputGroupComponent,
        ThyInputSearchComponent
    ]
})
export class ThyInputModule {

}
