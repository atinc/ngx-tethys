import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxTethysModule } from 'ngx-tethys';
import { ThyLayoutBasicExampleComponent } from './basic/basic.component';
import { ThyLayoutFullExampleComponent } from './full/full.component';
import { ThyLayoutHeaderExampleComponent } from './header/header.component';
import { ThyLayoutSidebarExampleComponent } from './sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';

const COMPONENTS = [
    ThyLayoutBasicExampleComponent,
    ThyLayoutFullExampleComponent,
    ThyLayoutHeaderExampleComponent,
    ThyLayoutSidebarExampleComponent
];

@NgModule({
    declarations: COMPONENTS,
    entryComponents: COMPONENTS,
    imports: [CommonModule, FormsModule, NgxTethysModule],
    exports: COMPONENTS,
    providers: []
})
export class ThyLayoutExamplesModule {}
