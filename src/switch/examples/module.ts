import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThySwitchModule } from 'ngx-tethys/switch';
import { ThySwitchBasicExampleComponent } from './basic/basic.component';
import { ThySwitchDisabledExampleComponent } from './disabled/disabled.component';
import { ThySwitchSizeExampleComponent } from './size/size.component';
import { ThySwitchTypeExampleComponent } from './type/type.component';

const COMPONENTS = [
    ThySwitchBasicExampleComponent,
    ThySwitchDisabledExampleComponent,
    ThySwitchSizeExampleComponent,
    ThySwitchTypeExampleComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    imports: [CommonModule, FormsModule, ThySwitchModule],
    exports: [...COMPONENTS]
})
export class ThySwitchExamplesModule {}
