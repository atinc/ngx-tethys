import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { ThySelectModule } from 'ngx-tethys/select';
import { ThyOptionModule } from 'ngx-tethys/core/option';
import { ThyCheckboxModule } from 'ngx-tethys/checkbox';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThySelectBasicExampleComponent } from './basic/basic.component';
import { ThySelectCustomBasicExampleComponent } from './custom-basic/custom-basic.component';
import { ThySelectEmptyExampleComponent } from './empty/empty.component';
import { ThySelectDisplayExampleComponent } from './display/display.component';
const COMPONENTS = [
    ThySelectBasicExampleComponent,
    ThySelectCustomBasicExampleComponent,
    ThySelectEmptyExampleComponent,
    ThySelectDisplayExampleComponent
];

@NgModule({
    declarations: COMPONENTS,
    entryComponents: COMPONENTS,
    imports: [CommonModule, FormsModule, OverlayModule, ThySelectModule, ThyOptionModule, ThyCheckboxModule, ThyIconModule],
    exports: COMPONENTS,
    providers: []
})
export class ThySelectExamplesModule {}
