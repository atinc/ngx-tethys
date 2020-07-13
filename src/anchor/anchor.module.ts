import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformModule } from '@angular/cdk/platform';
import { ThyAnchorComponent } from './anchor.component';
import { ThyAnchorLinkComponent } from './anchor-link.component';
import { ThyAffixModule } from '../affix';

@NgModule({
    declarations: [ThyAnchorComponent, ThyAnchorLinkComponent],
    exports: [ThyAnchorComponent, ThyAnchorLinkComponent],
    imports: [CommonModule, PlatformModule, ThyAffixModule]
})
export class ThyAnchorModule {}
