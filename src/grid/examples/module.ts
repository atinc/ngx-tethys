import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ThyGridModule } from 'ngx-tethys/grid';
import { ThySelectModule } from 'ngx-tethys/select';
import { CommonModule } from '@angular/common';
import { ThyGridBasicExampleComponent } from './basic/basic.component';
import { ThyGridBorderedExampleComponent } from './bordered/bordered.component';
import { ThyGridGroupExampleComponent } from './group/group.component';

const COMPONENTS = [ThyGridBasicExampleComponent, ThyGridBorderedExampleComponent, ThyGridGroupExampleComponent];

@NgModule({
    declarations: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    imports: [CommonModule, ThyGridModule, ThySelectModule, FormsModule],
    exports: [...COMPONENTS]
})
export class ThyGridExamplesModule {}
