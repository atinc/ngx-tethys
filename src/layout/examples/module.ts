import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyLayoutModule } from 'ngx-tethys/layout';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyNavModule } from 'ngx-tethys/nav';
import { ThyBreadcrumbModule } from 'ngx-tethys/breadcrumb';
import { ThyMenuModule } from 'ngx-tethys/menu';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyTooltipModule } from 'ngx-tethys/tooltip';
import { ThyLayoutBasicExampleComponent } from './basic/basic.component';
import { ThyLayoutFullExampleComponent } from './full/full.component';
import { ThyLayoutHeaderExampleComponent } from './header/header.component';
import { ThyLayoutSidebarExampleComponent } from './sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { ThyLayoutSubheaderExampleComponent } from './subheader/subheader.component';
import { ThyLayoutContentExampleComponent } from './content/content.component';

const COMPONENTS = [
    ThyLayoutBasicExampleComponent,
    ThyLayoutFullExampleComponent,
    ThyLayoutHeaderExampleComponent,
    ThyLayoutSidebarExampleComponent,
    ThyLayoutSubheaderExampleComponent,
    ThyLayoutContentExampleComponent
];

@NgModule({
    declarations: COMPONENTS,
    entryComponents: COMPONENTS,
    imports: [
        CommonModule,
        FormsModule,
        ThyLayoutModule,
        ThyButtonModule,
        ThyIconModule,
        ThyNavModule,
        ThyBreadcrumbModule,
        ThyMenuModule,
        ThyInputModule,
        ThyTooltipModule
    ],
    exports: COMPONENTS,
    providers: []
})
export class ThyLayoutExamplesModule {}
