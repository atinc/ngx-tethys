import { NgModule } from '@angular/core';
import { ThyRowDirective } from './thy-row.directive';
import { ThyColDirective } from './thy-col.directive';
import { ThyGridComponent } from './thy-grid.component';
import { ThyGridItemComponent } from './thy-grid-item.component';
import { ThyFlex, ThyFlexItem } from './flex';

@NgModule({
    exports: [ThyGridComponent, ThyGridItemComponent, ThyRowDirective, ThyColDirective, ThyFlex, ThyFlexItem],
    imports: [ThyGridComponent, ThyGridItemComponent, ThyRowDirective, ThyColDirective, ThyFlex, ThyFlexItem]
})
export class ThyGridModule {}
