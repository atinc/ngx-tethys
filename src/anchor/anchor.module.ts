import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformModule } from '@angular/cdk/platform';
import { ThyAnchorComponent } from './anchor.component';
import { ThyAnchorLinkComponent } from './anchor-link.component';
import { ThyAffixModule } from 'ngx-tethys/affix';

@NgModule({
    exports: [ThyAnchorComponent, ThyAnchorLinkComponent],
    imports: [CommonModule, PlatformModule, ThyAffixModule, ThyAnchorComponent, ThyAnchorLinkComponent]
})
export class ThyAnchorModule {}
