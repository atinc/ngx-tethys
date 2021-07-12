import { NgxTethysModule } from 'ngx-tethys';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ThyNavFillExampleComponent } from './fill/fill.component';
import { ThyNavHorizontalExampleComponent } from './horizontal/horizontal.component';
import { ThyNavIconNavExampleComponent } from './icon-nav/icon-nav.component';
import { ThyNavResponsiveExampleComponent } from './responsive/responsive.component';
import { ThyNavTypeExampleComponent } from './type/type.component';
import { ThyNavVerticalExampleComponent } from './vertical/vertical.component';

const COMPONENTS = [
    ThyNavFillExampleComponent,
    ThyNavHorizontalExampleComponent,
    ThyNavIconNavExampleComponent,
    ThyNavTypeExampleComponent,
    ThyNavVerticalExampleComponent,
    ThyNavResponsiveExampleComponent
];

@NgModule({
    declarations: COMPONENTS,
    entryComponents: COMPONENTS,
    imports: [CommonModule, FormsModule, NgxTethysModule, RouterModule],
    exports: [],
    providers: COMPONENTS
})
export class ThyNavExamplesModule {}
