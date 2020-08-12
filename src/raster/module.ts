import { NgModule } from '@angular/core';
import { ThyRowDirective } from './thy-row.directive';
import { ThyColDirective } from './thy-col.directive';
import { ThyDirectiveModule } from 'ngx-tethys/directive';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [ThyRowDirective, ThyColDirective],
    exports: [ThyRowDirective, ThyColDirective],
    imports: [CommonModule,ThyDirectiveModule]

})

export class ThyRasterModule { }
