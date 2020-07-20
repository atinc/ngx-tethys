import { NgxTethysModule } from 'ngx-tethys';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyLinkBasicExampleComponent } from './basic/basic.component';
import { ThyLinkUsageSvgExampleComponent } from './usage-svg/usage-svg.component';
import { ThyLinkUsageWtfExampleComponent } from './usage-wtf/usage-wtf.component';

const COMPONENTS = [ThyLinkUsageWtfExampleComponent, ThyLinkUsageSvgExampleComponent, ThyLinkBasicExampleComponent];

@NgModule({
    declarations: COMPONENTS,
    entryComponents: COMPONENTS,
    imports: [CommonModule, FormsModule, NgxTethysModule],
    exports: [],
    providers: COMPONENTS
})
export class ThyLinkExamplesModule {}
