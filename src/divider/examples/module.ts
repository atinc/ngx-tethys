import { ThyDividerModule } from 'ngx-tethys/divider';
import { ThySelectModule } from 'ngx-tethys/select';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyDividerBasicExampleComponent } from './basic/basic.component';
import { ThyDividerVerticalExampleComponent } from './vertical/vertical.component';
import { ThyDividerWithTextExampleComponent } from './with-text/with-text.component';
import { ThyDividerDeeperExampleComponent } from './deeper/deeper.component';

const COMPONENTS = [
    ThyDividerDeeperExampleComponent,
    ThyDividerBasicExampleComponent,
    ThyDividerVerticalExampleComponent,
    ThyDividerWithTextExampleComponent
];

@NgModule({
    declarations: COMPONENTS,
    imports: [CommonModule, FormsModule, ThyDividerModule, ThySelectModule],
    exports: COMPONENTS
})
export class ThyDividerExamplesModule {}
