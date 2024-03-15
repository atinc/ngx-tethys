import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyTabs } from './tabs.component';
import { ThyTab } from './tab.component';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyNavModule } from 'ngx-tethys/nav';
import { ThyTabContent } from './tab-content.component';

@NgModule({
    imports: [CommonModule, ThyIconModule, ThyNavModule, ThyTabs, ThyTab, ThyTabContent],
    exports: [ThyTabs, ThyTab]
})
export class ThyTabsModule {}
