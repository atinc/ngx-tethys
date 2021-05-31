// import { ThyTooltipModule } from './../../tooltip/tooltip.module';
// import { ThyFlexibleTextModule } from './../flexible-text.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyEmptyModule, ThyTranslate, ThyFlexibleTextModule, ThyTooltipModule, ThyLabelModule } from 'ngx-tethys';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ThyFlexibleTextBasicExampleComponent } from './basic/basic.component';
import { ThyFlexibleTextTemplateExampleComponent } from './template/template.component';
import { ThyFlexibleTextPlacementExampleComponent } from './placement/placement.component';
import { ThyFlexibleTextContainerExampleComponent } from './container/container.component';
const COMPONENTS = [
    ThyFlexibleTextBasicExampleComponent,
    ThyFlexibleTextTemplateExampleComponent,
    ThyFlexibleTextPlacementExampleComponent,
    ThyFlexibleTextContainerExampleComponent
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
