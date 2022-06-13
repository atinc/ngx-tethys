import { ThyBadgeModule } from 'ngx-tethys/badge';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyBadgeBasicExampleComponent } from './basic/basic.component';
import { ThyBadgeIndependentUseExampleComponent } from './independent-use/independent-use.component';
import { ThyBadgeOverflowExampleComponent } from './overflow/overflow.component';
import { ThyBadgeSpecialExampleComponent } from './special/special.component';
import { ThyBadgeStatePointExampleComponent } from './state-point/state-point.component';
import { ThyBadgeTypeExampleComponent } from './type/type.component';

const COMPONENTS = [
    ThyBadgeBasicExampleComponent,
    ThyBadgeIndependentUseExampleComponent,
    ThyBadgeOverflowExampleComponent,
    ThyBadgeSpecialExampleComponent,
    ThyBadgeStatePointExampleComponent,
    ThyBadgeTypeExampleComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ThyBadgeModule],
    exports: [...COMPONENTS]
})
export class ThyBadgeExamplesModule {}
