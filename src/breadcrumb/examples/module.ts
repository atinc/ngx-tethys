import { ThyBreadcrumbModule } from 'ngx-tethys/breadcrumb';
import { ThyIconModule } from 'ngx-tethys/icon';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyBreadcrumbBackslashExampleComponent } from './backslash/backslash.component';
import { ThyBreadcrumbBasicExampleComponent } from './basic/basic.component';
import { ThyBreadcrumbSlashExampleComponent } from './slash/slash.component';

const COMPONENTS = [ThyBreadcrumbBasicExampleComponent, ThyBreadcrumbSlashExampleComponent, ThyBreadcrumbBackslashExampleComponent];

@NgModule({
    declarations: COMPONENTS,
    imports: [CommonModule, FormsModule, ThyBreadcrumbModule, ThyIconModule],
    exports: COMPONENTS,
    providers: []
})
export class ThyBreadcrumbExamplesModule {}
