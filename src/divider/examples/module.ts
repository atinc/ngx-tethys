import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NgxTethysModule } from 'ngx-tethys';

import { ThyDividerBasicExampleComponent } from './basic/basic.component';
import { ThyDividerWithTextExampleComponent } from './with-text/with-text.component';

const COMPONENTS = [ThyDividerBasicExampleComponent, ThyDividerWithTextExampleComponent];

@NgModule({
    declarations: COMPONENTS,
    entryComponents: COMPONENTS,
    imports: [CommonModule, FormsModule, NgxTethysModule],
    exports: COMPONENTS
})
export class ThyDividerExamplesModule {}
