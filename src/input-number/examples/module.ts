import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyInputNumberModule } from 'ngx-tethys/input-number';
import { ThyInputNumberBasicExampleComponent } from './basic/basic.component';

const COMPONENTS: any[] = [ThyInputNumberBasicExampleComponent];

@NgModule({
    declarations: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    imports: [CommonModule, FormsModule, ThyInputNumberModule],
    exports: [...COMPONENTS]
})
export class ThyInputNumberExamplesModule {}
