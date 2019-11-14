import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyAlertComponent } from './alert.component';
import { ThyIconModule } from '../icon/icon.module';
import { ThyAlertActionItemDirective } from './alert.directive';

@NgModule({
    declarations: [ThyAlertComponent, ThyAlertActionItemDirective],
    imports: [CommonModule, ThyIconModule],
    exports: [ThyAlertComponent, ThyAlertActionItemDirective]
})
export class ThyAlertModule {}
