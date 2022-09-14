import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyTabsComponent } from './tabs.component';
import { ThyTabComponent } from './tab.component';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyNavModule } from 'ngx-tethys/nav';
import { ThyTabContentComponent } from './tab-content.component';

@NgModule({
    declarations: [ThyTabsComponent, ThyTabComponent, ThyTabContentComponent],
    imports: [CommonModule, ThyIconModule, ThyNavModule],
    exports: [ThyTabsComponent, ThyTabComponent, ThyTabContentComponent]
})
export class ThyTabsModule {}
