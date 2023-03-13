import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyAffixComponent } from './affix.component';

@NgModule({
    exports: [ThyAffixComponent],
    imports: [CommonModule, PlatformModule, ThyAffixComponent]
})
export class ThyAffixModule {}
