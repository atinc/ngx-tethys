import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyTabsComponent } from './tabs.component';
import { ThyTabComponent } from './tab.component';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyNavModule } from 'ngx-tethys/nav';

@NgModule({
    declarations: [ThyTabsComponent, ThyTabComponent],
    imports: [CommonModule, ThyIconModule, ThyNavModule],
    exports: [ThyTabsComponent, ThyTabComponent]
})
export class ThyTagModule {}
