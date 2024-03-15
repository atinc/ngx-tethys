import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThyStatistic } from './statistic.component';
import { ThyIconModule } from 'ngx-tethys/icon';

@NgModule({
    imports: [CommonModule, ThySharedModule, ThyIconModule, ThyStatistic],
    exports: [ThyStatistic],
    providers: []
})
export class ThyStatisticModule {}
