import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyNavComponent } from './nav.component';
import { ThyNavLinkDirective } from './nav-link.directive';
import { ThyIconNavComponent } from './icon-nav/icon-nav.component';
import { ThyIconNavLinkComponent } from './icon-nav/icon-nav-link.directive';
import { ThyIconModule } from 'ngx-tethys/icon';

@NgModule({
    declarations: [ThyNavComponent, ThyNavLinkDirective, ThyIconNavComponent, ThyIconNavLinkComponent],
    imports: [CommonModule, ThyIconModule],
    exports: [ThyNavComponent, ThyNavLinkDirective, ThyIconNavComponent, ThyIconNavLinkComponent]
})
export class ThyNavModule {}
