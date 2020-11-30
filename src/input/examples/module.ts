import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyInputAppendExampleComponent } from './append/append.component';
import { ThyInputBasicExampleComponent } from './basic/basic.component';
import { ThyInputLabelExampleComponent } from './label/label.component';
import { ThyInputPasswordExampleComponent } from './password/password.component';
import { ThyInputPrependAppendExampleComponent } from './prepend-append/prepend-append.component';
import { ThyInputSearchExampleComponent } from './search/search.component';
import { ThyInputSizeExampleComponent } from './size/size.component';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyActionMenuModule } from 'ngx-tethys/action-menu';
import { ThySharedModule } from 'ngx-tethys/shared';

const COMPONENTS = [
    ThyInputAppendExampleComponent,
    ThyInputBasicExampleComponent,
    ThyInputLabelExampleComponent,
    ThyInputPasswordExampleComponent,
    ThyInputPrependAppendExampleComponent,
    ThyInputSearchExampleComponent,
    ThyInputSizeExampleComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    imports: [CommonModule, FormsModule, ThyInputModule, ThyActionMenuModule, ThySharedModule],
    exports: [...COMPONENTS]
})
export class ThyInputExamplesModule {}
