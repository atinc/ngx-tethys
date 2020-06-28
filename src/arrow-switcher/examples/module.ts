import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyArrowSwitcherModule } from 'ngx-tethys/arrow-switcher';
import { ThyArrowSwitcherBasicExampleComponent } from './basic/basic.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [ThyArrowSwitcherBasicExampleComponent],
    entryComponents: [ThyArrowSwitcherBasicExampleComponent],
    imports: [CommonModule, ThyArrowSwitcherModule, FormsModule],
    exports: [ThyArrowSwitcherBasicExampleComponent]
})
export class ThyArrowSwitcherExamplesModule {}
