import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxTethysModule } from 'ngx-tethys';
import { ThyDropdownBasicExampleComponent } from './basic/basic.component';
import { ThyDropdownSizeExampleComponent } from './size/size.component';
import { ThyDropdownSplitExampleComponent } from './split/split.component';

const COMPONENTS = [ThyDropdownBasicExampleComponent, ThyDropdownSizeExampleComponent, ThyDropdownSplitExampleComponent];
@NgModule({
    imports: [CommonModule, NgxTethysModule],
    exports: COMPONENTS,
    declarations: COMPONENTS,
    entryComponents: COMPONENTS,
    providers: []
})
export class ThyDropdownExamplesModule {}
