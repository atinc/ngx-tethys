import { NgxTethysModule } from 'ngx-tethys';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyFormBasicExampleComponent } from './basic/basic.component';
import { ThyFormModalExampleComponent } from './modal/modal.component';
import { ThyFormLayoutExampleComponent } from './layout/layout.component';
import { ThyFormValidateExampleComponent } from './validate/validate.component';
import { ThyFormFullExampleComponent } from './full/full.component';
import { ThyFormVerticalExampleComponent } from './vertical/vertical.component';
import { ThyFormConfirmExampleComponent } from './confirm/confirm.component';

const COMPONENTS = [
    ThyFormBasicExampleComponent,
    ThyFormLayoutExampleComponent,
    ThyFormModalExampleComponent,
    ThyFormValidateExampleComponent,
    ThyFormConfirmExampleComponent,
    ThyFormVerticalExampleComponent,
    ThyFormFullExampleComponent
];

@NgModule({
    declarations: COMPONENTS,
    entryComponents: COMPONENTS,
    imports: [CommonModule, FormsModule, NgxTethysModule],
    exports: [],
    providers: COMPONENTS
})
export class ThyFormExamplesModule {}
