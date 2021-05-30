// import { ThyTooltipModule } from './../../tooltip/tooltip.module';
// import { ThyFlexibleTextModule } from './../flexible-text.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyEmptyModule, ThyTranslate, ThyFlexibleTextModule, ThyTooltipModule, ThyLabelModule } from 'ngx-tethys';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ThyFlexibleTextBasicExampleComponent } from './basic/basic.component';
import { ThyFlexibleTextDirectiveExampleComponent } from './directive/directive.component';
import { ThyFlexibleTextTooltipPlacementExampleComponent } from './tooltip-placement/tooltip-placement.component';
import { ThyFlexibleTextTooltipTemplateExampleComponent } from './tooltip-template/tooltip-template.component';
const COMPONENTS = [
    ThyFlexibleTextBasicExampleComponent,
    ThyFlexibleTextDirectiveExampleComponent,
    ThyFlexibleTextTooltipTemplateExampleComponent,
    ThyFlexibleTextTooltipPlacementExampleComponent
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
