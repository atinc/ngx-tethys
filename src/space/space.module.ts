import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThySpace, ThySpaceItemDirective } from './space.component';

@NgModule({
    imports: [CommonModule, ThySpace, ThySpaceItemDirective],
    exports: [ThySpace, ThySpaceItemDirective]
})
export class ThySpaceModule {}
