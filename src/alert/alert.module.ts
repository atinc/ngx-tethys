import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyAlertComponent } from './alert.component';
import { ThyIconModule } from '../icon/icon.module';

@NgModule({
    declarations: [ThyAlertComponent],
    imports: [CommonModule, ThyIconModule],
    exports: [ThyAlertComponent]
})
export class ThyAlertModule {}
