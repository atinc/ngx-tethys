import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyAlertComponent } from './alert.component';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyAlertActionItemDirective } from './alert.directive';

@NgModule({
    imports: [CommonModule, ThyIconModule, ThyAlertComponent, ThyAlertActionItemDirective],
    exports: [ThyAlertComponent, ThyAlertActionItemDirective]
})
export class ThyAlertModule {}
