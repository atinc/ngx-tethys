import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxTethysModule } from 'ngx-tethys';
import { ThyBreadcrumbBasicExampleComponent } from './basic/basic.component';
import { ThyBreadcrumbSlashExampleComponent } from './slash/slash.component';
import { ThyBreadcrumbBackslashExampleComponent } from './backslash/backslash.component';

const COMPONENTS = [ThyBreadcrumbBasicExampleComponent, ThyBreadcrumbSlashExampleComponent, ThyBreadcrumbBackslashExampleComponent];

@NgModule({
    declarations: COMPONENTS,
    imports: [CommonModule, FormsModule, NgxTethysModule],
    entryComponents: COMPONENTS,
    exports: COMPONENTS,
    providers: []
})
export class ThyBreadcrumbExamplesModule {}
