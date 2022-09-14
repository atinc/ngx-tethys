import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyTabsComponent } from './tabs.component';
import { ThyTabComponent } from './tab.component';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyNavModule } from 'ngx-tethys/nav';
import { ThyTabBodyComponent } from './tab-body.component';

@NgModule({
    declarations: [ThyTabsComponent, ThyTabComponent, ThyTabBodyComponent],
    imports: [CommonModule, ThyIconModule, ThyNavModule],
    exports: [ThyTabsComponent, ThyTabComponent, ThyTabBodyComponent]
})
export class ThyTabsModule {}
