import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyLayoutComponent } from './layout.component';
import { ThyHeaderComponent } from './header.component';
import { ThyContentComponent } from './content.component';
import { ThySidebarComponent } from './sidebar.component';
import { ThyContentSectionComponent } from './content-section.component';
import { ThyContentMainComponent } from './content-main.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyTooltipModule } from 'ngx-tethys/tooltip';
import { ThySidebarHeaderComponent } from './sidebar-header.component';
import { ThySidebarFooterComponent } from './sidebar-footer.component';

@NgModule({
    declarations: [
        ThyLayoutComponent,
        ThyHeaderComponent,
        ThyContentComponent,
        ThySidebarComponent,
        ThySidebarHeaderComponent,
        ThySidebarFooterComponent,
        ThyContentSectionComponent,
        ThyContentMainComponent
    ],
    imports: [CommonModule, DragDropModule, ThyIconModule, ThyTooltipModule],
    exports: [
        ThyLayoutComponent,
        ThyHeaderComponent,
        ThyContentComponent,
        ThySidebarComponent,
        ThySidebarHeaderComponent,
        ThySidebarFooterComponent,
        ThyContentSectionComponent,
        ThyContentMainComponent
    ]
})
export class ThyLayoutModule {}
