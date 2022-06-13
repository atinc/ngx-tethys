import { NgModule } from '@angular/core';
import { ThyCardBasicExampleComponent } from './basic/basic.component';
import { ThyCardContentScrollExampleComponent } from './content-scroll/content-scroll.component';
import { ThyCardCustomHeaderExampleComponent } from './custom-header/custom-header.component';
import { ThyCardDividedExampleComponent } from './divided/divided.component';
import { ThyCardSizeExampleComponent } from './size/size.component';
import { ThyCardModule } from 'ngx-tethys/card';
import { CommonModule } from '@angular/common';
import { ThyFormModule } from 'ngx-tethys/form';
import { ThySelectModule } from 'ngx-tethys/select';
import { FormsModule } from '@angular/forms';
import { ThyCheckboxModule } from 'ngx-tethys/checkbox';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyCardBorderedExampleComponent } from './bordered/bordered.component';

const COMPONENTS = [
    ThyCardBasicExampleComponent,
    ThyCardContentScrollExampleComponent,
    ThyCardCustomHeaderExampleComponent,
    ThyCardDividedExampleComponent,
    ThyCardSizeExampleComponent,
    ThyCardBorderedExampleComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, FormsModule, ThyCardModule, ThyFormModule, ThySelectModule, ThyCheckboxModule, ThyButtonModule],
    exports: [...COMPONENTS]
})
export class ThyCardExamplesModule {}
