import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxTethysModule } from 'ngx-tethys';
import { ThySliderBasicExampleComponent } from './basic/basic.component';
import { ThySliderChangeLimitValueExampleComponent } from './change-limit-value/change-limit-value.component';
import { ThySliderDisabledExampleComponent } from './disabled/disabled.component';
import { ThySliderVerticalExampleComponent } from './vertical/vertical.component';
import { ThySliderInputValueExampleComponent } from './input-value/input-value.component';
import { ThySliderDragEndCallbackExampleComponent } from './drag-end-callback/drag-end-callback.component';
import { ThySliderConfigurableExampleComponent } from './configurable/configurable.component';
import { ThySliderTypeExampleComponent } from './type/type.component';

const COMPONENTS = [
    ThySliderBasicExampleComponent,
    ThySliderChangeLimitValueExampleComponent,
    ThySliderDisabledExampleComponent,
    ThySliderVerticalExampleComponent,
    ThySliderInputValueExampleComponent,
    ThySliderDragEndCallbackExampleComponent,
    ThySliderConfigurableExampleComponent,
    ThySliderTypeExampleComponent
];
@NgModule({
    imports: [CommonModule, FormsModule, NgxTethysModule],
    exports: COMPONENTS,
    declarations: COMPONENTS,
    entryComponents: COMPONENTS,
    providers: []
})
export class ThySliderExamplesModule {}
