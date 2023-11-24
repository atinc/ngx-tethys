import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyLayoutComponent, ThyLayoutDirective } from './layout.component';
import { ThyHeaderComponent, ThyHeaderDirective } from './header.component';
import { ThyContentComponent, ThyContentDirective } from './content.component';
import { ThySidebarComponent, ThySidebarDirective } from './sidebar.component';
import { ThyContentSectionComponent, ThyContentSectionDirective } from './content-section.component';
import { ThyContentMainComponent, ThyContentMainDirective } from './content-main.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ThyHotkeyModule } from '@tethys/cdk/hotkey';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyTooltipModule } from 'ngx-tethys/tooltip';
import { ThySidebarHeaderComponent, ThySidebarHeaderDirective } from './sidebar-header.component';
import { ThySidebarFooterComponent, ThySidebarFooterDirective } from './sidebar-footer.component';
import { ThySidebarContentComponent, ThySidebarContentDirective } from './sidebar-content.component';
import { ThyResizableModule } from 'ngx-tethys/resizable';

@NgModule({
    imports: [
        CommonModule,
        DragDropModule,
        ThyIconModule,
        ThyTooltipModule,
        ThyResizableModule,
        ThyHotkeyModule,
        ThyLayoutComponent,
        ThyHeaderComponent,
        ThyContentComponent,
        ThySidebarComponent,
        ThySidebarHeaderComponent,
        ThySidebarContentComponent,
        ThySidebarFooterComponent,
        ThyContentSectionComponent,
        ThyContentMainComponent,
        ThyLayoutDirective,
        ThyHeaderDirective,
        ThyContentDirective,
        ThySidebarDirective,
        ThySidebarHeaderDirective,
        ThySidebarContentDirective,
        ThySidebarFooterDirective,
        ThyContentSectionDirective,
        ThyContentMainDirective
    ],
    exports: [
        ThyLayoutComponent,
        ThyHeaderComponent,
        ThyContentComponent,
        ThySidebarComponent,
        ThySidebarHeaderComponent,
        ThySidebarContentComponent,
        ThySidebarFooterComponent,
        ThyContentSectionComponent,
        ThyContentMainComponent,
        ThyLayoutDirective,
        ThyHeaderDirective,
        ThyContentDirective,
        ThySidebarDirective,
        ThySidebarHeaderDirective,
        ThySidebarContentDirective,
        ThySidebarFooterDirective,
        ThyContentSectionDirective,
        ThyContentMainDirective
    ]
})
export class ThyLayoutModule {}
