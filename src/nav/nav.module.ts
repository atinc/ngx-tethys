import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyNavComponent } from './nav.component';
import { ThyNavLinkDirective } from './nav-link.directive';
import { ThyIconNavComponent } from './icon-nav/icon-nav.component';
import { ThyIconNavLinkDirective } from './icon-nav/icon-nav-link.directive';

@NgModule({
    declarations: [ThyNavComponent, ThyNavLinkDirective, ThyIconNavComponent, ThyIconNavLinkDirective],
    imports: [CommonModule],
    exports: [ThyNavComponent, ThyNavLinkDirective, ThyIconNavComponent, ThyIconNavLinkDirective]
})
export class ThyNavModule {}
