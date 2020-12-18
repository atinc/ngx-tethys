import { NgxTethysModule } from 'ngx-tethys';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyGridBasicExampleComponent } from './basic/basic.component';
import { ThyGridCustomEmptyExampleComponent } from './custom-empty/custom-empty.component';
import { ThyGridGroupExampleComponent } from './group/group.component';
import { ThyGridTreeExampleComponent } from './tree/tree.component';

const COMPONENTS = [
    ThyGridBasicExampleComponent,
    ThyGridGroupExampleComponent,
    ThyGridTreeExampleComponent,
    ThyGridCustomEmptyExampleComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    imports: [CommonModule, NgxTethysModule, FormsModule],
    exports: [...COMPONENTS]
})
export class ThyGridExamplesModule {}
