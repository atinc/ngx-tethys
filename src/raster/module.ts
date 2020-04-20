import { NgModule } from '@angular/core';
import { ThyRowDirective } from './thy-row.directive';
import { ThyColDirective } from './thy-col.directive';

@NgModule({
    imports: [],
    exports: [ThyRowDirective, ThyColDirective],
    declarations: [ThyRowDirective, ThyColDirective],
    providers: []
})
export class ThyRasterModule {}
