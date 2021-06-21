import { NgxTethysModule } from 'ngx-tethys';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyTableBasicExampleComponent } from './basic/basic.component';
import { ThyTableCustomEmptyExampleComponent } from './custom-empty/custom-empty.component';
import { ThyTableGroupExampleComponent } from './group/group.component';
import { ThyTableTreeExampleComponent } from './tree/tree.component';

const COMPONENTS = [
    ThyTableBasicExampleComponent,
    ThyTableGroupExampleComponent,
    ThyTableTreeExampleComponent,
    ThyTableCustomEmptyExampleComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    imports: [CommonModule, NgxTethysModule, FormsModule],
    exports: [...COMPONENTS]
})
export class ThyTableExamplesModule {}
