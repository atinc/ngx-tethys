import { NgModule } from '@angular/core';
import { ThyRowDirective } from './thy-row.directive';
import { ThyColDirective } from './thy-col.directive';

@NgModule({
    declarations: [ThyRowDirective, ThyColDirective],
    exports: [ThyRowDirective, ThyColDirective],
    imports: []

})

export class ThyRasterModule { }
