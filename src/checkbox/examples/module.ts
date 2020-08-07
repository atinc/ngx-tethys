import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThyCheckboxBasicExampleComponent } from './basic/basic.component';
import { FormsModule } from '@angular/forms';
import { ThyCheckboxModule } from 'ngx-tethys/checkbox';
import { ThyListModule } from 'ngx-tethys/list';
import { ThyCheckboxDisabledExampleComponent } from './disabled/disabled.component';
import { ThyCheckboxIndeterminateExampleComponent } from './indeterminate/indeterminate.component';
import { ThyCheckboxToggleInlineExampleComponent } from './toggle-inline/toggle-inline.component';
import { ThyCheckboxInListExampleComponent } from './in-list/in-list.component';

const COMPONENTS = [
    ThyCheckboxBasicExampleComponent,
    ThyCheckboxDisabledExampleComponent,
    ThyCheckboxIndeterminateExampleComponent,
    ThyCheckboxToggleInlineExampleComponent,
    ThyCheckboxInListExampleComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    imports: [CommonModule, FormsModule, ThyCheckboxModule, ThyListModule],
    exports: [...COMPONENTS]
})
export class ThyCheckboxExamplesModule {}
