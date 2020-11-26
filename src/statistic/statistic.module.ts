import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThyStatisticComponent } from './statistic.component';
import { ThyIconModule } from 'ngx-tethys/icon';

@NgModule({
    declarations: [ThyStatisticComponent],
    imports: [CommonModule, ThySharedModule, ThyIconModule],
    exports: [ThyStatisticComponent],
    providers: []
})
export class ThyStatisticModule {}
