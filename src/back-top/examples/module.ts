import { ThyBackTopModule } from 'ngx-tethys/back-top';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyBackTopBasicExampleComponent } from './basic/basic.component';
import { ThyBackTopCustomExampleComponent } from './custom/custom.component';
import { ThyBackTopTargetExampleComponent } from './target/target.component';

const COMPONENTS = [ThyBackTopBasicExampleComponent, ThyBackTopCustomExampleComponent, ThyBackTopTargetExampleComponent];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ThyBackTopModule],
    exports: [...COMPONENTS]
})
export class ThyBackTopExamplesModule {}
