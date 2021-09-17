import { ThyActionMenuModule } from 'ngx-tethys/action-menu';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyPopoverModule } from 'ngx-tethys/popover';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ThyIconNavLinkComponent } from './icon-nav/icon-nav-link.directive';
import { ThyIconNavComponent } from './icon-nav/icon-nav.component';
import { ThyNavLinkDirective } from './nav-link.directive';
import { ThyNavComponent } from './nav.component';

@NgModule({
    declarations: [ThyNavComponent, ThyNavLinkDirective, ThyIconNavComponent, ThyIconNavLinkComponent],
    imports: [CommonModule, ThyIconModule, ThyPopoverModule, ThyActionMenuModule, RouterModule],
    exports: [ThyNavComponent, ThyNavLinkDirective, ThyIconNavComponent, ThyIconNavLinkComponent]
})
export class ThyNavModule {}
