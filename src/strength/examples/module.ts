import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyStrengthModule } from 'ngx-tethys/strength';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyStrengthBasicExampleComponent } from './basic/basic.component';
import { ThyStrengthCustomExampleComponent } from './custom/custom.component';

const COMPONENTS = [ThyStrengthBasicExampleComponent, ThyStrengthCustomExampleComponent];

@NgModule({
    imports: [CommonModule, ThyStrengthModule, FormsModule, ThyButtonModule],
    exports: COMPONENTS,
    declarations: COMPONENTS,
    providers: []
})
export class ThyStrengthExamplesModule {}
