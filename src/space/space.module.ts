import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThySpaceComponent, ThySpaceItemDirective } from './space.component';

@NgModule({
    imports: [CommonModule, ThySpaceComponent, ThySpaceItemDirective],
    exports: [ThySpaceComponent, ThySpaceItemDirective]
})
export class ThySpaceModule {}
