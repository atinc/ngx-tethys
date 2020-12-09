import { NgModule } from '@angular/core';
import { ThyAutocompleteBasicExampleComponent } from './basic/basic.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyAutocompleteModule } from 'ngx-tethys/autocomplete';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThySharedModule } from 'ngx-tethys/shared';

const COMPONENTS = [ThyAutocompleteBasicExampleComponent];

@NgModule({
    declarations: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    imports: [CommonModule, FormsModule, ThyIconModule, ThyAutocompleteModule, ThyInputModule, ThySharedModule],
    exports: [...COMPONENTS]
})
export class ThyAutocompleteExamplesModule {}
