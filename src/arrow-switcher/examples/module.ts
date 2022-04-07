import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyArrowSwitcherModule } from 'ngx-tethys/arrow-switcher';
import { ThyArrowSwitcherBasicExampleComponent } from './basic/basic.component';
import { FormsModule } from '@angular/forms';
import { ThyArrowSwitcherSizeExampleComponent } from './size/size.component';
import { ThyArrowSwitcherDisabledExampleComponent } from './disabled/disabled.component';

const COMPONENTS = [ThyArrowSwitcherBasicExampleComponent, ThyArrowSwitcherSizeExampleComponent, ThyArrowSwitcherDisabledExampleComponent];
@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ThyArrowSwitcherModule, FormsModule],
    exports: [...COMPONENTS]
})
export class ThyArrowSwitcherExamplesModule {}
