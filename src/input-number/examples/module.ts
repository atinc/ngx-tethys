import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyInputNumberModule } from 'ngx-tethys/input-number';
import { ThyInputNumberBasicExampleComponent } from './basic/basic.component';
import { ThyInputNumberMaxMinExampleComponent } from './max-min/max-min.component';
import { ThyInputNumberSizeExampleComponent } from './size/size.component';
import { ThyInputNumberStepExampleComponent } from './step/step.component';

const COMPONENTS: any[] = [
    ThyInputNumberBasicExampleComponent,
    ThyInputNumberSizeExampleComponent,
    ThyInputNumberMaxMinExampleComponent,
    ThyInputNumberStepExampleComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    imports: [CommonModule, FormsModule, ThyInputNumberModule],
    exports: [...COMPONENTS]
})
export class ThyInputNumberExamplesModule {}
