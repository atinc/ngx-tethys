import { NgModule } from '@angular/core';
import { ThyCardBasicExampleComponent } from './basic/basic.component';
import { ThyCardContentScrollExampleComponent } from './content-scroll/content-scroll.component';
import { ThyCardCustomHeaderExampleComponent } from './custom-header/custom-header.component';
import { ThyCardDividedExampleComponent } from './divided/divided.component';
import { ThyCardModule } from 'ngx-tethys/card';
import { CommonModule } from '@angular/common';
import { ThyFormModule } from 'ngx-tethys/form';
import { ThySelectModule } from 'ngx-tethys/select';
import { FormsModule } from '@angular/forms';

const COMPONENTS = [
    ThyCardBasicExampleComponent,
    ThyCardContentScrollExampleComponent,
    ThyCardCustomHeaderExampleComponent,
    ThyCardDividedExampleComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    imports: [CommonModule, FormsModule, ThyCardModule, ThyFormModule, ThySelectModule],
    exports: [...COMPONENTS]
})
export class ThyCardExamplesModule {}
