import { NgModule } from '@angular/core';
import { ThyAnchorBasicExampleComponent } from './basic/basic.component';
import { CommonModule } from '@angular/common';
import { ThyAnchorModule } from 'ngx-tethys/anchor';
import { ThyAnchorNavFakeExampleComponent } from './nav-fake/nav-fake.component';

const COMPONENTS = [ThyAnchorBasicExampleComponent, ThyAnchorNavFakeExampleComponent];

@NgModule({
    declarations: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    imports: [CommonModule, ThyAnchorModule],
    exports: [...COMPONENTS]
})
export class ThyAnchorExamplesModule {}
