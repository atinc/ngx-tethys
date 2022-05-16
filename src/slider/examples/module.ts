import { ThyLabelModule } from 'ngx-tethys/label';
import { ThyRadioModule } from 'ngx-tethys/radio';
import { ThySliderModule } from 'ngx-tethys/slider';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThySliderBasicExampleComponent } from './basic/basic.component';
import { ThySliderChangeLimitValueExampleComponent } from './change-limit-value/change-limit-value.component';
import { ThySliderConfigurableExampleComponent } from './configurable/configurable.component';
import { ThySliderDisabledExampleComponent } from './disabled/disabled.component';
import { ThySliderDragEndCallbackExampleComponent } from './drag-end-callback/drag-end-callback.component';
import { ThySliderInputValueExampleComponent } from './input-value/input-value.component';
import { ThySliderSizeExampleComponent } from './size/size.component';
import { ThySliderTypeExampleComponent } from './type/type.component';
import { ThySliderVerticalExampleComponent } from './vertical/vertical.component';

const COMPONENTS = [
    ThySliderBasicExampleComponent,
    ThySliderChangeLimitValueExampleComponent,
    ThySliderDisabledExampleComponent,
    ThySliderVerticalExampleComponent,
    ThySliderInputValueExampleComponent,
    ThySliderDragEndCallbackExampleComponent,
    ThySliderConfigurableExampleComponent,
    ThySliderTypeExampleComponent,
    ThySliderSizeExampleComponent
];
@NgModule({
    imports: [CommonModule, FormsModule, ThySliderModule, ThyLabelModule, ThyRadioModule],
    exports: COMPONENTS,
    declarations: COMPONENTS,
    providers: []
})
export class ThySliderExamplesModule {}
