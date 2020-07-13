import { NgModule } from '@angular/core';
import { ThyAffixBasicExampleComponent } from './basic/basic.component';
import { CommonModule } from '@angular/common';
import { ThyAffixModule } from 'ngx-tethys/affix';
import { ThyButtonModule } from 'ngx-tethys/button';

const COMPONENTS = [ThyAffixBasicExampleComponent];

@NgModule({
    declarations: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    imports: [CommonModule, ThyAffixModule, ThyButtonModule],
    exports: [...COMPONENTS]
})
export class ThyAffixExamplesModule {}
