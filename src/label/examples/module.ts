import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyLabelModule } from 'ngx-tethys/label';
import { ThyLabelBasicExampleComponent } from './basic/basic.component';
import { ThyLabelSizeExampleComponent } from './size/size.component';
import { ThyLabelTypeExampleComponent } from './type/type.component';
import { ThyLabelPrependAppendExampleComponent } from './prepend-append/prepend-append.component';
import { ThyLabelRemoveExampleComponent } from './remove/remove.component';
import { ThyLabelCustomExampleComponent } from './custom/custom.component';
import { ThyLabelHasHoverExampleComponent } from './has-hover/has-hover.component';

const COMPONENTS = [
    ThyLabelBasicExampleComponent,
    ThyLabelSizeExampleComponent,
    ThyLabelTypeExampleComponent,
    ThyLabelPrependAppendExampleComponent,
    ThyLabelRemoveExampleComponent,
    ThyLabelCustomExampleComponent,
    ThyLabelHasHoverExampleComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    imports: [CommonModule, FormsModule, ThyLabelModule],
    exports: [...COMPONENTS]
})
export class ThyLabelExamplesModule {}
