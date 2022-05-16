import { ThyIconModule } from 'ngx-tethys/icon';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyLinkBasicExampleComponent } from './basic/basic.component';
import { ThyLinkUsageSvgExampleComponent } from './usage-svg/usage-svg.component';
import { ThyLinkUsageWtfExampleComponent } from './usage-wtf/usage-wtf.component';

const COMPONENTS = [ThyLinkUsageWtfExampleComponent, ThyLinkUsageSvgExampleComponent, ThyLinkBasicExampleComponent];

@NgModule({
    declarations: COMPONENTS,
    imports: [CommonModule, FormsModule, ThyIconModule],
    exports: [],
    providers: COMPONENTS
})
export class ThyLinkExamplesModule {}
