import { NgModule } from '@angular/core';
import { NgxTethysModule } from 'ngx-tethys';
import { CommonModule } from '@angular/common';

import { ThyStatisticBasicExampleComponent } from './basic/basic.component';
import { ThyStatisticCardExampleComponent } from './card/card.component';
const COMPONENTS: any[] = [ThyStatisticBasicExampleComponent, ThyStatisticCardExampleComponent];

@NgModule({
    declarations: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    imports: [CommonModule, NgxTethysModule],
    exports: [...COMPONENTS]
})
export class ThyStatisticExamplesModule {}
