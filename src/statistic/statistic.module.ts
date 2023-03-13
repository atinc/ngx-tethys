import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThyStatisticComponent } from './statistic.component';
import { ThyIconModule } from 'ngx-tethys/icon';

@NgModule({
    imports: [CommonModule, ThySharedModule, ThyIconModule, ThyStatisticComponent],
    exports: [ThyStatisticComponent],
    providers: []
})
export class ThyStatisticModule {}
