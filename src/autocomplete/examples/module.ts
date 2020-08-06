import { NgModule } from '@angular/core';
import { ThyAutocompleteBasicExampleComponent } from './basic/basic.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxTethysModule, ThyAutocompleteModule } from 'ngx-tethys';
const COMPONENTS = [ThyAutocompleteBasicExampleComponent];

@NgModule({
    declarations: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    imports: [CommonModule, FormsModule, NgxTethysModule, ThyAutocompleteModule],
    exports: [...COMPONENTS]
})
export class ThyAutocompleteExamplesModule {}
