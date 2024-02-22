import { ThyDropdownModule } from 'ngx-tethys/dropdown';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyPopoverModule } from 'ngx-tethys/popover';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ThyIconNavLink } from './icon-nav/icon-nav-link.directive';
import { ThyIconNav } from './icon-nav/icon-nav.component';
import { ThyNavInkBarDirective } from './nav-ink-bar.directive';
import { ThyNavItemDirective } from './nav-item.directive';
import { ThyNav } from './nav.component';
import { BypassSecurityTrustHtmlPipe } from './nav.pipe';

@NgModule({
    imports: [
        CommonModule,
        ThyIconModule,
        ThyPopoverModule,
        ThyDropdownModule,
        RouterModule,
        ThyNav,
        ThyNavItemDirective,
        ThyIconNav,
        ThyIconNavLink,
        BypassSecurityTrustHtmlPipe,
        ThyNavInkBarDirective
    ],
    exports: [ThyNav, ThyNavItemDirective, ThyIconNav, ThyIconNavLink, BypassSecurityTrustHtmlPipe]
})
export class ThyNavModule {}
