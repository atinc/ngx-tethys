// import { ThyTooltipModule } from './../../tooltip/tooltip.module';
// import { ThyFlexibleTextModule } from './../flexible-text.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ThyEmptyModule } from 'ngx-tethys/empty';
import { ThyFlexibleTextModule } from 'ngx-tethys/flexible-text';
import { ThyLabelModule } from 'ngx-tethys/label';
import { ThyTooltipModule } from 'ngx-tethys/tooltip';
import { ThyFlexibleTextBasicExampleComponent } from './basic/basic.component';
import { ThyFlexibleTextContainerExampleComponent } from './container/container.component';
import { ThyFlexibleTextMultipleLineExampleComponent } from './multiple-line/multiple-line.component';
import { ThyFlexibleTextPlacementExampleComponent } from './placement/placement.component';
import { ThyFlexibleTextTemplateExampleComponent } from './template/template.component';
const COMPONENTS = [
    ThyFlexibleTextBasicExampleComponent,
    ThyFlexibleTextTemplateExampleComponent,
    ThyFlexibleTextPlacementExampleComponent,
    ThyFlexibleTextContainerExampleComponent,
    ThyFlexibleTextMultipleLineExampleComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    imports: [
        CommonModule,
        FormsModule,
        ThyEmptyModule,
        TranslateModule.forRoot(),
        TranslateModule,
        ThyFlexibleTextModule,
        ThyTooltipModule,
        ThyLabelModule
    ],
    exports: [...COMPONENTS],
    providers: []
})
export class ThyFlexibleTextExamplesModule {
    constructor() {}
}
