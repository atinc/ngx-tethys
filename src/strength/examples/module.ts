import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxTethysModule } from 'ngx-tethys';
import { FormsModule } from '@angular/forms';
import { ThyStrengthBasicExampleComponent } from './basic/basic.component';
import { ThyStrengthCustomExampleComponent } from './custom/custom.component';

const COMPONENTS = [ThyStrengthBasicExampleComponent, ThyStrengthCustomExampleComponent];

@NgModule({
    imports: [CommonModule, NgxTethysModule, FormsModule],
    exports: COMPONENTS,
    declarations: COMPONENTS,
    entryComponents: COMPONENTS,
    providers: []
})
export class ThyStrengthExamplesModule {}
