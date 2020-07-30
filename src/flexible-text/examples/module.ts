// import { ThyTooltipModule } from './../../tooltip/tooltip.module';
// import { ThyFlexibleTextModule } from './../flexible-text.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyEmptyModule, ThyTranslate, ThyFlexibleTextModule, ThyTooltipModule } from 'ngx-tethys';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ThyFlexibleTextBasicExampleComponent } from './basic/basic.component';
const COMPONENTS = [ThyFlexibleTextBasicExampleComponent];

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
        ThyTooltipModule
    ],
    exports: [...COMPONENTS],
    providers: []
})
export class ThyFlexibleTextExamplesModule {
    constructor() {}
}
