import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThyAnchorModule } from 'ngx-tethys/anchor';
import { ThyAnchorBasicExampleComponent } from './basic/basic.component';
import { ThyAnchorHorizontalExampleComponent } from './horizontal/horizontal.component';
import { ThyAnchorNavFakeExampleComponent } from './nav-fake/nav-fake.component';
import { ThyAnchorStaticExampleComponent } from './static/static.component';

const COMPONENTS = [
    ThyAnchorBasicExampleComponent,
    ThyAnchorNavFakeExampleComponent,
    ThyAnchorStaticExampleComponent,
    ThyAnchorHorizontalExampleComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ThyAnchorModule],
    exports: [...COMPONENTS]
})
export class ThyAnchorExamplesModule {}
