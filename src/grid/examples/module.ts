import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgxTethysModule } from 'ngx-tethys';
import { CommonModule } from '@angular/common';
import { ThyGridBasicExampleComponent } from './basic/basic.component';
import { ThyGridGroupExampleComponent } from './group/group.component';
import { ThyGridTreeExampleComponent } from './tree/tree.component';

const COMPONENTS = [ThyGridBasicExampleComponent, ThyGridGroupExampleComponent, ThyGridTreeExampleComponent];

@NgModule({
    declarations: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    imports: [CommonModule, NgxTethysModule, FormsModule],
    exports: [...COMPONENTS]
})
export class ThyGridExamplesModule {}
