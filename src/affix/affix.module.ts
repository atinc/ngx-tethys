import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyAffixComponent } from './affix.component';

@NgModule({
    declarations: [ThyAffixComponent],
    exports: [ThyAffixComponent],
    imports: [CommonModule, PlatformModule]
})
export class ThyAffixModule {}
