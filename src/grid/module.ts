import { NgModule } from '@angular/core';
import { ThyRowDirective } from './thy-row.directive';
import { ThyColDirective } from './thy-col.directive';
import { ThyGridComponent } from './thy-grid.component';
import { ThyGridItemComponent } from './thy-grid-item.component';

@NgModule({
    declarations: [ThyGridComponent, ThyGridItemComponent, ThyRowDirective, ThyColDirective],
    exports: [ThyGridComponent, ThyGridItemComponent, ThyRowDirective, ThyColDirective],
    imports: []
})
export class ThyGridModule {}
