import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyLabelModule } from 'ngx-tethys';
import { ThyLabelBasicExampleComponent } from './basic/basic.component';
import { ThyLabelSizeExampleComponent } from './size/size.component';
import { ThyLabelTypeExampleComponent } from './type/type.component';

const COMPONENTS = [ThyLabelBasicExampleComponent, ThyLabelSizeExampleComponent, ThyLabelTypeExampleComponent];

@NgModule({
    declarations: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    imports: [CommonModule, FormsModule, ThyLabelModule],
    exports: [...COMPONENTS]
})
export class ThyLabelExamplesModule {}
