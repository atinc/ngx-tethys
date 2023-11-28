import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyLayout, ThyLayoutDirective } from './layout.component';
import { ThyHeader, ThyHeaderDirective } from './header.component';
import { ThyContent, ThyContentDirective } from './content.component';
import { ThySidebar, ThySidebarDirective } from './sidebar.component';
import { ThyContentSection, ThyContentSectionDirective } from './content-section.component';
import { ThyContentMain, ThyContentMainDirective } from './content-main.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ThyHotkeyModule } from '@tethys/cdk/hotkey';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyTooltipModule } from 'ngx-tethys/tooltip';
import { ThySidebarHeader, ThySidebarHeaderDirective } from './sidebar-header.component';
import { ThySidebarFooter, ThySidebarFooterDirective } from './sidebar-footer.component';
import { ThySidebarContent, ThySidebarContentDirective } from './sidebar-content.component';
import { ThyResizableModule } from 'ngx-tethys/resizable';

@NgModule({
    imports: [
        CommonModule,
        DragDropModule,
        ThyIconModule,
        ThyTooltipModule,
        ThyResizableModule,
        ThyHotkeyModule,
        ThyLayout,
        ThyHeader,
        ThyContent,
        ThySidebar,
        ThySidebarHeader,
        ThySidebarContent,
        ThySidebarFooter,
        ThyContentSection,
        ThyContentMain,
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
        ThyLayout,
        ThyHeader,
        ThyContent,
        ThySidebar,
        ThySidebarHeader,
        ThySidebarContent,
        ThySidebarFooter,
        ThyContentSection,
        ThyContentMain,
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
