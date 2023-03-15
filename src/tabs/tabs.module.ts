import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyTabsComponent } from './tabs.component';
import { ThyTabComponent } from './tab.component';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyNavModule } from 'ngx-tethys/nav';
import { ThyTabContentComponent } from './tab-content.component';

@NgModule({
    imports: [CommonModule, ThyIconModule, ThyNavModule, ThyTabsComponent, ThyTabComponent, ThyTabContentComponent],
    exports: [ThyTabsComponent, ThyTabComponent]
})
export class ThyTabsModule {}
