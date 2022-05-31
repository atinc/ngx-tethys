import { ThyActionMenuModule } from 'ngx-tethys/action-menu';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyPopoverModule } from 'ngx-tethys/popover';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ThyIconNavLinkComponent } from './icon-nav/icon-nav-link.directive';
import { ThyIconNavComponent } from './icon-nav/icon-nav.component';
import { ThyNavItemDirective } from './nav-item.directive';
import { ThyNavComponent } from './nav.component';
import { BypassSecurityTrustHtmlPipe } from './nav.pipe';

@NgModule({
    declarations: [ThyNavComponent, ThyNavItemDirective, ThyIconNavComponent, ThyIconNavLinkComponent, BypassSecurityTrustHtmlPipe],
    imports: [CommonModule, ThyIconModule, ThyPopoverModule, ThyActionMenuModule, RouterModule],
    exports: [ThyNavComponent, ThyNavItemDirective, ThyIconNavComponent, ThyIconNavLinkComponent, BypassSecurityTrustHtmlPipe]
})
export class ThyNavModule {}
