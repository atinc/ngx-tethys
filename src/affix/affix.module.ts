import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyAffix } from './affix.component';

@NgModule({
    exports: [ThyAffix],
    imports: [CommonModule, PlatformModule, ThyAffix]
})
export class ThyAffixModule {}
