import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformModule } from '@angular/cdk/platform';
import { ThyAnchor } from './anchor.component';
import { ThyAnchorLink } from './anchor-link.component';
import { ThyAffixModule } from 'ngx-tethys/affix';

@NgModule({
    exports: [ThyAnchor, ThyAnchorLink],
    imports: [CommonModule, PlatformModule, ThyAffixModule, ThyAnchor, ThyAnchorLink]
})
export class ThyAnchorModule {}
