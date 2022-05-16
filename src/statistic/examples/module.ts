import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyStatisticModule } from 'ngx-tethys/statistic';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyStatisticBasicExampleComponent } from './basic/basic.component';
import { ThyStatisticCardExampleComponent } from './card/card.component';

const COMPONENTS: any[] = [ThyStatisticBasicExampleComponent, ThyStatisticCardExampleComponent];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ThyStatisticModule, ThyIconModule],
    exports: [...COMPONENTS]
})
export class ThyStatisticExamplesModule {}
