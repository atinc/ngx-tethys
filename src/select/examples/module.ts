import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { ThySelectModule } from 'ngx-tethys/select';
import { ThyOptionModule } from 'ngx-tethys/core/option';
import { ThySelectBasicExampleComponent } from './basic/basic.component';
import { ThySelectCustomBasicExampleComponent } from './custom-basic/custom-basic.component';
const COMPONENTS = [ThySelectBasicExampleComponent, ThySelectCustomBasicExampleComponent];

@NgModule({
    declarations: COMPONENTS,
    entryComponents: COMPONENTS,
    imports: [CommonModule, FormsModule, OverlayModule, ThySelectModule, ThyOptionModule],
    exports: COMPONENTS,
    providers: []
})
export class ThySelectExamplesModule {}
