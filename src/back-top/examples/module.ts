import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyBackTopBasicExampleComponent } from './basic/basic.component';
import { NgxTethysModule } from 'ngx-tethys';
import { ThyBackTopCustomExampleComponent } from './custom/custom.component';
import { ThyBackTopTargetExampleComponent } from './target/target.component';

const COMPONENTS = [ThyBackTopBasicExampleComponent, ThyBackTopCustomExampleComponent, ThyBackTopTargetExampleComponent];

@NgModule({
    declarations: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    imports: [CommonModule, NgxTethysModule],
    exports: [...COMPONENTS]
})
export class ThyBackTopExamplesModule {}
