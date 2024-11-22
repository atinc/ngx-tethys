import { NgModule } from '@angular/core';
import { ThyAutocompleteBasicExampleComponent } from './basic/basic.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyAutocompleteModule } from 'ngx-tethys/autocomplete';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThyAutocompleteCustomExampleComponent } from './custom/custom.component';
import { ThyAutocompleteAutofocusExampleComponent } from './autofocus/autofocus.component';
import { ThyAutocompleteActiveExampleComponent } from './active/active.component';
import { ThyAutocompleteInputSearchExampleComponent } from './input-search/input-search.component';
import { ThyAutocompleteEmptyExampleComponent } from './empty/empty.component';

const COMPONENTS = [
    ThyAutocompleteBasicExampleComponent,
    ThyAutocompleteCustomExampleComponent,
    ThyAutocompleteActiveExampleComponent,
    ThyAutocompleteAutofocusExampleComponent,
    ThyAutocompleteInputSearchExampleComponent,
    ThyAutocompleteEmptyExampleComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, FormsModule, ThyIconModule, ThyAutocompleteModule, ThyInputModule, ThySharedModule],
    exports: [...COMPONENTS]
})
export class ThyAutocompleteExamplesModule {}
